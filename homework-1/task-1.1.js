import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const border = '=============';

const prompt = `
${border}
write here your string
your input: `;

const reverseInput = () => rl.question(prompt, (input) => {
  const reversedInput = [...input].reverse().join('');

  console.log(`here is the reversed string: ${reversedInput}`);
  console.log(border);

  reverseInput();
});

reverseInput();
