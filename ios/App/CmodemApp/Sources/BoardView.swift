import SwiftUI
import UIKit
import WebKit

struct BoardView: UIViewRepresentable {
    @EnvironmentObject var host: HostCoordinator

    func makeCoordinator() -> BoardCoordinator { BoardCoordinator(host: host) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.preferences.javaScriptCanOpenWindowsAutomatically = false
        config.userContentController.add(context.coordinator, name: "iOSBridge")
        config.userContentController.addUserScript(
            WKUserScript(source: BoardShim.source(seed: host.wifiCacheSeed()),
                         injectionTime: .atDocumentStart,
                         forMainFrameOnly: true)
        )
        let web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        web.backgroundColor = UIColor(red: 0.949, green: 0.961, blue: 0.976, alpha: 1)
        web.scrollView.contentInsetAdjustmentBehavior = .always
        web.scrollView.bounces = true
        web.allowsBackForwardNavigationGestures = false
        web.overrideUserInterfaceStyle = .unspecified
        context.coordinator.web = web
        host.board = web
        host.startCore()
        web.load(URLRequest(url: URL(string: "about:blank")!))
        return web
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}
}

final class BoardCoordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate, WKUIDelegate {
    weak var host: HostCoordinator?
    weak var web: WKWebView?

    init(host: HostCoordinator) { self.host = host }

    // MARK: WKScriptMessageHandler

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage) {
        guard message.name == "iOSBridge" else { return }
        host?.handlePageMessage(message.body)
    }

    // MARK: navigation (scriptable:// fallback, mirrors MainActivity.handleBoardUrl)

    func webView(_ webView: WKWebView,
                 decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url?.absoluteString,
              url.hasPrefix("scriptable://") else {
            decisionHandler(.allow); return
        }
        let payload = String(url.dropFirst("scriptable://".count)).removingPercentEncoding ?? ""
        if !payload.isEmpty { host?.handlePageMessage(payload) }
        decisionHandler(.cancel)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        host?.completePendingLoad()
    }

    // MARK: JS dialogs

    private func presented() -> UIViewController? {
        var scene: UIWindowScene?
        for candidate in UIApplication.shared.connectedScenes
            where candidate.activationState == .foregroundActive {
            scene = candidate as? UIWindowScene
            break
        }
        var controller = scene?.windows.first(where: { $0.isKeyWindow })?.rootViewController
        while let next = controller?.presentedViewController { controller = next }
        return controller
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "好", style: .default) { _ in completionHandler() })
        if let controller = presented() { controller.present(alert, animated: true) } else { completionHandler() }
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (Bool) -> Void) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "取消", style: .cancel) { _ in completionHandler(false) })
        alert.addAction(UIAlertAction(title: "好", style: .default) { _ in completionHandler(true) })
        if let controller = presented() { controller.present(alert, animated: true) } else { completionHandler(false) }
    }


}
