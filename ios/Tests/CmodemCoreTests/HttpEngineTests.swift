import XCTest
@testable import CmodemCore

final class HttpEngineTests: XCTestCase {
    func testAllowedDeviceAddresses() {
        for url in ["http://192.168.8.1/", "https://10.0.0.5/cgi-bin/luci",
                    "http://[2001:db8::1]/", "http://100.64.0.1/"] {
            XCTAssertTrue(HttpEngine.isDeviceURL(url), url)
        }
    }

    func testRejectedDeviceAddresses() {
        for url in ["http://127.0.0.1/", "http://169.254.1.1/", "http://224.0.0.1/",
                    "http://0.0.0.0/", "http://localhost/", "http://foo/",
                    "http://user:pass@192.168.8.1/", "ftp://192.168.8.1/",
                    "not a url", "http://[::1]/", "http://[fe80::1]/", "http://[ff02::1]/"] {
            XCTAssertFalse(HttpEngine.isDeviceURL(url), url)
        }
    }

    func testRejectedFetchNeverTouchesNetwork() {
        let expectation = expectation(description: "rejected")
        HttpEngine().fetch("http://127.0.0.1/secret", "") { result in
            XCTAssertEqual(result.status, 403)
            XCTAssertEqual(result.text, "DEVICE_ADDRESS_REJECTED")
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 2)
    }
}
