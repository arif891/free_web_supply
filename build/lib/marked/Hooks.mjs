import { _defaults } from "./defaults.mjs";
import { _Lexer } from "./Lexer.mjs";
import { _Parser } from "./Parser.mjs";
class _Hooks {
  options;
  block;
  constructor(options) {
    this.options = options || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens",
    "emStrongMask"
  ]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html) {
    return html;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
  /**
   * Mask contents that should not be interpreted as em/strong delimiters
   */
  emStrongMask(src) {
    return src;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? _Lexer.lex : _Lexer.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? _Parser.parse : _Parser.parseInline;
  }
}
export {
  _Hooks
};
