import Foundation

public struct DecodedSms: Codable, Equatable, Sendable {
    public let ok: Bool
    public let outgoing: Bool
    public let number: String
    public let text: String
    public let time: String

    public init(ok: Bool = false, outgoing: Bool = false, number: String = "", text: String = "", time: String = "") {
        self.ok = ok; self.outgoing = outgoing; self.number = number; self.text = text; self.time = time
    }
}

/// Faithful Swift port of app/src/main/cpp/native_core.cpp (fhcpecore/2).
/// Kept in the cross-platform core so it is exercised by `swift test` on Linux;
/// the iOS app no longer needs a bundled dylib or JNI.
public enum SmsPdu {
    private static let gsm: [UInt16] = [
        0x0040,0x00a3,0x0024,0x00a5,0x00e8,0x00e9,0x00f9,0x00ec,0x00f2,0x00c7,0x000a,0x00d8,0x00f8,0x000d,0x00c5,0x00e5,
        0x0394,0x005f,0x03a6,0x0393,0x039b,0x03a9,0x03a0,0x03a8,0x03a3,0x0398,0x039e,0x0000,0x00c6,0x00e6,0x00df,0x00c9,
        0x0020,0x0021,0x0022,0x0023,0x00a4,0x0025,0x0026,0x0027,0x0028,0x0029,0x002a,0x002b,0x002c,0x002d,0x002e,0x002f,
        0x0030,0x0031,0x0032,0x0033,0x0034,0x0035,0x0036,0x0037,0x0038,0x0039,0x003a,0x003b,0x003c,0x003d,0x003e,0x003f,
        0x00a1,0x0041,0x0042,0x0043,0x0044,0x0045,0x0046,0x0047,0x0048,0x0049,0x004a,0x004b,0x004c,0x004d,0x004e,0x004f,
        0x0050,0x0051,0x0052,0x0053,0x0054,0x0055,0x0056,0x0057,0x0058,0x0059,0x005a,0x00c4,0x00d6,0x00d1,0x00dc,0x00a7,
        0x00bf,0x0061,0x0062,0x0063,0x0064,0x0065,0x0066,0x0067,0x0068,0x0069,0x006a,0x006b,0x006c,0x006d,0x006e,0x006f,
        0x0070,0x0071,0x0072,0x0073,0x0074,0x0075,0x0076,0x0077,0x0078,0x0079,0x007a,0x00e4,0x00f6,0x00f1,0x00fc,0x00e0
    ]

    private static func hex(_ c: UInt8) -> Int {
        switch c {
        case 0x30...0x39: return Int(c - 0x30)
        case 0x41...0x46: return Int(c - 0x41) + 10
        case 0x61...0x66: return Int(c - 0x61) + 10
        default: return -1
        }
    }

    private static func bytes(from input: String) -> [UInt8]? {
        var clean = [UInt8]()
        for c in input.utf8 {
            if c == 0x20 || c == 0x09 || c == 0x0a || c == 0x0d { continue }
            let n = hex(c)
            if n < 0 { return nil }
            clean.append(UInt8(n))
        }
        guard clean.count >= 8, clean.count <= 8192, clean.count % 2 == 0 else { return nil }
        var out = [UInt8](); out.reserveCapacity(clean.count / 2)
        var i = 0
        while i < clean.count {
            out.append((clean[i] << 4) | clean[i + 1]); i += 2
        }
        return out
    }

    private static func append(_ cp: UInt32, to text: inout String) {
        let safe = (cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) ? 0xfffd : cp
        text.unicodeScalars.append(UnicodeScalar(safe) ?? UnicodeScalar(0xfffd)!)
    }

    private static func ucs2(_ bytes: [UInt8], from start: Int, count: Int) -> String {
        var text = ""
        var i = start
        let end = min(bytes.count, start + count)
        while i + 1 < end {
            var cp = UInt32(bytes[i]) << 8 | UInt32(bytes[i + 1])
            if cp >= 0xd800 && cp <= 0xdbff && i + 3 < end {
                let low = UInt32(bytes[i + 2]) << 8 | UInt32(bytes[i + 3])
                if low >= 0xdc00 && low <= 0xdfff {
                    cp = 0x10000 + ((cp - 0xd800) << 10) + (low - 0xdc00)
                    i += 2
                }
            }
            i += 2
            if cp == 0 { continue }
            append(cp, to: &text)
        }
        return text
    }

    private static func gsmExtension(_ value: UInt8) -> UInt32 {
        switch value {
        case 0x0a: return 0x000c
        case 0x14: return 0x005e
        case 0x28: return 0x007b
        case 0x29: return 0x007d
        case 0x2f: return 0x005c
        case 0x3c: return 0x005b
        case 0x3d: return 0x007e
        case 0x3e: return 0x005d
        case 0x40: return 0x007c
        case 0x65: return 0x20ac
        default: return 0xfffd
        }
    }

    private static func gsm7(_ bytes: [UInt8], bitOffset: Int, septets: Int) -> String {
        var text = ""
        var escaped = false
        for index in 0..<septets {
            let bit = bitOffset + index * 7
            let byteIndex = bit / 8
            guard byteIndex < bytes.count else { break }
            let shift = UInt16(bit % 8)
            var packed = UInt16(bytes[byteIndex])
            if byteIndex + 1 < bytes.count { packed |= UInt16(bytes[byteIndex + 1]) << 8 }
            let value = UInt8((packed >> shift) & 0x7f)
            if escaped { append(gsmExtension(value), to: &text); escaped = false }
            else if value == 0x1b { escaped = true }
            else { append(UInt32(gsm[Int(value & 0x7f)]), to: &text) }
        }
        return text
    }

    private static func addressDigit(_ nibble: UInt8) -> Character? {
        switch nibble {
        case 0...9: return Character(UnicodeScalar(0x30 + UInt32(nibble))!)
        case 0x0a: return "*"
        case 0x0b: return "#"
        case 0x0c...0x0e: return Character(UnicodeScalar(UInt32(0x61 + nibble - 0x0c))!)
        default: return nil
        }
    }

    private static func address(_ bytes: [UInt8], from start: Int, count: Int, digits: UInt8, type: UInt8) -> String {
        var text = ""
        if (type & 0x70) == 0x10 { text.append("+") }
        let target = Int(digits) + (text.isEmpty ? 0 : 1)
        var index = start
        while index < bytes.count && text.count < target {
            if let low = addressDigit(bytes[index] & 0x0f), text.count < target { text.append(low) }
            if let high = addressDigit((bytes[index] >> 4) & 0x0f), text.count < target { text.append(high) }
            index += 1
        }
        return text
    }

    private static func swapped(_ value: UInt8) -> Int {
        Int((value & 0x0f) * 10 + ((value >> 4) & 0x0f))
    }

    private static func timestamp(_ b: [UInt8], at start: Int) -> String {
        let yearPart = swapped(b[start])
        let year = yearPart >= 70 ? 1900 + yearPart : 2000 + yearPart
        let month = swapped(b[start + 1]), day = swapped(b[start + 2])
        let hour = swapped(b[start + 3]), minute = swapped(b[start + 4]), second = swapped(b[start + 5])
        guard (1...12).contains(month), (1...31).contains(day), hour <= 23, minute <= 59, second <= 59 else { return "" }
        return String(format: "%04d/%02d/%02d %02d:%02d:%02d", year, month, day, hour, minute, second)
    }

    private static func userData(_ bytes: [UInt8], from start: Int, dcs: UInt8, length: Int, hasHeader: Bool) -> String {
        let available = bytes.count - start
        let isUcs2 = (dcs & 0x0c) == 0x08
        let eightBit = (dcs & 0x0c) == 0x04
        var headerBytes = 0
        if hasHeader {
            guard available > 0 else { return "" }
            headerBytes = Int(bytes[start]) + 1
            if headerBytes > available { return "" }
        }
        let slice = Array(bytes[start...])
        if isUcs2 {
            return ucs2(slice, from: headerBytes, count: max(0, min(length, available) - headerBytes))
        }
        if eightBit {
            var text = ""
            let end = min(length, available)
            for i in headerBytes..<end where i < slice.count { append(UInt32(slice[i]), to: &text) }
            return text
        }
        let headerSeptets = (headerBytes * 8 + 6) / 7
        let septets = length > headerSeptets ? length - headerSeptets : 0
        return gsm7(slice, bitOffset: headerSeptets * 7, septets: septets)
    }

    public static func decode(_ input: String) -> DecodedSms {
        guard let bytes = bytes(from: input) else { return DecodedSms() }
        var position = 0
        if !bytes.isEmpty {
            let smscBytes = Int(bytes[0]) + 1
            if smscBytes < bytes.count && (bytes[smscBytes] & 0x03) <= 1 { position = smscBytes }
        }
        func take() -> UInt8? {
            guard position < bytes.count else { return nil }
            let v = bytes[position]; position += 1; return v
        }
        guard let first = take() else { return DecodedSms() }
        let type = first & 0x03
        let outgoing = type == 1
        guard type == 0 || type == 1 else { return DecodedSms() }
        if outgoing { guard take() != nil else { return DecodedSms() } }
        guard let digits = take(), let addressType = take() else { return DecodedSms() }
        let addressBytes = (Int(digits) + 1) / 2
        guard position + addressBytes <= bytes.count else { return DecodedSms() }
        let number = address(bytes, from: position, count: addressBytes, digits: digits, type: addressType)
        position += addressBytes
        guard take() != nil, let dcs = take() else { return DecodedSms() }
        var time = ""
        if outgoing {
            let validity = (first >> 3) & 0x03
            let validityBytes = validity == 0 ? 0 : (validity == 2 ? 1 : 7)
            guard position + validityBytes <= bytes.count else { return DecodedSms() }
            position += validityBytes
        } else {
            guard position + 7 <= bytes.count else { return DecodedSms() }
            time = timestamp(bytes, at: position)
            position += 7
        }
        guard let userLength = take() else { return DecodedSms() }
        let text = userData(bytes, from: position, dcs: dcs, length: Int(userLength), hasHeader: (first & 0x40) != 0)
        return DecodedSms(ok: true, outgoing: outgoing, number: number, text: text, time: time)
    }

    public static func decodeJSON(_ input: String) -> String {
        let d = decode(input)
        guard d.ok else { return "" }
        let obj: [String: Any] = [
            "ok": true, "outgoing": d.outgoing, "number": d.number, "text": d.text, "time": d.time
        ]
        guard let data = try? JSONSerialization.data(withJSONObject: obj, options: [.sortedKeys]),
              let text = String(data: data, encoding: .utf8) else { return "" }
        return text
    }

    public static func selfTest() -> Bool {
        let a = decode("00000491214300086211219080700004004F004B")
        let emoji = decode("00000491214300086211219080700004D83DDE00")
        return a.ok && a.number == "+1234" && a.text == "OK" &&
            a.time == "2026/11/12 09:08:07" && emoji.ok && emoji.text == "\u{1F600}"
    }
}
