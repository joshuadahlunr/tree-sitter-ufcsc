package tree_sitter_ufcsc_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_ufcsc "github.com/tree-sitter/tree-sitter-ufcsc/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ufcsc.Language())
	if language == nil {
		t.Errorf("Error loading UFCS C grammar")
	}
}
