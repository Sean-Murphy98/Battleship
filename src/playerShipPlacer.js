import { Ship } from "./classes/Ship.js";

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

export function placeShips(board, coord, direction) {
  const ship = new Ship(SHIP_LENGTHS[0]);
  if (board.placeShip(ship, coord[0], coord[1], direction)) {
    SHIP_LENGTHS.shift();
    return true;
  }
  return false;
}
