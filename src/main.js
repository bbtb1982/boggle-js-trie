import { loadFileIntoList, generateRandomString } from './utils.js';
import Trie from './trie/trie.js';
import Board from './board/board.js';

const { argv } = require('process');

const main = function() {
  const start = Date.now();

  if (
    argv[2] === '--help' ||
    argv[2] === '-h'
  ) {
    console.log(
`useage:
    file <string> path to word list
    matrixSize  [number 4]  row and column length.
      e.g. 4  is a 4x4. the cols and row need to match the length of the string.
    letters [string] if provied needs to be the equal the (matrixSize ^ 2).
`);
    process.exitCode = 1;
    return;
}

  const file = argv[2];
  let matrixSize = parseInt(argv[3]);
  let letters = argv[4];

  if (matrixSize && isNaN(matrixSize)) {
    throw new TypeError(` ${matrixSize} matrixSize argument must be a "number", ${matrixSize} is type ${typeof matrixSize}`);
  } else if (letters && (typeof letters != 'string')) {
    throw new TypeError(`letters argument must be a "string" with a length of 16`);
  } else if (letters && (letters.length != (matrixSize * matrixSize))) {
    throw new Error(`boggle letters length must equal 16`);
  }

  if (!matrixSize) {
    matrixSize = 4;
  }

  if (!letters) {
    const len = Math.pow(matrixSize, 2);
    letters = generateRandomString(len);
    console.log(len, letters);
  }

  const words = loadFileIntoList(file);

  const term = words[8888];
  const trie = new Trie(words);
  const board = new Board(letters, matrixSize);

  console.log(board.toString());
  const end = Date.now();
  const delta = end - start;
  const results = [...new Set(board.walk(trie))]

  console.log(
`----
    time to complete: ${delta / 1000 }
    words found: ${results.length}
    words: \n${results.reduce((str, r) => `${str}       ${r}\n`, '')}}
`);

}

main();
