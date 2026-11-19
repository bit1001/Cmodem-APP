import XCTest
@testable import CmodemCore

final class BridgeSupportTests: XCTestCase {
    func testQuoteEscapesJavaScriptTerminators() {
        let out = JSLiteral.quote("a\"b\\c\n\u{2028}\u{2029}")
        XCTAssertEqual(out, "\"a\\\"b\\\\c\\n\\u2028\\u2029\"")
    }

    func testObjectLiteral() {
        XCTAssertEqual(JSLiteral.object([("id", JSLiteral.quote("f1")), ("result", "true")]),
                       "{\"id\":\"f1\",\"result\":true}")
    }

    func testBridgeValue() {
        XCTAssertEqual(JSLiteral.fromBridgeValue(nil), "null")
        XCTAssertEqual(JSLiteral.fromBridgeValue("plain"), "\"plain\"")
        XCTAssertEqual(JSLiteral.fromBridgeValue("[1,2]"), "[1,2]")
    }
}
