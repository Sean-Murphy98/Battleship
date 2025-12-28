import { Ship } from "./Ship.js";

describe("Ship Class Tests with standard length", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(3);
  });
  test("Ship initializes with correct length and hits", () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship registers hits correctly", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });
  test("Ship sinks correctly after enough hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBe(true);
  });
  test("Ship does not sink prematurely", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});

test("Ship Class Tests with non-numeric length", () => {
  expect(() => {
    new Ship("three");
  }).toThrow(TypeError);
});

test("Ship Class Test with negative length", () => {
  expect(() => {
    new Ship(-3);
  }).toThrow(RangeError);
});
test("Ship Class Test with zero length", () => {
  expect(() => {
    new Ship(0);
  }).toThrow(RangeError);
});
test("Ship Class Test for ship over max length", () => {
  expect(() => {
    new Ship(6);
  }).toThrow(RangeError);
});
