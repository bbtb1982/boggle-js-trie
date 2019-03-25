'use strict';

var chalk = require('chalk');

const { readFileSync } = require('fs');

function loadFileIntoList(fPath) {
  const file = readFileSync(fPath, 'utf8');
  const list = file.split('\r\n');
  return list;
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

class Path {
  constructor(path = []) {
    debugger;
    this.path = [];
    this.path = [...path];
  }

  toString() {
    for (let i=0; i<this.path.length; i++) {
      const n = this.path[i];
      let str = '';
      str = `${str}${str.char}`;
    }
    return str;
  }

}

class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(a) {
    this.x + a.x;
    this.y + a.x;
    return this;
  }

  static add(a, b) {
    return new Vector2( a.x + b.x, a.y + b.y );
  }
}

class BoardNode {
  constructor(letters, pos) {
    this._id = pos;
    this._isVisited = false;
    this._char = letters[pos];
    this._point;
    this._matrix;

    this._nVector = new Vector2(0, -1);
    this._neVector = new Vector2(1,1);
    this._eVector = new Vector2(1, 0);
    this._seVector = new Vector2(1, -1);
    this._sVector = new Vector2(0, -1);
    this._swVector = new Vector2(-1, -1);
    this._wVector = new Vector2(-1, 0);
    this._nwVector = new Vector2(-1, 1);
  }

  get matrix() { return this._matrix; }
  set matrix(val) { this._matrix = val; }

  get id() { return this._id; }
  set id(id) { this._id = id; }

  get char() { return this._char; }
  set char(val) { this._char = val; }

  get isVisited() { return this._isVisied; }
  set isVisited(val) { this._isVisited = val; }

  get point() { return this._point; }
  set point(val) { this._point = val; }

  get n() {
    const pV = Vector2.add(this.point, this._nVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get ne() {
    const pV = Vector2.add(this.point, this._neVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get e() {
    const pV = Vector2.add(this.point, this._eVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get se() {
    const pV = Vector2.add(this.point, this._seVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get s() {
    const pV = Vector2.add(this.point, this._sVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get sw() {
    const pV = Vector2.add(this.point, this._swVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get w() {
    const pV = Vector2.add(this.point, this._wVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  get nw() {
    const pV = Vector2.add(this.point, this._nwVector);
    const matrix = this.matrix;
    return matrix[pV.y] && matrix[pV.y][pV.x]
    ? matrix[pV.y][pV.x]
    : undefined;
  }

  printNode(opts = {}) {
    const { highlight_visited } = opts;
    return highlight_visited && this.is_visited
    ? chalk.red(this.char)
    : this.char;
  }

  walk(trie, path) {
    if (this.n) {
      return this.n
        .walk(trie, new Path([...path.path, this.n]));
    }
  }

  toString() {
    let str = `${this.char}:: `;
    str = `${str}  n:${this.n ? this.n.char : '_'}`;
    str = `${str}  ne:${this.ne ? this.ne.char : '_'}`;
    str = `${str}  e:${this.e ? this.e.char : '_'}`;
    str = `${str}  se:${this.se ? this.se.char : '_'}`;
    str = `${str}  s:${this.s ? this.s.char : '_'}`;
    str = `${str}  sw:${this.sw ? this.sw.char : '_'}`;
    str = `${str}  w:${this.w ? this.w.char : '_'}`;
    str = `${str}  nw:${this.nw ? this.nw.char : '_'}`;
    return str;
  }
}

class Board {
  constructor(letters = '') {
    this.matrix = [];
    this.nodes = this.createNodes(letters);
    this.matrix = this.createMatrix(this.nodes);
    this.createGraph(this.matrix);
  }

  createNodes(letters) {
    const nodes = [];
    for (let i=0; i<letters.length; i++) {
      const n = new BoardNode(letters, i);
      n.matrix = this.matrix;
      nodes.push(n);
    }
    return nodes;
  }

  createMatrix(nodes, chunkSize = 4) {
    const matrix = [];
    for (let i=0; i<nodes.length; i=i+chunkSize) {
      matrix.push(nodes.slice(i, i+chunkSize));
    }
    return matrix;
  }

  createGraph(matrix) {
    for (let i=0; i<matrix.length; i++) {
      for (let j=0; j<matrix[i].length; j++) {
        const node = matrix[i][j];
        node.point = new Vector2(j, i);
        node.matrix = matrix;
      }
    }
  }

  walk(trie) {
    for (let i=0; i<this.nodes.length; i++) {
      const n = this.nodes[i];
      const result = n.walk(trie, new Path([n]));
    }
    debugger;
  }

  toString(_opts = {}) {
    let defaults = {
      highlight_visited: true,
    };
    const opts = {...defaults, ..._opts};
    let str = '';
    for (let i=0; i<this.matrix.length; i++) {
      const row = this.matrix[i];
      for (let j=0; j<row.length; j++) {
        str = str + row[j].printNode(opts);
      }
      str = str + '\n';
    }

    return str;
  }
}

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
  console.log(board.walk(trie));
};

main();
