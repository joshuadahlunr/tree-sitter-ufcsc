/**
 * @file UFCS C grammar for tree-sitter
 * @author Joshua Dahl <joshuadahl@unr.edu>
 * @author Max Brunsfeld <maxbrunsfeld@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const C = require('tree-sitter-c/grammar');

module.exports = grammar(C, {
  name: 'ufcsc',

  conflicts: $ => [
    // C
    [$.type_specifier, $._declarator],
    [$.type_specifier, $._declarator, $.macro_type_specifier],
    [$.type_specifier, $.expression],
    [$.type_specifier, $.expression, $.macro_type_specifier],
    [$.type_specifier, $.macro_type_specifier],
    [$.type_specifier, $.sized_type_specifier],
    [$.sized_type_specifier],
    [$.attributed_statement],
    [$._declaration_modifiers, $.attributed_statement],
    [$.enum_specifier],
    [$.type_specifier, $._old_style_parameter_list],
    [$.parameter_list, $._old_style_parameter_list],
    [$.function_declarator, $._function_declaration_declarator],
    [$._block_item, $.statement],
    [$._top_level_item, $._top_level_statement],
    [$.type_specifier, $._top_level_expression_statement],
    [$.type_qualifier, $.extension_expression],

    // UFCS C
    // [$.unary_expression, $.field_expression, $.ufcs_call_expression],
    // [$.update_expression, $.field_expression, $.ufcs_call_expression],
    // [$.sizeof_expression, $.field_expression, $.ufcs_call_expression],
    [$.field_expression],
  ],

  rules: {
    _preproc_expression: ($, original) => choice(
      original,
      alias($.preproc_ufcs_call_expression, $.call_expression),
    ),

    preproc_ufcs_call_expression: $ => prec(C.PREC.CALL, seq(
      field('object', $.identifier),
      '.',
      field('function', $.identifier),
      field('arguments', alias($.preproc_argument_list, $.argument_list)),
    )),

    // Expressions

    // _expression_not_binary: ($, original) => choice(
    //   original,
    //   $.ufcs_call_expression
    // ),

    // _assignment_left_expression: ($, original) => choice(
    //   original,
    //   $.ufcs_call_expression
    // ),
    field_expression: ($, original) => seq(
      optional(field('unary', choice('!', '~', '-', '+', '&', '*'))),
      original,
      optional(field('arguments', $.argument_list)),
    )

    // ufcs_call_expression: $ => prec(C.PREC.FIELD + 1, seq(
    //   field('object', $.expression),
    //   '.',
    //   field('function', $.expression),
    //   field('arguments', $.argument_list),
    // )),
  },
});