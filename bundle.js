'use strict';

var chalk = require('chalk');

const { readFileSync } = require('fs');

function loadFileIntoList(fPath) {
  const file = readFileSync(fPath, 'utf8');
  const list = file.split('\r\n');
  return list;
}
function pathToString(path) {
    let str = '';
    for (let i=0; i<path.length; i++) {
      const n = path[i];
      str = `${str}${n ? n.char : ''}`;
    }
    return str;
}

function generateRandomString(string_length){
    let random_string = '';
    let random_ascii;
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii);
    }
    return random_string
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
        return child.isEndOfWord;
      }
    } else {
      return false;
    }
  }

  isLeaf(str) {
    const char = str.slice(0,1);
    const rest = str.slice(1);
    const child = this.children[char];
    if (child) {
      return rest.length
      ? child.isLeaf(rest)
      : !Object.keys(child.children).length;
    } else {
      return true;
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

  isLeaf(word) {
    const root = this.root;
    return root.isLeaf(word);
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
    this._visited = false;
    this._char = letters[pos];
    this._vertices = [];
    this._point;
    this._matrix;

    this.vertices = [];

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

  get visited() { return this._visited; }
  set visited(val) { this._visited = Boolean(val); }

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

  walk(trie, results, visited, path) {
    if (visited.find(v => v.id === this.id)) { return; }
    visited = [...visited, this];
    path = [...path, this];
    const word = pathToString(path);
    if (trie.search(word)) {
      results.push(word);
    }
    if (trie.isLeaf(word)) { return; }

    const vertices = this.vertices;
    for (let i=0; i<vertices.length; i++) {
      const node = vertices[i];
      node.walk(trie, results, visited, path);
    }
  }

  pathToString(path = []) {
    let str = '';
    for (let i=0; i<path.length; i++) {
      const n = path[i];
      str = `${str}${n ? n.char : ''}`;
    }
    return str;
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
  constructor(letters = '', matrixSize = 4) {
    this.matrix = [];
    this.nodes = this.createNodes(letters);
    this.matrix = this.createMatrix(this.nodes , matrixSize);
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
    const adj = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    for (let i=0; i<matrix.length; i++) {
      for (let j=0; j<matrix[i].length; j++) {
        const node = matrix[i][j];
        node.point = new Vector2(j, i);
        node.matrix = matrix;
        for (let k=0; k<adj.length; k++) {
          const vertex = node[adj[k]];
          if (vertex) { node.vertices.push(vertex); }
        }
      }
    }
  }

  walk(trie) {
    const results = [];
    for (let i=0; i<this.nodes.length; i++) {
      const n = this.nodes[i];
      console.log(n.char);
      const visited = [];
      const path = [];
      n.walk(trie, results, visited, path);
    }
    return results;
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
        str = `${str} ${row[j].printNode(opts)}`;
      }
      str = `${str} \n`;
    }

    return str;
  }
}

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
  const results = board.walk(trie);

  console.log(
`----
    time to complete: ${delta / 1000 }
    words found: ${results.length}
    words: \n${results.reduce((str, r) => `${str}       ${r}\n`, '')}}
`);

};

main();
