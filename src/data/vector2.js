export default class Vector2 {
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
