import BoardNode from './node.js';
import Vector2 from '../data/vector2.js';

export default class Board {
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
    }
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
