export default class Path {
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
