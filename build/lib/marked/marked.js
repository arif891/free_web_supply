import { _Lexer } from "./Lexer.js";
import { _Parser } from "./Parser.js";
import { _Tokenizer } from "./Tokenizer.js";
import { _Renderer } from "./Renderer.js";
import { _TextRenderer } from "./TextRenderer.js";
import { _Hooks } from "./Hooks.js";
import { Marked } from "./Instance.js";
import {
  _getDefaults,
  changeDefaults,
  _defaults
} from "./defaults.js";
const markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
const options = marked.options;
const setOptions = marked.setOptions;
const use = marked.use;
const walkTokens = marked.walkTokens;
const parseInline = marked.parseInline;
const parse = marked;
const parser = _Parser.parse;
const lexer = _Lexer.lex;
import { _defaults as _defaults2, _getDefaults as _getDefaults2 } from "./defaults.js";
import { _Lexer as _Lexer2 } from "./Lexer.js";
import { _Parser as _Parser2 } from "./Parser.js";
import { _Tokenizer as _Tokenizer2 } from "./Tokenizer.js";
import { _Renderer as _Renderer2 } from "./Renderer.js";
import { _TextRenderer as _TextRenderer2 } from "./TextRenderer.js";
import { _Hooks as _Hooks2 } from "./Hooks.js";
import { Marked as Marked2 } from "./Instance.js";
export {
  _Hooks2 as Hooks,
  _Lexer2 as Lexer,
  Marked2 as Marked,
  _Parser2 as Parser,
  _Renderer2 as Renderer,
  _TextRenderer2 as TextRenderer,
  _Tokenizer2 as Tokenizer,
  _defaults2 as defaults,
  _getDefaults2 as getDefaults,
  lexer,
  marked,
  options,
  parse,
  parseInline,
  parser,
  setOptions,
  use,
  walkTokens
};
