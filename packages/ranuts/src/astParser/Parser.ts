import type { Token } from './Tokenizer';
import { TokenType } from './Tokenizer';
import type {
  BinaryExpression,
  BlockStatement,
  CallExpression,
  ExportDeclaration,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  ImportSpecifiers,
  Literal,
  MemberExpression,
  Program,
  ReturnStatement,
  Statement,
  VariableDeclaration,
  VariableDeclarator,
  VariableKind,
} from './nodeTypes';
import { FunctionType, NodeType } from './nodeTypes';

/**
 * @description: 语法分析器
 * 在解析出词法 token 之后，我们就可以进入语法分析阶段了。
 * 在这个阶段，我们会依次遍历 token，对代码进行语法结构层面的分析，最后的目标是生成 AST 数据结构。
 * AST 结构可以通过 https://astexplorer.net/ 去查看
 */
export class Parser {
  private _tokens: Token[] = [];
  private _currentIndex = 0;
  constructor(token: Token[]) {
    this._tokens = [...token];
  }

  parse(): Program {
    const program = this._parseProgram();
    return program;
  }
  /**
   * @description: 解析生成 AST 的核心逻辑
   * 一个程序(Program)实际上由各个语句(Statement)来构成
   * 因此在_parseProgram逻辑中，需要扫描一个个语句，然后放到 Program 对象的 body 中。
   */
  private _parseProgram(): Program {
    const program: Program = {
      type: NodeType.Program,
      body: [],
      start: 0,
      end: Infinity,
    };
    while (!this._isEnd()) {
      const node = this._parseStatement();
      program.body.push(node);
      if (this._isEnd()) {
        program.end = node.end;
      }
    }
    return program;
  }
  /**
   * @description: 对于不同的token类型，有不同的解析逻辑
   * @return {Statement}
   */
  private _parseStatement(): Statement {
    // TokenType 来自 Tokenizer 的实现中
    if (this._checkCurrentTokenType(TokenType.Function)) return this._parseFunctionDeclaration();
    if (this._checkCurrentTokenType(TokenType.Identifier)) return this._parseExpressionStatement();
    if (this._checkCurrentTokenType(TokenType.LeftCurly)) return this._parseBlockStatement();
    if (this._checkCurrentTokenType(TokenType.Return)) return this._parseReturnStatement();
    if (this._checkCurrentTokenType(TokenType.Import)) return this._parseImportDeclaration();
    if (this._checkCurrentTokenType(TokenType.Export)) return this._parseExportDeclaration();
    if (this._checkCurrentTokenType([TokenType.Let, TokenType.Var, TokenType.Const]))
      return this._parseVariableDeclaration();
    console.log('Unexpected token:', this._getCurrentToken());
    throw new Error('Unexpected token');
  }
  /**
   * @description: 解析 import 声明
   * @return {ImportDeclaration}
   */
  private _parseImportDeclaration(): ImportDeclaration {
    const { start } = this._getCurrentToken();
    const specifiers: ImportSpecifiers = [];
    this._goNext(TokenType.Import);
    // import a
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      const local = this._parseIdentifier();
      const defaultSpecifier: ImportDefaultSpecifier = {
        type: NodeType.ImportDefaultSpecifier,
        local,
        start: local.start,
        end: local.end,
      };
      specifiers.push(defaultSpecifier);
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        this._goNext(TokenType.Comma);
      }
    }
    // import { name1 }
    if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      this._goNext(TokenType.LeftCurly);
      while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
        const specifier = this._parseIdentifier();
        let local = null;
        if (this._checkCurrentTokenType(TokenType.As)) {
          this._goNext(TokenType.As);
          local = this._parseIdentifier();
        }
        const importSpecifier: ImportSpecifier = {
          type: NodeType.ImportSpecifier,
          imported: specifier,
          local: local ? local : specifier,
          start: specifier.start,
          end: local ? local.end : specifier.end,
        };
        specifiers.push(importSpecifier);
        if (this._checkCurrentTokenType(TokenType.Comma)) {
          this._goNext(TokenType.Comma);
        }
      }
      this._goNext(TokenType.RightCurly);
    }
    // import * as a
    else if (this._checkCurrentTokenType(TokenType.Asterisk)) {
      const { start } = this._getCurrentToken();
      this._goNext(TokenType.Asterisk);
      this._goNext(TokenType.As);
      const local = this._parseIdentifier();
      const importNamespaceSpecifier: ImportNamespaceSpecifier = {
        type: NodeType.ImportNamespaceSpecifier,
        local,
        start,
        end: local.end,
      };
      specifiers.push(importNamespaceSpecifier);
    }

    // from 'a'
    if (this._checkCurrentTokenType(TokenType.From)) {
      this._goNext(TokenType.From);
    }
    const source = this._parseLiteral();
    const node: ImportDeclaration = {
      type: NodeType.ImportDeclaration,
      specifiers: specifiers as ImportSpecifiers,
      start,
      end: source.end,
      source,
    };
    this._skipSemicolon();
    return node;
  }
  /**
   * @description: 解析 export 声明
   * @return {ExportDeclaration}
   */
  private _parseExportDeclaration(): ExportDeclaration {
    const { start } = this._getCurrentToken();
    let exportDeclaration: ExportDeclaration | undefined;
    const specifiers: ExportSpecifier[] = [];
    this._goNext(TokenType.Export);
    // export default
    if (this._checkCurrentTokenType(TokenType.Default)) {
      this._goNext(TokenType.Default);
      // export default a
      // export default obj.a
      if (this._checkCurrentTokenType(TokenType.Identifier)) {
        const local = this._parseExpression();
        exportDeclaration = {
          type: NodeType.ExportDefaultDeclaration,
          declaration: local,
          start: local.start,
          end: local.end,
        };
      }
      // export default function() {}
      if (this._checkCurrentTokenType(TokenType.Function)) {
        const declaration = this._parseFunctionDeclaration();
        exportDeclaration = {
          type: NodeType.ExportDefaultDeclaration,
          declaration,
          start,
          end: declaration.end,
        };
      }
      // export default class {}
      // TODO: export default { a: 1 };
    }
    // export {
    else if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      this._goNext(TokenType.LeftCurly);
      while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
        const local = this._parseIdentifier();
        let exported = local;
        if (this._checkCurrentTokenType(TokenType.As)) {
          this._goNext(TokenType.As);
          exported = this._parseIdentifier();
        }
        const exportSpecifier: ExportSpecifier = {
          type: NodeType.ExportSpecifier,
          local,
          exported,
          start: local.start,
          end: exported.end,
        };
        specifiers.push(exportSpecifier);
        if (this._checkCurrentTokenType(TokenType.Comma)) {
          this._goNext(TokenType.Comma);
        }
      }
      this._goNext(TokenType.RightCurly);
      if (this._checkCurrentTokenType(TokenType.From)) {
        this._goNext(TokenType.From);
      }
      const source = this._parseLiteral();
      exportDeclaration = {
        type: NodeType.ExportNamedDeclaration,
        specifiers,
        start,
        declaration: null,
        end: source.end,
        source,
      };
    }
    // export const/let/var
    else if (this._checkCurrentTokenType([TokenType.Const, TokenType.Let, TokenType.Var])) {
      const declaration = this._parseVariableDeclaration();
      exportDeclaration = {
        type: NodeType.ExportNamedDeclaration,
        declaration,
        start,
        end: declaration.end,
        specifiers: specifiers as ExportSpecifier[],
        source: null,
      };
      return exportDeclaration;
    }
    // export function
    else if (this._checkCurrentTokenType(TokenType.Function)) {
      const declaration = this._parseFunctionDeclaration() as FunctionDeclaration;
      exportDeclaration = {
        type: NodeType.ExportNamedDeclaration,
        declaration,
        start,
        end: declaration.end,
        specifiers: specifiers as ExportSpecifier[],
        source: null,
      };
    }
    // export * from 'mod'
    else {
      this._goNext(TokenType.Asterisk);
      let exported: Identifier | null = null;
      if (this._checkCurrentTokenType(TokenType.As)) {
        this._goNext(TokenType.As);
        exported = this._parseIdentifier();
      }
      this._goNext(TokenType.From);
      const source = this._parseLiteral();
      exportDeclaration = {
        type: NodeType.ExportAllDeclaration,
        start,
        end: source.end,
        source,
        exported,
      };
    }
    if (!exportDeclaration) {
      throw new Error('Export declaration cannot be parsed');
    }
    this._skipSemicolon();
    return exportDeclaration!;
  }
  /**
   * @description: 解析变量的声明
   * 发现 let 关键词对应的 token，进入 _parseVariableDeclaration
   * 解析变量名，如示例代码中的 foo
   * 解析函数表达式，如示例代码中的 function() {}
   * 其中，解析变量名的过程我们通过 _parseIdentifier 方法实现，解析函数表达式的过程由 _parseFunctionExpression 来实现
   * @return {VariableDeclaration}
   */
  private _parseVariableDeclaration(): VariableDeclaration {
    // 获取语句开始位置
    const { start } = this._getCurrentToken();
    // 拿到 let
    const kind = this._getCurrentToken().value;
    this._goNext([TokenType.Let, TokenType.Var, TokenType.Const]);
    const declarations = [];
    const isVariableDeclarationEnded = (): boolean => {
      if (this._checkCurrentTokenType(TokenType.Semicolon)) {
        return true;
      }
      const nextToken = this._getNextToken();
      // 往后看一个 token，如果是 =，则表示没有结束
      if (nextToken && nextToken.type === TokenType.Assign) {
        return false;
      }
      return true;
    };
    while (!isVariableDeclarationEnded()) {
      // 解析变量名 foo
      const id = this._parseIdentifier();
      let init = null;
      if (this._checkCurrentTokenType(TokenType.Assign)) {
        this._goNext(TokenType.Assign);
        if (this._checkCurrentTokenType([TokenType.Number, TokenType.StringLiteral])) {
          init = this._parseLiteral();
        } else {
          init = this._parseExpression();
        }
      }
      const declarator: VariableDeclarator = {
        type: NodeType.VariableDeclarator,
        id,
        init,
        start: id.start,
        end: init ? init.end : id.end,
      };
      declarations.push(declarator);
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        this._goNext(TokenType.Comma);
      }
    }
    // 构造 Declaration 节点
    const node: VariableDeclaration = {
      type: NodeType.VariableDeclaration,
      kind: kind as VariableKind,
      declarations,
      start,
      end: this._getPreviousToken().end,
    };
    this._skipSemicolon();
    return node;
  }

  private _parseReturnStatement(): ReturnStatement {
    const { start } = this._getCurrentToken();
    this._goNext(TokenType.Return);
    const argument = this._parseExpression();
    const node: ReturnStatement = {
      type: NodeType.ReturnStatement,
      argument,
      start,
      end: argument.end,
    };
    this._skipSemicolon();
    return node;
  }

  private _parseExpressionStatement(): ExpressionStatement {
    const expression = this._parseExpression();
    const expressionStatement: ExpressionStatement = {
      type: NodeType.ExpressionStatement,
      expression,
      start: expression.start,
      end: expression.end,
    };
    return expressionStatement;
  }

  // 解析对象的 a.b.c 嵌套结构
  private _parseExpression(): Expression {
    // 先检查是否是一个函数表达式
    if (this._checkCurrentTokenType(TokenType.Function)) {
      // 解析函数表达式
      return this._parseFunctionExpression();
    }
    if (this._checkCurrentTokenType([TokenType.Number, TokenType.StringLiteral])) {
      return this._parseLiteral();
    }
    // 拿到标识符，如 a
    let expression: Expression = this._parseIdentifier();
    while (!this._isEnd()) {
      if (this._checkCurrentTokenType(TokenType.LeftParen)) {
        expression = this._parseCallExpression(expression);
      } else if (this._checkCurrentTokenType(TokenType.Dot)) {
        // 继续解析，a.b
        expression = this._parseMemberExpression(expression as MemberExpression);
      } else if (this._checkCurrentTokenType(TokenType.Operator)) {
        // 解析 a + b
        expression = this.__parseBinaryOperatorExpression(expression);
      } else {
        break;
      }
    }
    return expression;
  }

  private __parseBinaryOperatorExpression(expression: Expression): BinaryExpression {
    const { start } = this._getCurrentToken();
    const operator = this._getCurrentToken().value!;
    this._goNext(TokenType.Operator);
    const right = this._parseExpression();
    const node: BinaryExpression = {
      type: NodeType.BinaryExpression,
      operator,
      left: expression,
      right,
      start,
      end: right.end,
    };
    return node;
  }

  private _parseMemberExpression(object: Identifier | MemberExpression): MemberExpression {
    this._goNext(TokenType.Dot);
    const property = this._parseIdentifier();
    const node: MemberExpression = {
      type: NodeType.MemberExpression,
      object,
      property,
      start: object.start,
      end: property.end,
      computed: false,
    };
    return node;
  }

  private _parseCallExpression(callee: Expression) {
    const args = this._parseParams(FunctionType.CallExpression) as Expression[];
    // 获取最后一个字符的结束位置
    const { end } = this._getPreviousToken();
    const node: CallExpression = {
      type: NodeType.CallExpression,
      callee,
      arguments: args,
      start: callee.start,
      end,
    };
    this._skipSemicolon();
    return node;
  }

  private _parseFunctionDeclaration(): FunctionDeclaration {
    const { start } = this._getCurrentToken();
    this._goNext(TokenType.Function);
    let id = null;
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      id = this._parseIdentifier();
    }
    const params = this._parseParams();
    const body = this._parseBlockStatement();
    const node: FunctionDeclaration = {
      type: NodeType.FunctionDeclaration,
      id,
      params,
      body,
      start,
      end: body.end,
    };
    return node;
  }
  /**
   * @description: 解析函数表达式
   * @return {*}
   */
  private _parseFunctionExpression(): FunctionExpression {
    const { start } = this._getCurrentToken();
    this._goNext(TokenType.Function);
    let id = null;
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      id = this._parseIdentifier();
    }
    const params = this._parseParams();
    const body = this._parseBlockStatement();
    const node: FunctionExpression = {
      type: NodeType.FunctionExpression,
      id,
      params,
      body,
      start,
      end: body.end,
    };
    return node;
  }
  /**
   * @description: 解析函数参数
   *
   */
  private _parseParams(mode: FunctionType = FunctionType.FunctionDeclaration): Identifier[] | Expression[] {
    // 消费 "("
    this._goNext(TokenType.LeftParen);
    const params = [];
    // 逐个解析括号中的参数
    while (!this._checkCurrentTokenType(TokenType.RightParen)) {
      const param =
        mode === FunctionType.FunctionDeclaration
          ? // 函数声明
            this._parseIdentifier()
          : // 函数调用
            this._parseExpression();
      params.push(param);
      if (!this._checkCurrentTokenType(TokenType.RightParen)) {
        this._goNext(TokenType.Comma);
      }
    }
    // 消费 ")"
    this._goNext(TokenType.RightParen);
    return params;
  }
  /**
   * @description: 解析字面量，const name = 'value', value就是字面量
   * @return {Literal}
   */
  private _parseLiteral(): Literal {
    const token = this._getCurrentToken();
    let value: string | number | boolean = token.value!;
    if (token.type === TokenType.Number) {
      value = Number(value);
    }
    const literal: Literal = {
      type: NodeType.Literal,
      value: token.value!,
      start: token.start,
      end: token.end,
      raw: token.raw!,
    };
    this._goNext(token.type);
    return literal;
  }
  /**
   * @description: 解析变量名
   * @return {Identifier}
   */
  private _parseIdentifier(): Identifier {
    const token = this._getCurrentToken();
    const identifier: Identifier = {
      type: NodeType.Identifier,
      name: token.value!,
      start: token.start,
      end: token.end,
    };
    this._goNext(TokenType.Identifier);
    return identifier;
  }
  /**
   * @description: 解析函数体
   * @return {BlockStatement}
   */
  private _parseBlockStatement(): BlockStatement {
    const { start } = this._getCurrentToken();
    const blockStatement: BlockStatement = {
      type: NodeType.BlockStatement,
      body: [],
      start,
      end: Infinity,
    };
    // 消费 "{"
    this._goNext(TokenType.LeftCurly);
    while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
      // 递归调用 _parseStatement 解析函数体中的语句(Statement)
      const node = this._parseStatement();
      blockStatement.body.push(node);
    }
    blockStatement.end = this._getCurrentToken().end;
    // 消费 "}"
    this._goNext(TokenType.RightCurly);
    return blockStatement;
  }

  // 检查当前的token类型是否等于传入的类型(this._tokens[this._currentIndex])
  private _checkCurrentTokenType(type: TokenType | TokenType[]): boolean {
    if (this._isEnd()) {
      return false;
    }
    const currentToken = this._tokens[this._currentIndex];
    if (Array.isArray(type)) {
      return type.includes(currentToken.type);
    } else {
      return currentToken.type === type;
    }
  }

  private _skipSemicolon(): void {
    if (this._checkCurrentTokenType(TokenType.Semicolon)) {
      this._goNext(TokenType.Semicolon);
    }
  }
  /**
   * @description: 工具方法，表示消费当前 Token，扫描位置移动到下一个 token
   * @param {TokenType} type
   * @return {Token}
   */
  private _goNext(type: TokenType | TokenType[]): Token {
    const currentToken = this._tokens[this._currentIndex];
    // 断言当前 Token 的类型，如果不能匹配，则抛出错误
    if (Array.isArray(type)) {
      if (!type.includes(currentToken.type)) {
        throw new Error(`Expect ${type.join(',')}, but got ${currentToken.type}`);
      }
    } else {
      if (currentToken.type !== type) {
        throw new Error(`Expect ${type}, but got ${currentToken.type}`);
      }
    }
    this._currentIndex++;
    return currentToken;
  }
  /**
   * @description: token 是否已经扫描完
   * @return {boolean}
   */
  private _isEnd(): boolean {
    return this._currentIndex >= this._tokens.length;
  }
  /**
   * @description: 获取当前的token
   * @return {Token}
   */
  private _getCurrentToken(): Token {
    return this._tokens[this._currentIndex];
  }

  private _getPreviousToken(): Token {
    return this._tokens[this._currentIndex - 1];
  }

  private _getNextToken(): Token | false {
    if (this._currentIndex + 1 < this._tokens.length) {
      return this._tokens[this._currentIndex + 1];
    } else {
      return false;
    }
  }
}
