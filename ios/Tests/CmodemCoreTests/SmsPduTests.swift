import XCTest
@testable import CmodemCore

final class SmsPduTests: XCTestCase {
    func testNativeSelfTestVectors() {
        XCTAssertTrue(SmsPdu.selfTest())
        let sms = SmsPdu.decode("00000491214300086211219080700004004F004B")
        XCTAssertTrue(sms.ok)
        XCTAssertFalse(sms.outgoing)
        XCTAssertEqual(sms.number, "+1234")
        XCTAssertEqual(sms.text, "OK")
        XCTAssertEqual(sms.time, "2026/11/12 09:08:07")
    }

    func testUcs2Emoji() {
        let sms = SmsPdu.decode("00000491214300086211219080700004D83DDE00")
        XCTAssertEqual(sms.text, "\u{1F600}")
    }

    func testGsm7ExtensionAndInvalidInput() {
        // 0x1b 0x65 => euro sign (GSM extension table)
        let sms = SmsPdu.decode("000004912143000062112190807000029B32")
        XCTAssertEqual(sms.text, "€")
        XCTAssertFalse(SmsPdu.decode("zzzz").ok)
        XCTAssertFalse(SmsPdu.decode("0000").ok)
    }

    func testJsonOutputIsValid() {
        let json = SmsPdu.decodeJSON("00000491214300086211219080700004004F004B")
        let obj = try? JSONSerialization.jsonObject(with: Data(json.utf8)) as? [String: Any]
        XCTAssertNotNil(obj)
        XCTAssertEqual(obj?["number"] as? String, "+1234")
        XCTAssertTrue(SmsPdu.decodeJSON("bad").isEmpty)
    }
}
