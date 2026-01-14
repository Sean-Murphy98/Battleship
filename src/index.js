import "./style.css";
import { Player } from "./classes/Player.js";
import { Gameboard } from "./classes/Gameboard.js";
import { Ship } from "./classes/Ship.js";
import { GameModel } from "./classes/GameModel.js";
import * as DOM from "./view.js";

function createPlayer(name, isComputer = false) {
  const gameboard = new Gameboard();
  return new Player(name, isComputer, gameboard);
}

export function startNewGame(player1Name, player2Name) {
  console.log("Starting new game between", player1Name, "and", player2Name);
  const player1 = createPlayer(player1Name, false);
  const player2 = createPlayer(player2Name, true);
  player1.gameboard.placeShip(new Ship(5), 0, 0, "horizontal");
  player1.gameboard.placeShip(new Ship(4), 2, 2, "vertical");
  player1.gameboard.placeShip(new Ship(3), 5, 5, "horizontal");
  player1.gameboard.placeShip(new Ship(3), 7, 3, "vertical");
  player1.gameboard.placeShip(new Ship(2), 9, 0, "horizontal");
  player2.gameboard.placeShip(new Ship(5), 1, 1, "vertical");
  player2.gameboard.placeShip(new Ship(4), 3, 3, "horizontal");
  player2.gameboard.placeShip(new Ship(3), 6, 6, "vertical");
  player2.gameboard.placeShip(new Ship(3), 0, 5, "horizontal");
  player2.gameboard.placeShip(new Ship(2), 9, 7, "horizontal");
  Game.setPlayers(player1, player2);
}

export function playerShot(row, col) {
  takeTurn(row, col);
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
      return;
    }
    Game.switchPlayer();
  } else {
    if (opponent.gameboard.receiveAttack(row, col)) {
      DOM.renderHit(row, col);
    }
    if (Game.getOpponent().gameboard.allShipsSunk()) {
      console.log(`${Game.currentPlayer.name} wins!`);
      return;
    }
    Game.switchPlayer();
    console.log("Computer is thinking...");
    setTimeout(takeTurn, 1000);
  }
  DOM.renderBoard(opponent.gameboard);
}
function resetGame() {
  startNewGame();
}
function init() {
  DOM.startScreen();
  //DOM.setupResetButton(resetGame);
}
const Game = new GameModel();
init();
