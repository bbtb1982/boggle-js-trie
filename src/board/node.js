import * as chalk from 'chalk';
import Vector2 from '../data/vector2.js';
import { pathToString } from '../utils.js';

export default class BoardNode {
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
  set visited(val) { this._visited = Boolean(val) }

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
