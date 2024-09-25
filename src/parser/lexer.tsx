import { buildLexer, Lexer, Token } from "typescript-parsec";

enum LexerMode {
  // regular text
  Text,
  // for dealing with [[div]] and whatnot
  Element,
}

export enum TokenKind {
  // tombstone token for the very beginning of parsing
  Start,

  // generic text
  Text,

  ElementBegin,
  ElementEnd,
  ClosingTag,
  StringLiteral,
}

type LexerContext = {
  input: string;
  index: number;
  line: number;
  col: number;
  mode: LexerMode;
};

function tryToLex(
  context: LexerContext,
  regex: RegExp,
  kind: TokenKind,
  modeAfterMatch?: LexerMode
): { token: Token<TokenKind>; context: LexerContext } | undefined {
  const match = context.input.match(regex);
  if (!match || !match[0]) return;

  let finalLine = context.line;
  let finalCol = context.col;

  for (let char of match[0]) {
    if (char == "\n") {
      finalLine++;
      finalCol = 1;
    } else {
      finalCol++;
    }
  }

  return {
    token: {
      kind,
      text: match[0],
      next: undefined,
      pos: {
        columnBegin: context.col,
        columnEnd: finalCol,
        rowBegin: context.line,
        rowEnd: finalLine,
        index: context.index,
      },
    },
    context: {
      input: context.input.slice(match[0].length),
      line: finalLine,
      col: finalCol,
      index: context.index + match[0].length,
      mode: modeAfterMatch ?? context.mode,
    },
  };
}

export const wikitextLexer: Lexer<TokenKind> = {
  parse: (input: string) => {
    let currentToken: Token<TokenKind> = {
      kind: TokenKind.Start,
      text: "",
      pos: {
        index: 0,
        rowBegin: 1,
        rowEnd: 1,
        columnBegin: 1,
        columnEnd: 1,
      },
      next: undefined,
    };

    let context: LexerContext = {
      line: 1,
      col: 1,
      mode: LexerMode.Text,
      input,
      index: 0,
    };

    function acceptToken(tkn: {
      token: Token<TokenKind>;
      context: LexerContext;
    }) {
      // @ts-expect-error we will ignore const-correctness for now as a treat
      currentToken.next = tkn.token;
      currentToken = tkn.token;
      context = tkn.context;
    }

    while (context.input.length > 0) {
      let closingTag = tryToLex(context, /^\[\[\]\]/g, TokenKind.ClosingTag);

      // the "[[div" in "[[div]]"
      let elementBegin = tryToLex(
        context,
        /^\[\[\w+/g,
        TokenKind.ElementBegin,
        LexerMode.Element
      );
      if (elementBegin) acceptToken(elementBegin);
    }
  },
};
