export class Ship {
  constructor(length) {
    if (typeof length !== "number" || isNaN(length)) {
      throw new TypeError("Length must be a number");
    } else if (length <= 1 || length > 5) {
      throw new RangeError("Length must be between 1 and 5");
    }
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits >= this.length) {
      return true;
    }
    return false;
  }
}
