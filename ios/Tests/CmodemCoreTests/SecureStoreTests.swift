import XCTest
@testable import CmodemCore

final class SecureStoreTests: XCTestCase {
    func testRoundTripAndCacheClear() {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("cmodem-core-tests-\(UUID().uuidString)", isDirectory: true)
        let store = SecureKVStore(root: root)
        store.set("LAN_PROFILES_V1", "secret")
        store.set("UPSTREAM_LOCAL_DEVICE_x_SMS_CACHE_V1", "blob")
        store.set("CPE_WIFI_CACHE", "psk")
        XCTAssertEqual(store.get("LAN_PROFILES_V1"), "secret")
        XCTAssertTrue(store.contains("LAN_PROFILES_V1"))

        XCTAssertEqual(store.clearCaches(), 2)
        XCTAssertEqual(store.get("LAN_PROFILES_V1"), "secret")
        XCTAssertEqual(store.get("UPSTREAM_LOCAL_DEVICE_x_SMS_CACHE_V1"), "")
        store.remove("LAN_PROFILES_V1")
        XCTAssertFalse(store.contains("LAN_PROFILES_V1"))
    }

    func testFileStoreStaysInsideRoot() {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("cmodem-file-tests-\(UUID().uuidString)", isDirectory: true)
        let files = FileStore(root: root)
        files.write("CPE_SC/a.txt", "hello")
        XCTAssertEqual(files.read("CPE_SC/a.txt"), "hello")
        XCTAssertEqual(files.read("../../etc/passwd"), "")
        XCTAssertFalse(files.exists("../../etc/passwd"))
        files.remove("CPE_SC/a.txt")
        XCTAssertFalse(files.exists("CPE_SC/a.txt"))
    }
}
