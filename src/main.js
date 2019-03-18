import { printUsageToStdOut, loadFileIntoList } from './utils.js';
import Trie from './trie/trie.js';

const { argv } = require('process');

const main = function() {
  const file = argv[2];
  const string = argv[3];

  if (process.argv.length < 4) {
    printUsageToStdOut();
    process.exitCode = 1;
    return;
  } else if (typeof string != 'string') {
    throw new TypeError(`the boggle board argument must be a "string" with a lenght of 16`);

  } else if (string.length != 16) {
    throw new Error(`boggle board string length must equal 16`);
  }

  const words = loadFileIntoList(file);

  const term = words[8888];
  const trie = new Trie(words);
  console.log(`total trie build time ${trie.endTime - trie.startTime}`);
  console.log(`is ${term} a known word? ${trie.search(term)}`);
  console.log(trie);
}

main();
