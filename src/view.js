import { startNewGame, playerShot } from "./index.js";
import splash from "./images/splash.png";
import kaboom from "./images/kaboom.png";

export function startScreen() {
  const body = document.querySelector("body");
  const form = document.createElement("form");
  form.id = "player-form";

  const player1Label = document.createElement("label");
  player1Label.textContent = "Player 1 Name: ";
  const player1Input = document.createElement("input");
  player1Input.type = "text";
  player1Input.name = "player1";
  player1Input.required = true;
  player1Label.appendChild(player1Input);
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Start Game";
  form.appendChild(player1Label);
  form.classList.toggle("active");
  form.appendChild(submitButton);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const player1Name = player1Input.value || "Player 1";
    const Player2Name = "Computer";
    const gameDiv = document.getElementById("game-container");
    form.classList.toggle("active");
    gameDiv.classList.toggle("active");
    startNewGame(player1Name, Player2Name);
    setupInitialBoards();
  });

  body.appendChild(form);
}

function setupInitialBoards() {
  const board1Container = document.getElementById("board1-container");
  const board2Container = document.getElementById("board2-container");
  board2Container.classList.toggle("disabled");
  addClickables(board2Container, handleClick);
}
export function renderBoard(attackedBoard, result) {
  const waitingBoardContainer = document.querySelector(
    ".board-container.waiting"
  );
  for (const miss of attackedBoard.missedAttacks) {
    const row = miss[0];
    const col = miss[1];
    const button = waitingBoardContainer.querySelector(
      `.boardSquare[data-row="${row}"][data-col="${col}"]`
    );
    if (button.querySelector("img")) continue;
    const img = document.createElement("img");
    img.src = splash;
    img.alt = "Miss";
    img.classList.add("miss-icon");
    img.width = 60;
    img.height = 60;
    button.appendChild(img);
  }
  const activeBoardContainer = document.querySelector(
    ".board-container:not(.waiting)"
  );
  activeBoardContainer.classList.toggle("waiting");
  waitingBoardContainer.classList.toggle("waiting");
}

export function renderHit(row, col) {
  const boardContainer = document.querySelector(".board-container.waiting");
  const button = boardContainer.querySelector(
    `.boardSquare[data-row="${row}"][data-col="${col}"]`
  );
  if (button.querySelector("img")) return;
  const img = document.createElement("img");
  img.src = kaboom;
  img.alt = "Hit";
  img.classList.add("hit-icon");
  img.width = 60;
  img.height = 60;
  button.appendChild(img);
}

function addClickables(boardContainer, handleClick) {
  const buttons = boardContainer.querySelectorAll(".boardSquare");
  buttons.forEach((button) => {
    button.addEventListener("click", handleClick, true);
  });
}

function handleClick(event) {
  console.log(
    !event.target.parentElement.parentElement.classList.contains("waiting")
  );
  const row = parseInt(event.target.getAttribute("data-row"));
  const col = parseInt(event.target.getAttribute("data-col"));
  if (
    event.target.tagName !== "BUTTON" ||
    event.target.classList.contains("disabled")
  ) {
    return;
  }
  if (!event.target.parentElement.parentElement.classList.contains("waiting")) {
    return;
  }
  event.target.classList.toggle("disabled", true);
  playerShot(row, col);
}
