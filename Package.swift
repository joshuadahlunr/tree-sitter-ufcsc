// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterUFCSC",
    products: [
        .library(name: "TreeSitterUFCSC", targets: ["TreeSitterUFCSC"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterUFCSC",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                "src/scanner.c",
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterUFCSCTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterUFCSC",
            ],
            path: "bindings/swift/TreeSitterUFCSCTests"
        )
    ],
    cLanguageStandard: .c11
)
