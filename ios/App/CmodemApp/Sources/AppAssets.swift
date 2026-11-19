import Foundation

enum AppAssets {
    static func text(_ name: String) -> String {
        let ns = name as NSString
        let base = ns.deletingPathExtension
        let ext = ns.pathExtension
        let candidates = [
            Bundle.main.url(forResource: name, withExtension: nil),
            Bundle.main.url(forResource: base, withExtension: ext),
            Bundle.main.url(forResource: name, withExtension: nil, subdirectory: "Assets"),
            Bundle.main.url(forResource: base, withExtension: ext, subdirectory: "Assets")
        ]
        guard let url = candidates.compactMap({ $0 }).first,
              let data = try? Data(contentsOf: url) else { return "" }
        return String(data: data, encoding: .utf8) ?? ""
    }

    static var version: String {
        guard let data = AppAssets.text("version.json").data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let versions = json["ver"] as? [String: Any] else { return "1.4.3-local-52" }
        return (versions["app1"] as? String) ?? "1.4.3-local-52"
    }
}
