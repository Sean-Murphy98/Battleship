export class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  allShipsSunk() {
    if (this.ships.length === 0) return false;
    return this.ships.every((ship) => ship.isSunk());
  }

  placeShip(ship, row, col, orientation) {
    if (this.isOutOfBounds(ship, row, col, orientation)) {
      return false;
    }
    if (this.isOverlapping(ship, row, col, orientation)) {
      return false;
    }
    this.ships.push(ship);
    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][col + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][col] = ship;
      }
    }
    return true;
  }
  receiveAttack(row, col) {
    const cell = this.grid[row][col];
    if (cell === null) {
      this.missedAttacks.push([row, col]);
      return false;
    }
    cell.hit();
    return true;
  }
  isOutOfBounds(ship, row, col, orientated) {
    if (orientated === "horizontal") {
      return col + ship.length > 10;
    } else {
      return row + ship.length > 10;
    }
  }
  isOverlapping(ship, row, col, orientation) {
    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row][col + i] !== null) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row + i][col] !== null) {
          return true;
        }
      }
    }
    return false;
  }
}
