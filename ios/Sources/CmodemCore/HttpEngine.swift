import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
#if canImport(Glibc)
import Glibc
#elseif canImport(Darwin)
import Darwin
#endif

public struct FetchResult: Sendable {
    public let status: Int
    public let text: String
    public init(status: Int, text: String) { self.status = status; self.text = text }
}

private final class NoRedirectDelegate: NSObject, URLSessionTaskDelegate {
    func urlSession(_ session: URLSession,
                    willPerformHTTPRedirection response: HTTPURLResponse,
                    newRequest request: URLRequest,
                    completionHandler: @escaping (URLRequest?) -> Void) {
        completionHandler(nil)
    }
}

/// LAN-only transport. Mirrors HttpEngine.kt: no proxy, no redirects, DNS
/// results and literals filtered against loopback/link-local/multicast, and an
/// in-memory cookie jar keyed by host.
public final class HttpEngine: @unchecked Sendable {
    private let session: URLSession
    private var cookies: [String: [HTTPCookie]] = [:]
    private let lock = NSLock()

    public init() {
        let config = URLSessionConfiguration.default
        config.connectionProxyDictionary = [:]
        config.httpCookieAcceptPolicy = .never
        config.httpShouldSetCookies = false
        config.urlCache = nil
        config.requestCachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        config.timeoutIntervalForRequest = 30
        config.timeoutIntervalForResource = 45
        self.session = URLSession(configuration: config, delegate: NoRedirectDelegate(), delegateQueue: nil)
    }

    // MARK: - address policy (kept in sync with assets/device_address.js)

    private static func numericAddress(_ host: String) -> [UInt8]? {
        var a4 = in_addr()
        if inet_pton(AF_INET, host, &a4) == 1 {
            return withUnsafeBytes(of: a4) { Array($0) }
        }
        var a6 = in6_addr()
        if inet_pton(AF_INET6, host, &a6) == 1 {
            return withUnsafeBytes(of: a6) { Array($0) }
        }
        return nil
    }

    private static func isUsable(_ bytes: [UInt8]) -> Bool {
        if bytes.count == 4 {
            let a = bytes[0]
            if a == 0 || a >= 224 || a == 127 { return false }
            if a == 169 && bytes[1] == 254 { return false }
            return true
        }
        if bytes.count == 16 {
            let a = bytes[0]
            if a == 0xff { return false }
            if a == 0xfe && (bytes[1] & 0xc0) == 0x80 { return false }
            if bytes.allSatisfy({ $0 == 0 }) { return false }
            if bytes.dropLast().allSatisfy({ $0 == 0 }) && bytes[15] == 1 { return false }
            return true
        }
        return false
    }

    private static func isDnsName(_ host: String) -> Bool {
        guard host.count <= 253 else { return false }
        let labels = host.lowercased().split(separator: ".", omittingEmptySubsequences: false).map(String.init)
        guard labels.count >= 2 else { return false }
        func validLabel(_ s: String) -> Bool {
            guard let first = s.unicodeScalars.first, s.count <= 63 else { return false }
            let ok = { (c: Unicode.Scalar) in (c >= "a" && c <= "z") || (c >= "0" && c <= "9") || c == "-" }
            guard ok(first), first != "-" else { return false }
            guard let last = s.unicodeScalars.last, ok(last), last != "-" else { return false }
            return s.unicodeScalars.allSatisfy(ok)
        }
        guard labels.allSatisfy(validLabel) else { return false }
        let tld = labels.last!
        let asciiTld = tld.count >= 2 && tld.count <= 63 && tld.unicodeScalars.allSatisfy { $0 >= "a" && $0 <= "z" }
        let punycode = tld.hasPrefix("xn--") && tld.count >= 5 && tld.count <= 63
        return tld != "localhost" && (asciiTld || punycode)
    }

    private static func resolved(_ host: String) -> [[UInt8]] {
        var hints = addrinfo()
        hints.ai_socktype = 1 // SOCK_STREAM
        var pointer: UnsafeMutablePointer<addrinfo>?
        guard getaddrinfo(host, nil, &hints, &pointer) == 0, let first = pointer else { return [] }
        defer { freeaddrinfo(first) }
        var out: [[UInt8]] = []
        var current: UnsafeMutablePointer<addrinfo>? = first
        while let node = current {
            let sa = node.pointee.ai_addr.pointee
            if Int32(sa.sa_family) == AF_INET {
                let addr = withUnsafePointer(to: node.pointee.ai_addr) { p in
                    p.withMemoryRebound(to: sockaddr_in.self, capacity: 1) { $0.pointee.sin_addr }
                }
                out.append(withUnsafeBytes(of: addr) { Array($0) })
            } else if Int32(sa.sa_family) == AF_INET6 {
                let addr = withUnsafePointer(to: node.pointee.ai_addr) { p in
                    p.withMemoryRebound(to: sockaddr_in6.self, capacity: 1) { $0.pointee.sin6_addr }
                }
                out.append(withUnsafeBytes(of: addr) { Array($0) })
            }
            current = node.pointee.ai_next
        }
        return out
    }

    public static func isDeviceURL(_ raw: String) -> Bool {
        guard let components = URLComponents(string: raw),
              let scheme = components.scheme?.lowercased(), scheme == "http" || scheme == "https",
              let rawHost = components.host, !rawHost.isEmpty,
              components.user == nil, components.password == nil else { return false }
        // URLComponents keeps IPv6 brackets; InetAddress/HttpUrl do not.
        let host = rawHost.hasPrefix("[") && rawHost.hasSuffix("]")
            ? String(rawHost.dropFirst().dropLast()) : rawHost
        if let bytes = numericAddress(host) { return isUsable(bytes) }
        guard isDnsName(host) else { return false }
        return resolved(host).contains(where: isUsable)
    }

    // MARK: - cookie jar

    private func cookieHeader(for host: String) -> String {
        lock.lock(); defer { lock.unlock() }
        let now = Date()
        let live = (cookies[host] ?? []).filter { $0.expiresDate == nil || $0.expiresDate! > now }
        cookies[host] = live
        let pairs = live.map { cookie in
            cookie.value.isEmpty ? cookie.name : "\(cookie.name)=\(cookie.value)"
        }
        return pairs.joined(separator: "; ")
    }

    private func storeCookies(from response: URLResponse, host: String) {
        guard let http = response as? HTTPURLResponse,
              let fields = http.allHeaderFields as? [String: String] else { return }
        let found = HTTPCookie.cookies(withResponseHeaderFields: fields, for: response.url?.absoluteURL ?? URL(fileURLWithPath: "/"))
        guard !found.isEmpty else { return }
        lock.lock()
        var current = cookies[host] ?? []
        for cookie in found {
            current.removeAll { $0.name == cookie.name && $0.path == cookie.path }
            current.append(cookie)
        }
        cookies[host] = current
        lock.unlock()
    }

    public func clearSession(_ url: String) {
        guard let host = URLComponents(string: url)?.host else { return }
        lock.lock(); cookies.removeValue(forKey: host); lock.unlock()
    }

    // MARK: - fetch

    private static func reason(_ error: Error) -> String {
        let ns = error as NSError
        guard ns.domain == NSURLErrorDomain else { return "" }
        switch ns.code {
        case NSURLErrorCannotFindHost: return "DNS_FAILED"
        case NSURLErrorSecureConnectionFailed, NSURLErrorServerCertificateUntrusted,
             NSURLErrorServerCertificateHasBadDate, NSURLErrorServerCertificateHasUnknownRoot,
             NSURLErrorServerCertificateNotYetValid, NSURLErrorClientCertificateRejected:
            return "TLS_CERT_FAILED"
        default: return ""
        }
    }

    public func fetch(_ url: String, _ optJson: String, completion: @escaping (FetchResult) -> Void) {
        guard Self.isDeviceURL(url) else {
            completion(FetchResult(status: 403, text: "DEVICE_ADDRESS_REJECTED")); return
        }
        var options: [String: Any] = [:]
        if !optJson.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
           let data = optJson.data(using: .utf8),
           let parsed = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            options = parsed
        }
        let method = ((options["method"] as? String).map { $0.isEmpty ? "GET" : $0.uppercased() }) ?? "GET"
        let headers = options["headers"] as? [String: Any] ?? [:]
        guard let requestURL = URL(string: url) else {
            completion(FetchResult(status: 0, text: "")); return
        }
        var request = URLRequest(url: requestURL)
        request.httpMethod = method
        request.cachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        var merged: [String: String] = [:]
        for (key, value) in headers { merged[key] = String(describing: value) }
        if merged["Accept"] == nil { merged["Accept"] = "*/*" }
        let host = requestURL.host ?? ""
        let cookie = cookieHeader(for: host)
        if !cookie.isEmpty { merged["Cookie"] = cookie }
        for (key, value) in merged { request.setValue(value, forHTTPHeaderField: key) }

        let bodyObject = options["body"]
        let bodyString: String? = bodyObject.flatMap { value -> String? in
            if value is NSNull { return nil }
            if let object = value as? [String: Any],
               let data = try? JSONSerialization.data(withJSONObject: object),
               let text = String(data: data, encoding: .utf8) { return text }
            return String(describing: value)
        }
        let contentType = (headers["Content-Type"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
        request.setValue(contentType?.isEmpty == false ? contentType : "application/json; charset=utf-8",
                         forHTTPHeaderField: "Content-Type")
        if ["POST", "PUT", "PATCH"].contains(method) {
            request.httpBody = Data((bodyString ?? "").utf8)
        } else if method == "DELETE" {
            request.httpBody = bodyString.map { Data($0.utf8) }
        }

        let timeout = (options["timeoutMs"] as? NSNumber)?.doubleValue ?? 45_000
        request.timeoutInterval = max(1, min(45, timeout / 1000))

        session.dataTask(with: request) { data, response, error in
            if let error {
                completion(FetchResult(status: 0, text: Self.reason(error))); return
            }
            guard let response else { completion(FetchResult(status: 0, text: "")); return }
            let status = (response as? HTTPURLResponse)?.statusCode ?? 0
            self.storeCookies(from: response, host: host)
            let text = data.map { String(data: $0, encoding: .utf8) ?? String(decoding: $0, as: UTF8.self) } ?? ""
            completion(FetchResult(status: status, text: text))
        }.resume()
    }
}
