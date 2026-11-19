import Foundation

/// Sandboxed file access mirroring NativeStore.safeFile(): every path is
/// resolved against the app's Documents/CPE_SC directory and may not escape it.
public final class FileStore: @unchecked Sendable {
    public let root: URL

    public init(root: URL? = nil) {
        if let root { self.root = root } else {
            let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
                ?? FileManager.default.temporaryDirectory
            self.root = docs.appendingPathComponent("CPE_SC", isDirectory: true)
        }
        try? FileManager.default.createDirectory(at: self.root, withIntermediateDirectories: true)
    }

    private func safe(_ path: String) -> URL? {
        let candidate = path.hasPrefix("/") ? URL(fileURLWithPath: path)
            : root.appendingPathComponent(path, isDirectory: false)
        let target = candidate.standardizedFileURL.resolvingSymlinksInPath().path
        let base = root.standardizedFileURL.resolvingSymlinksInPath().path
        guard target == base || target.hasPrefix(base + "/") else { return nil }
        return URL(fileURLWithPath: target)
    }

    public func docsDir() -> String { root.path }

    public func exists(_ path: String) -> Bool {
        guard let url = safe(path) else { return false }
        return FileManager.default.fileExists(atPath: url.path)
    }

    public func read(_ path: String) -> String {
        guard let url = safe(path), let data = try? Data(contentsOf: url) else { return "" }
        return String(data: data, encoding: .utf8) ?? ""
    }

    public func write(_ path: String, _ content: String) {
        guard let url = safe(path) else { return }
        try? FileManager.default.createDirectory(at: url.deletingLastPathComponent(),
                                                  withIntermediateDirectories: true)
        try? Data(content.utf8).write(to: url, options: .atomic)
    }

    public func remove(_ path: String) {
        guard let url = safe(path) else { return }
        try? FileManager.default.removeItem(at: url)
    }

    public func writeFetchTemp(id: String, text: String) -> String {
        let name = "fetch_\(id).txt"
        write(name, text)
        return root.appendingPathComponent(name, isDirectory: false).path
    }

    @discardableResult
    public func clearCaches() -> Int {
        guard let items = try? FileManager.default.contentsOfDirectory(at: root,
                  includingPropertiesForKeys: nil, options: [.skipsHiddenFiles]) else { return 0 }
        var removed = 0
        for url in items where url.lastPathComponent.hasPrefix("fetch_") || url.lastPathComponent == "app_cache.enc" {
            if (try? FileManager.default.removeItem(at: url)) != nil { removed += 1 }
        }
        return removed
    }
}
