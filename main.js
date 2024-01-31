function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });

      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });

      current++;
      continue;
    }

    let whitespace = /\s/;
    if (whitespace.test(char)) {
      current++;
      continue;
    }

    let number = /[0-9]/;
    if (number.test(char)) {
      let value = "";

      while (number.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "number", value });
      continue;
    }

    if (char === '"') {
      let value = "";

      char = input[++current];

      while (char != '"') {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "string", value });
      continue;
    }

    let letters = /[a-z]/i;
    if (letters.test(char)) {
      let value = "";

      while (letters.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "name", value });
      continue;
    }

    throw new Error("I dont know what this character is: " + char);
  }

  return tokens;
}

let tokens = tokenizer("(add 2 (subtract 4 2))");

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;

      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "string") {
      current++;

      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];

      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new Error(token.type);
  }

  let ast = { type: "Program", body: [] };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}
parser(tokens);
