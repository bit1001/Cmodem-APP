import Foundation
import Combine
import SwiftUI
import UIKit
import WebKit
import CryptoKit
import CmodemCore

final class HostCoordinator: NSObject, ObservableObject {
    static let shared = HostCoordinator()

    let kv = SecureKVStore()
    let files = FileStore()
    weak var board: WKWebView?
    private(set) var core: CoreRuntime?
    private var pendingLoadId: String?

    override init() { super.init() }

    func startCore() {
        guard core == nil else { return }
        let runtime = CoreRuntime(host: self)
        core = runtime
        runtime.boot()
        runtime.setActive(true)
    }

    func clearCaches() -> Int { kv.clearCaches() + files.clearCaches() }

    func isDark() -> Bool { UITraitCollection.current.userInterfaceStyle == .dark }

    private func wifiCacheKey(_ scope: String) -> String {
        let digest = SHA256.hash(data: Data(scope.utf8)).map { String(format: "%02x", $0) }.joined()
        return "UPSTREAM_LOCAL_WIFI_CACHE_" + digest
    }

    /// Wi-Fi cache values may contain plaintext PSKs. Seed the board's JS map
    /// from Keychain at document start; never place them in WebView localStorage.
    func wifiCacheSeed() -> [String: String] {
        let prefix = "UPSTREAM_LOCAL_WIFI_CACHE_"
        var seed: [String: String] = [:]
        for key in kv.keys() where key.hasPrefix(prefix) {
            seed[String(key.dropFirst(prefix.count))] = kv.get(key)
        }
        return seed
    }

    private static func bodyToJSON(_ body: Any) -> String {
        if let text = body as? String { return text }
        if let dict = body as? [String: Any],
           let data = try? JSONSerialization.data(withJSONObject: dict),
           let text = String(data: data, encoding: .utf8) { return text }
        return String(describing: body)
    }

    func handlePageMessage(_ body: Any) {
        let json = Self.bodyToJSON(body)
        guard !json.isEmpty else { return }
        if let object = try? JSONSerialization.jsonObject(with: Data(json.utf8)) as? [String: Any],
           object["action"] as? String == "__wifiCacheSet",
           let scope = object["scope"] as? String,
           let value = object["value"] as? String {
            kv.set(wifiCacheKey(scope), value)
            return
        }
        core?.onPageMessage(json)
    }

    func deliverFetch(id: String, status: Int, text: String) {
        core?.deliverFetch(id: id, status: status, text: text)
    }

    func evalOnBoard(id: String, js: String) {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            guard let board = self.board else {
                self.core?.nativeDone(id: id, result: "null"); return
            }
            board.evaluateJavaScript(js) { result, error in
                let literal = error == nil ? JSLiteral.fromBridgeValue(result) : "null"
                self.core?.nativeDone(id: id, result: literal)
            }
        }
    }

    func loadBoardHtml(id: String, html: String) {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.pendingLoadId = id
            self.board?.loadHTMLString(html, baseURL: URL(string: "https://fhcpeboard.local/"))
        }
    }

    func completePendingLoad() {
        guard let id = pendingLoadId else { return }
        pendingLoadId = nil
        core?.nativeDone(id: id, result: "true")
    }

    func setActive(_ active: Bool) {
        core?.setActive(active)
        if active { core?.restoreVisuals() } else { core?.pauseVisuals() }
    }
}
