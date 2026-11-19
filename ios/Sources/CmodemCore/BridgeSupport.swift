import Foundation

/// JS literal helpers. The Android bridge hands values to WebView via
/// JSONObject.quote(); these are the Swift equivalent used by __nativeDone /
/// __fetchText / evalOnBoard. Escaping U+2028/U+2029 matters because they are
/// legal in JSON but terminate a JavaScript string literal.
public enum JSLiteral {
    public static func quote(_ value: String) -> String {
        var out = "\""
        for scalar in value.unicodeScalars {
            switch scalar.value {
            case 0x22: out += "\\\""
            case 0x5c: out += "\\\\"
            case 0x0a: out += "\\n"
            case 0x0d: out += "\\r"
            case 0x09: out += "\\t"
            case 0x08: out += "\\b"
            case 0x0c: out += "\\f"
            case 0x2028: out += "\\u2028"
            case 0x2029: out += "\\u2029"
            case 0..<0x20:
                out += String(format: "\\u%04x", scalar.value)
            default:
                out.unicodeScalars.append(scalar)
            }
        }
        return out + "\""
    }

    /// Builds a JS object literal from already-quoted keys and raw JS values.
    public static func object(_ pairs: [(String, String)]) -> String {
        "{" + pairs.map { quote($0.0) + ":" + $0.1 }.joined(separator: ",") + "}"
    }

    /// Converts a value returned by evaluateJavaScript into a JS literal.
    /// WKWebView returns objects/arrays as JSON strings; plain strings need quoting.
    public static func fromBridgeValue(_ value: Any?) -> String {
        guard let value else { return "null" }
        if let text = value as? String {
            if let data = text.data(using: .utf8),
               let parsed = try? JSONSerialization.jsonObject(with: data),
               !(parsed is String) {
                return text
            }
            return quote(text)
        }
        if JSONSerialization.isValidJSONObject(value),
           let data = try? JSONSerialization.data(withJSONObject: value),
           let text = String(data: data, encoding: .utf8) {
            return text
        }
        if let bool = value as? Bool { return bool ? "true" : "false" }
        if let number = value as? NSNumber { return number.stringValue }
        return "null"
    }
}
