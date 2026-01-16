import { Ship } from "./classes/Ship.js";

const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  patrolBoat: 2,
};

export function placeShips(board, coord, direction, shipType) {
  console.log("Placing ship:", shipType, "at", coord, "facing", direction);
  console.log("Ship length:", SHIP_LENGTHS[shipType]);
  const ship = new Ship(SHIP_LENGTHS[shipType]);
  if (board.placeShip(ship, coord[0], coord[1], direction)) {
    return true;
  }
  return false;
}
