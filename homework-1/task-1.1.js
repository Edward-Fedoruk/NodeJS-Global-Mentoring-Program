import { Transform } from 'stream';

const reverseStringStream = new Transform({
  transform(chunk, encoding, next) {
    const inputString = chunk.toString();
    const reversedString = [...inputString].reverse().join('');
    this.push(`${reversedString}\n\r`);
    next();
  },
});

process.stdin.pipe(reverseStringStream).pipe(process.stdout);
