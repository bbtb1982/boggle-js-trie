import { loadFileIntoList } from './utils.js';
import Trie from './trie/trie.js';
import Board from './board/board.js';

const { argv } = require('process');

const main = function() {
  const file = argv[2];
  const letters = argv[3];

  if (process.argv.length < 4) {
    console.log(`useage: \n\tfile <path> path to word list\n\tletters <string> 16 char string`);
    process.exitCode = 1;
    return;
  } else if (typeof letters != 'string') {
    throw new TypeError(`letters argument must be a "string" with a lenght of 16`);

  } else if (letters.length != 16) {
    throw new Error(`boggle letters length must equal 16`);
  }

  const words = loadFileIntoList(file);

  const term = words[8888];
  const trie = new Trie(words);
  const board = new Board(letters);

  console.log(board.toString());
  board.nodes.forEach(n => console.log(n.toString()));
  //console.log('board', board);
  //console.log(`total trie build time ${trie.endTime - trie.startTime}`);
  //console.log(`is ${term} a known word? ${trie.search(term)}`);
  //console.log(trie);
}

main();
