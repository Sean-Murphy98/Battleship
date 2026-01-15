import "./style.css";
import { Player } from "./classes/Player.js";
import { Gameboard } from "./classes/Gameboard.js";
import { Ship } from "./classes/Ship.js";
import { GameModel } from "./classes/GameModel.js";
import * as DOM from "./view.js";
import { randomizeShips } from "./computerShipPlacer.js";
import { placeShips } from "./playerShipPlacer.js";

function createComputer(name) {
  const gameboard = new Gameboard();
  return new Player(name, true, gameboard);
}

function createPlayer(name, isComputer = false) {
  const gameboard = new Gameboard();
  return new Player(name, isComputer, gameboard);
}

export function startNewGame(player1Name, player2Name, player1Coords) {
  console.log("Starting new game between", player1Name, "and", player2Name);
  dummyPlayer.Name = player1Name;
  const player2 = createComputer(player2Name);
  randomizeShips(player2.gameboard);
  Game.setPlayers(dummyPlayer, player2);
  return [dummyPlayer, player2];
}

export function placePlayerShip(row, col, direction) {
  console.log(dummyPlayer.gameboard);
  if (placeShips(dummyPlayer.gameboard, [row, col], direction)) {
    return dummyPlayer.gameboard;
  }
  return false;
}

export function playerShot(row, col) {
  return takeTurn(row, col);
}
function takeTurn(row, col) {
  const player = Game.getActivePlayer();
  const opponent = Game.getOpponent();
  console.log(`${player.name}'s turn`);
  if (player.isComputer) {
    let attackCoords;
    do {
      attackCoords = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (
      opponent.gameboard.missedAttacks.some(
        (attack) =>
          attack[0] === attackCoords[0] && attack[1] === attackCoords[1]
      )
    );
    if (opponent.gameboard.receiveAttack(attackCoords[0], attackCoords[1])) {
      DOM.renderHit(attackCoords[0], attackCoords[1]);
    }
    if (Game.getOpponent().gameboard.allShipsSunk()) {
      console.log(`${Game.currentPlayer.name} wins!`);
      DOM.renderWin(player.name);
      return;
    }
    Game.switchPlayer();
  } else {
    if (opponent.gameboard.receiveAttack(row, col)) {
      DOM.renderHit(row, col);
    }
    if (Game.getOpponent().gameboard.allShipsSunk()) {
      console.log(`${Game.currentPlayer.name} wins!`);
      DOM.renderWin(player.name);
      return;
    }
    Game.switchPlayer();
    console.log("Computer is thinking...");
    setTimeout(takeTurn, 1000);
  }
  DOM.renderBoard(opponent.gameboard);
}
function init() {
  DOM.startScreen();
  //DOM.setupResetButton(resetGame);
}
const dummyPlayer = createPlayer("Dummy");
const Game = new GameModel();
init();
