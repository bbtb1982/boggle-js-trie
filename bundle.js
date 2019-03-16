'use strict';

const { readFileSync } = require('fs');

function loadFileIntoList(fPath) {
  const file = readFileSync(fPath, 'utf8');
  const list = file.split('\r\n');
  return list;
}
function printUsageToStdOut() {
    console.log(`useage: \n\tfile <path> path to word list\n\tboggle board <string> 16 char string`);
}

class TrieNode {
  constructor() {
    this.char;
    this.isEndOfWord = false;
    this.children = {};
  }

  insert(str) {
    const char = str.slice(0,1);
    const rest = str.slice(1);
    let child = this.children[char];

    if (child) {
      if(rest.length) {
        child.insert(rest);
      } else {
        child.isEndOfWord = true;
      }
    } else {
      child = new TrieNode();
      child.char = char;
      child.isEndOfWord = rest.length ? false : true;
      this.children[char] = child;

      if (!child.isEndOfWord) {
        child.insert(rest);
      }
    }
  }

  search(str) {
    const char = str.slice(0,1);
    const rest = str.slice(1);
    const child = this.children[char];

    if (child) {
      if (rest.length) {
        return child.search(rest);
      } else {
        debugger;
        return child.isEndOfWord;
      }
    } else {
      return false;
    }
  }
}

class Trie {

  constructor(words = [], maxCount) {
    if (!Array.isArray(words)) {
      throw TypeError('words must be a list');
    }

    this.totalWords = words.length;
    this.startTime = Date.now();
    this.root = new TrieNode();

    for (let i=0; i<words.length; i++) {
      const word = words[i];
      if (maxCount && maxCount < i) { break; }
      if (word.length >= 3) {
        this.filteredWords = i;
        this.root.insert(word.toLowerCase());
      }
    }

    this.endTime = Date.now();
  }

  search(word) {
    const root = this.root;
    return root.search(word);
  }
}

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
};

main();
