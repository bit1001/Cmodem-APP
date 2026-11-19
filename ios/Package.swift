// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CmodemCore",
    platforms: [.iOS(.v16), .macOS(.v13)],
    products: [
        .library(name: "CmodemCore", targets: ["CmodemCore"])
    ],
    targets: [
        .target(name: "CmodemCore"),
        .testTarget(name: "CmodemCoreTests", dependencies: ["CmodemCore"])
    ]
)
