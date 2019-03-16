export default class TrieNode {
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
