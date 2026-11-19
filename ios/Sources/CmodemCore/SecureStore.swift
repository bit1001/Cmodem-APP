import Foundation
#if canImport(Security)
import Security
#endif

public protocol KVBackend: Sendable {
    func get(_ key: String) -> String
    func set(_ key: String, _ value: String)
    func remove(_ key: String)
    func contains(_ key: String) -> Bool
    func keys() -> [String]
}

#if canImport(Security)
/// Keychain generic-password items are encrypted at rest by the system and
/// excluded from iCloud/device backups (ThisDeviceOnly). This replaces
/// Android's AES/GCM Keystore wrapper; the JS-visible contract is identical.
final class KeychainBackend: KVBackend {
    private let service = "com.fhcpeboard.cmodem.keychain"

    private func baseQuery(_ key: String) -> [String: Any] {
        [kSecClass as String: kSecClassGenericPassword,
         kSecAttrService as String: service,
         kSecAttrAccount as String: key]
    }

    func get(_ key: String) -> String {
        var query = baseQuery(key)
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
              let data = item as? Data else { return "" }
        return String(data: data, encoding: .utf8) ?? ""
    }

    func set(_ key: String, _ value: String) {
        let data = Data(value.utf8)
        var query = baseQuery(key)
        query[kSecValueData as String] = data
        query[kSecAttrAccessible as String] = kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        let status = SecItemAdd(query as CFDictionary, nil)
        if status == errSecDuplicateItem {
            let update: [String: Any] = [kSecValueData as String: data,
                                         kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly]
            _ = SecItemUpdate(baseQuery(key) as CFDictionary, update as CFDictionary)
        }
    }

    func remove(_ key: String) { _ = SecItemDelete(baseQuery(key) as CFDictionary) }

    func contains(_ key: String) -> Bool {
        var query = baseQuery(key)
        query[kSecReturnData as String] = false
        return SecItemCopyMatching(query as CFDictionary, nil) == errSecSuccess
    }

    func keys() -> [String] {
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                    kSecAttrService as String: service,
                                    kSecReturnAttributes as String: true,
                                    kSecMatchLimit as String: kSecMatchLimitAll]
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
              let rows = item as? [[String: Any]] else { return [] }
        return rows.compactMap { $0[kSecAttrAccount as String] as? String }
    }
}
#endif

/// Used on non-Apple hosts so the core can be unit-tested on Linux.
final class FileKVBackend: KVBackend, @unchecked Sendable {
    private let file: URL
    private var values: [String: String] = [:]
    private let lock = NSLock()

    init(root: URL) {
        self.file = root.appendingPathComponent("kv.json", isDirectory: false)
        try? FileManager.default.createDirectory(at: root, withIntermediateDirectories: true)
        if let data = try? Data(contentsOf: file),
           let obj = try? JSONSerialization.jsonObject(with: data) as? [String: String] {
            values = obj
        }
    }

    private func save() {
        guard let data = try? JSONSerialization.data(withJSONObject: values, options: [.sortedKeys]) else { return }
        try? data.write(to: file, options: .atomic)
    }

    func get(_ key: String) -> String { lock.lock(); defer { lock.unlock() }; return values[key] ?? "" }
    func set(_ key: String, _ value: String) { lock.lock(); values[key] = value; save(); lock.unlock() }
    func remove(_ key: String) { lock.lock(); values.removeValue(forKey: key); save(); lock.unlock() }
    func contains(_ key: String) -> Bool { lock.lock(); defer { lock.unlock() }; return values[key] != nil }
    func keys() -> [String] { lock.lock(); defer { lock.unlock() }; return Array(values.keys) }
}

public final class SecureKVStore: @unchecked Sendable {
    public let backend: KVBackend

    public init(root: URL? = nil) {
        #if canImport(Security)
        self.backend = KeychainBackend()
        #else
        let dir = root ?? FileManager.default.temporaryDirectory.appendingPathComponent("cmodem-kv-tests", isDirectory: true)
        self.backend = FileKVBackend(root: dir)
        #endif
    }

    public func get(_ key: String) -> String { backend.get(key) }
    public func set(_ key: String, _ value: String) { backend.set(key, value) }
    public func remove(_ key: String) { backend.remove(key) }
    public func contains(_ key: String) -> Bool { backend.contains(key) }
    public func keys() -> [String] { backend.keys() }

    /// Mirrors NativeStore.clearCaches(): cache blobs only, never credentials.
    @discardableResult
    public func clearCaches() -> Int {
        let prefixes = ["UPSTREAM_LOCAL_DEVICE_", "UPSTREAM_LOCAL_WIFI_CACHE_", "UPSTREAM_LOCAL_SMS_CACHE_"]
        let exact: Set<String> = ["UPSTREAM_LOCAL_WIFI_CACHE", "UPSTREAM_LOCAL_CACHED_DATA_",
                                  "CPE_WIDGET_CACHE", "CPE_WIFI_CACHE", "cpe_wifi_cache_v1"]
        var removed = 0
        for key in keys() where exact.contains(key) || prefixes.contains(where: key.hasPrefix) {
            remove(key); removed += 1
        }
        return removed
    }
}
