import Foundation
import JavaScriptCore
import UIKit
import CmodemCore

// MARK: - AndroidCore JSExport contract

@objc private protocol AndroidCoreJS: JSExport {
    func assetRead(_ name: String) -> String
    func kcGet(_ key: String) -> String
    func kcSet(_ key: String, _ value: String)
    func kcRemove(_ key: String)
    func kcContains(_ key: String) -> Bool
    func clearCaches() -> Int
    func fileDocsDir() -> String
    func fileExists(_ path: String) -> Bool
    func fileRead(_ path: String) -> String
    func fileWrite(_ path: String, _ content: String)
    func fileRemove(_ path: String)
    func log(_ msg: String)
    func stringify(_ obj: String) -> String
    func parse(_ text: String) -> String
    func themeDark() -> Bool
    func fetch(_ id: String, _ url: String, _ optJson: String)
    func clearHttpSession(_ url: String)
    func evalJS(_ id: String, _ js: String)
    func loadHTML(_ id: String, _ html: String)
    func nativePing() -> String
    func decodeSmsPdu(_ pdu: String) -> String
    func reseed() -> String
}

/// Drop-in replacement for CoreJsInterface.kt. Every method keeps the exact
/// JS-visible name and signature; JSContext gives us the synchronous calls a
/// WKWebView cannot provide.
private final class CoreBridge: NSObject, AndroidCoreJS {
    weak var host: HostCoordinator?
    private let http = HttpEngine()

    private let assetAllowlist: Set<String> = [
        "fhcpeweb.html", "device_address.js", "lan_ui.js", "air6_ui.js",
        "air6_automation.js", "sms_cards.js", "android_ui.css", "upstream_images.js",
        "changelog.json"
    ]

    func assetRead(_ name: String) -> String {
        guard assetAllowlist.contains(name) else { return "" }
        return AppAssets.text(name)
    }

    func kcGet(_ key: String) -> String { HostCoordinator.shared.kv.get(key) }
    func kcSet(_ key: String, _ value: String) { HostCoordinator.shared.kv.set(key, value) }
    func kcRemove(_ key: String) { HostCoordinator.shared.kv.remove(key) }
    func kcContains(_ key: String) -> Bool { HostCoordinator.shared.kv.contains(key) }
    func clearCaches() -> Int { HostCoordinator.shared.clearCaches() }

    func fileDocsDir() -> String { HostCoordinator.shared.files.docsDir() }
    func fileExists(_ path: String) -> Bool { HostCoordinator.shared.files.exists(path) }
    func fileRead(_ path: String) -> String { HostCoordinator.shared.files.read(path) }
    func fileWrite(_ path: String, _ content: String) { HostCoordinator.shared.files.write(path, content) }
    func fileRemove(_ path: String) { HostCoordinator.shared.files.remove(path) }

    func log(_ msg: String) { print("[CmodemCore] \(msg.prefix(1000))") }
    func stringify(_ obj: String) -> String { obj }
    func parse(_ text: String) -> String { text }
    func themeDark() -> Bool { UITraitCollection.current.userInterfaceStyle == .dark }

    func fetch(_ id: String, _ url: String, _ optJson: String) {
        http.fetch(url, optJson) { [weak self] result in
            DispatchQueue.main.async {
                guard let self, let host = self.host else { return }
                host.deliverFetch(id: id, status: result.status, text: result.text)
            }
        }
    }

    func clearHttpSession(_ url: String) { http.clearSession(url) }
    func evalJS(_ id: String, _ js: String) { host?.evalOnBoard(id: id, js: js) }
    func loadHTML(_ id: String, _ html: String) { host?.loadBoardHtml(id: id, html: html) }

    func nativePing() -> String {
        JSLiteral.object([
            ("ok", "true"),
            ("ver", JSLiteral.quote(AppAssets.version)),
            ("nativeCore", "true"),
            ("nativeCoreVersion", JSLiteral.quote("fhcpecore/2-ios"))
        ])
    }

    func decodeSmsPdu(_ pdu: String) -> String { SmsPdu.decodeJSON(pdu) }
    func reseed() -> String { _ = HostCoordinator.shared.clearCaches(); return "ok" }
}

// MARK: - timer shims (JSContext has no event loop)

@objc private protocol TimerJS: JSExport {
    func setTimeout(_ fn: JSValue, _ ms: Int) -> Int
    func clearTimeout(_ id: Int)
    func setInterval(_ fn: JSValue, _ ms: Int) -> Int
    func clearInterval(_ id: Int)
}

private final class TimerBridge: NSObject, TimerJS {
    private var callbacks: [Int: JSValue] = [:]
    private var timers: [Int: Timer] = [:]
    private var next = 0

    private func issue(_ fn: JSValue, _ ms: Int, repeats: Bool) -> Int {
        next += 1
        let id = next
        callbacks[id] = fn
        let timer = Timer(timeInterval: max(0.001, Double(ms) / 1000.0), repeats: repeats) { [weak self] _ in
            guard let self, let fn = self.callbacks[id] else { return }
            fn.call(withArguments: [])
            if !repeats {
                self.callbacks.removeValue(forKey: id)
                self.timers.removeValue(forKey: id)
            }
        }
        RunLoop.main.add(timer, forMode: .common)
        timers[id] = timer
        return id
    }

    func setTimeout(_ fn: JSValue, _ ms: Int) -> Int { issue(fn, ms, repeats: false) }
    func setInterval(_ fn: JSValue, _ ms: Int) -> Int { issue(fn, ms, repeats: true) }
    func clearTimeout(_ id: Int) {
        timers.removeValue(forKey: id)?.invalidate()
        callbacks.removeValue(forKey: id)
    }
    func clearInterval(_ id: Int) { clearTimeout(id) }
}

// MARK: - headless core runtime

final class CoreRuntime {
    let context = JSContext()!
    private let bridge = CoreBridge()
    private let timers = TimerBridge()
    private let host: HostCoordinator

    init(host: HostCoordinator) {
        self.host = host
        bridge.host = host
    }

    func boot() {
        context.exceptionHandler = { _, value in
            print("[CmodemCore] JS exception: \(value?.toString() ?? "unknown")")
        }
        context.setObject(bridge, forKeyedSubscript: "AndroidCore" as NSString)
        context.setObject(timers, forKeyedSubscript: "__timers" as NSString)
        evaluate("""
        var window = globalThis;
        var console = {
          log: function(){ try{ AndroidCore.log('[js] '+Array.prototype.slice.call(arguments).map(String).join(' ')); }catch(e){} },
          warn: function(){ try{ AndroidCore.log('[warn] '+Array.prototype.slice.call(arguments).map(String).join(' ')); }catch(e){} },
          error: function(){ try{ AndroidCore.log('[error] '+Array.prototype.slice.call(arguments).map(String).join(' ')); }catch(e){} }
        };
        function setTimeout(fn,ms){ return __timers.setTimeout(fn,ms); }
        function clearTimeout(id){ __timers.clearTimeout(id); }
        function setInterval(fn,ms){ return __timers.setInterval(fn,ms); }
        function clearInterval(id){ __timers.clearInterval(id); }
        """)

        // core.html's inline script, extracted verbatim by sync-assets.sh,
        // followed by the same six scripts the Android core WebView loads.
        evaluateAsset("core_bootstrap.js")
        for name in ["network_mode.js", "device_address.js", "upstream_local.js",
                     "air6_api.js", "lan_api.js", "lan_runtime.js"] {
            evaluateAsset(name)
        }
    }

    private func evaluate(_ script: String) {
        context.evaluateScript(script)
    }

    private func evaluateAsset(_ name: String) {
        let script = AppAssets.text(name)
        guard !script.isEmpty else { print("[CmodemCore] missing asset \(name)"); return }
        evaluate(script)
    }

    private func onMain(_ block: @escaping () -> Void) {
        if Thread.isMainThread { block() } else { DispatchQueue.main.async(execute: block) }
    }

    func deliverFetch(id: String, status: Int, text: String) {
        onMain { [weak self] in
            guard let self else { return }
            if text.utf8.count > 512 * 1024 {
                let path = self.host.files.writeFetchTemp(id: id, text: text)
                self.evaluate("try{window.__fetchDoneFile(\(JSLiteral.quote(id)),\(status),\(JSLiteral.quote(path)))}catch(e){console.warn(e)}")
            } else {
                self.evaluate("try{window.__fetchText(\(JSLiteral.quote(id)),\(status),\(JSLiteral.quote(text)))}catch(e){console.warn(e)}")
            }
        }
    }

    func nativeDone(id: String, result: String) {
        onMain { [weak self] in
            guard let self else { return }
            let payload = JSLiteral.object([("id", JSLiteral.quote(id)), ("result", result)])
            self.evaluate("try{window.__nativeDone(\(payload))}catch(e){console.warn(e)}")
        }
    }

    func onPageMessage(_ json: String) {
        onMain { [weak self] in
            self?.evaluate("try{window.__onPageMessage(\(JSLiteral.quote(json)))}catch(e){console.warn(e)}")
        }
    }

    func setActive(_ active: Bool) {
        onMain { [weak self] in
            self?.evaluate("try{window.__lanNativeActive=\(active);window.__lanActive && window.__lanActive(\(active))}catch(e){}")
        }
    }

    func pauseVisuals() {
        onMain { [weak self] in
            self?.evaluate("try{if(typeof _spStop==='function')_spStop();if(typeof _ppStop==='function')_ppStop()}catch(e){}")
        }
    }

    func restoreVisuals() {
        onMain { [weak self] in
            self?.evaluate("try{window.__lanRestoreVisuals&&window.__lanRestoreVisuals()}catch(e){}")
        }
    }
}
