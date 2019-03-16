import TrieNode from './node.js';
export default class Trie {

  constructor(words = [], maxCount) {
    const start = Date.now();
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
