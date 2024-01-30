function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: "paran",
        value: "(",
      });

      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: "paran",
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

    throw new console.error("I dont know what this character is: " + char);
  }

  return tokens;
}

console.log(tokenizer("(add 2 (subtract 4 2))"));
