# Air6 APP — iOS 1:1 复刻

与 `app/` 下的 Android 版 **1.4.3-local-52** 使用同一套 HTML/JS/CSS 资源，不是另写一套 UI。

## 架构对应关系

| Android | iOS | 说明 |
| --- | --- | --- |
| 可见 `board` WebView | `WKWebView` (`BoardView.swift`) | 直接加载 core 生成的 HTML，baseURL `https://fhcpeboard.local/` |
| `addJavascriptInterface(AndroidBoard)` | `BoardShim` (document-start 注入的 JS 对象) | WKWebView 无同步桥；Wi-Fi 缓存由 Keychain 预置到内存 map，写回走原生消息 |
| `window.webkit.messageHandlers.scriptable` | `WKScriptMessageHandler("iOSBridge")` + shim | 页面原本就支持 Scriptable/iOS，消息原样转发给 core |
| 隐藏 `core` WebView + `AndroidCore` | 无头 `JSContext` + `JSExport` (`CoreRuntime.swift`) | JavaScriptCore 提供**同步**调用，完整复刻 AndroidCore 的 26 个方法 |
| `HttpEngine.kt` (OkHttp) | `CmodemCore/HttpEngine.swift` | 同样的设备地址白名单、禁用代理/重定向、内存 Cookie、超时与错误码 |
| `NativeStore` + Android Keystore | `SecureKVStore` → iOS Keychain | `ThisDeviceOnly` 保护，缓存清理规则一致 |
| `native_core.cpp` (短信 PDU) | `CmodemCore/SmsPdu.swift` | 纯 Swift 逐行移植，含官方自测向量单测 |

core 脚本（`core_bootstrap.js` + 6 个 `.js`）只依赖 `window`、`AndroidCore`、`setTimeout/setInterval`、`Promise`，不使用 DOM，因此可以在无头 `JSContext` 中原样运行。

## 构建

CI 自动执行：Linux 容器跑 `swift test`（core 单测），macOS runner 用 xcodegen 生成工程并构建未签名 IPA，发布到 `cmodem-ios-latest` release。

本地：

```bash
cd ios
swift test                       # core（需要 Swift 6）
./sync-assets.sh                 # Android 资源变动后同步
cd App && xcodegen generate      # 需要 macOS
xcodebuild -project CmodemApp.xcodeproj -scheme CmodemApp \
  -destination 'generic/platform=iOS' CODE_SIGNING_ALLOWED=NO build
```

`NSAppTransportSecurity.NSAllowsArbitraryLoads = true` 是必需的：设备地址由用户填写，可能是任意局域网/公网 IP 的 HTTP 管理页；越权地址仍由 `HttpEngine.isDeviceURL` 在原生层拒绝（loopback / link-local / multicast / unspecified）。同时需要 `NSLocalNetworkUsageDescription` 触发系统的本地网络授权弹窗。

## 已验证 / 未验证

- 已验证：Linux 上 `swift test` 12 项全部通过（PDU 解码含 emoji、JS 转义、SSRF 地址过滤、Keychain 回退存储、沙箱文件路径）。
- 需 CI 验证：app target 的编译（`swift build` 不编译 SwiftUI/WKWebView 代码）。
- 无法在 Linux 验证：真机上的 WebView 渲染、局域网登录、短信与壁纸选择。绿色构建只代表可安装，不代表功能已在设备上跑通。

## 同步资源

`sync-assets.sh` 从 `../app/src/main/assets` 复制全部资源，并从 `core.html` 提取内联脚本生成 `core_bootstrap.js`。修改 Android 端 JS 后必须重新运行并提交。
