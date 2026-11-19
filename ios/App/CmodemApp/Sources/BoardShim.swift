import Foundation
import CmodemCore

/// Injected at document start into the visible board WKWebView.
///
/// Android injects a Java `AndroidBoard` object via addJavascriptInterface.
/// WKWebView has no synchronous JS→native bridge, so the object is implemented
/// in JavaScript: reads come from an in-memory map seeded from the Keychain by
/// native code at launch, writes update the map and post to the native side.
/// Messaging uses window.webkit.messageHandlers.scriptable, which the bundled
/// fhcpeweb.html already understands (it was designed for Scriptable/iOS).
enum BoardShim {
    static let allowedWifiCacheSize = 350_000

    static func source(seed: [String: String]) -> String {
        let seedLiteral = JSLiteral.object(seed.map { (JSLiteral.quote($0.key), JSLiteral.quote($0.value)) })
        return """
        (function(){
          try {
            var w = globalThis;
            w.webkit = w.webkit || {};
            w.webkit.messageHandlers = w.webkit.messageHandlers || {};
            function post(n){
              try { w.webkit.messageHandlers.iOSBridge.postMessage(n); } catch(e) {}
            }
            w.__iosPost = post;
            w.webkit.messageHandlers.scriptable = {
              postMessage: function(n){
                try { post(typeof n === 'string' ? n : JSON.stringify(n)); } catch(e) {}
              }
            };
            var seed = \(seedLiteral);
            var cache = {};
            for (var k in seed) if (Object.prototype.hasOwnProperty.call(seed,k)) cache[k] = seed[k];
            w.AndroidBoard = {
              uiFlavor: function(){ return 'default'; },
              wifiCacheGet: function(scope){ try { return cache[scope] || ''; } catch(e){ return ''; } },
              wifiCacheSet: function(scope,value){
                try {
                  var v = String(value);
                  if (v.length > \(allowedWifiCacheSize)) return;
                  cache[scope] = v;
                  post({action:'__wifiCacheSet',scope:String(scope),value:v});
                } catch(e) {}
              },
              postMessage: function(json){ post(json); }
            };
            if (typeof w.sendToScriptable !== 'function') {
              w.sendToScriptable = function(action,data){
                post(Object.assign({action:action}, data || {}));
              };
            }
          } catch(e) {}
        })();
        """
    }
}
