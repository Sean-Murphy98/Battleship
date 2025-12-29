import test from "node:test";
import { Gameboard } from "./Gameboard.js";

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test("Gameboard initializes with empty grid and no ships", () => {
  expect(gameboard.grid.length).toBe(10);
  expect(gameboard.ships.length).toBe(0);
  for (let row of gameboard.grid) {
    expect(row.length).toBe(10);
  }
  expect(gameboard.allShipsSunk()).toBe(false);
});

test("Placing a ship horizontally on the gameboard", () => {
  expect(gameboard.placeShip(3, 0, 0, "horizontal")).toBe(true);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.grid[0][0]).toBeDefined();
  expect(gameboard.grid[0][1]).toBeDefined();
  expect(gameboard.grid[0][2]).toBeDefined();
});

test("Placing a ship vertically on the gameboard", () => {
  expect(gameboard.placeShip(4, 5, 5, "vertical")).toBe(true);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.grid[5][5]).toBeDefined();
  expect(gameboard.grid[6][5]).toBeDefined();
  expect(gameboard.grid[7][5]).toBeDefined();
  expect(gameboard.grid[8][5]).toBeDefined();
});

test("Placing a ship out of bounds fails", () => {
  expect(gameboard.placeShip(3, 9, 8, "horizontal")).toBe(false);
  expect(gameboard.placeShip(4, 8, 9, "vertical")).toBe(false);
  expect(gameboard.ships.length).toBe(0);
});

test("Placing a ship overlapping another fails", () => {
  expect(gameboard.placeShip(3, 2, 2, "horizontal")).toBe(true);
  expect(gameboard.placeShip(4, 2, 3, "vertical")).toBe(false);
  expect(gameboard.ships.length).toBe(1);
});

test("Receiving an on-target attack hits a ship", () => {
  gameboard.placeShip(3, 0, 0, "horizontal");
  const ship = gameboard.grid[0][1];
  const result = gameboard.receiveAttack(0, 1);
  const spy = jest.spyOn(ship, "hit");
  expect(result).toBe(true);
  expect(spy).toHaveBeenCalled();
});

test("Receiving a missed attack", () => {
  gameboard.placeShip(3, 0, 0, "horizontal");
  const result = gameboard.receiveAttack(5, 5);
  expect(result).toBe(false);
});

test("Checking missed shots are recorded", () => {
  gameboard.receiveAttack(4, 4);
  gameboard.receiveAttack(7, 7);
  expect(gameboard.missedShots).toContainEqual([4, 4]);
  expect(gameboard.missedShots).toContainEqual([7, 7]);
});

test("All ships sunk check", () => {
  gameboard.placeShip(2, 0, 0, "horizontal");
  gameboard.placeShip(3, 5, 5, "vertical");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(5, 5);
  gameboard.receiveAttack(6, 5);
  gameboard.receiveAttack(7, 5);
  expect(gameboard.allShipsSunk()).toBe(true);
});

test("Not all ships sunk check", () => {
  gameboard.placeShip(2, 0, 0, "horizontal");
  gameboard.placeShip(3, 5, 5, "vertical");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(5, 5);
  gameboard.receiveAttack(6, 5);
  expect(gameboard.allShipsSunk()).toBe(false);
});
