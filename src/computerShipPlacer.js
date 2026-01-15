import { Ship } from "./classes/Ship.js";

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

export function randomizeShips(board) {
  board.ships.length = 0;

  SHIP_LENGTHS.forEach((length) => {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

      placed = board.placeShip(new Ship(length), x, y, direction);
    }
  });
}
