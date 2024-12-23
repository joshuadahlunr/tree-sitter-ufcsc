import XCTest
import SwiftTreeSitter
import TreeSitterufcsc

final class TreeSitterufcscTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ufcsc())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading UFCS C grammar")
    }
}
