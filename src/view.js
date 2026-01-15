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
    const players = startNewGame(player1Name, Player2Name);
    setupInitialBoards(players[0].gameboard, players[1].gameboard);
    setupResetButton(player1Name, Player2Name);
    renderWin("Sean");
  });

  body.appendChild(form);
}

function setupInitialBoards(player1Board, player2Board) {
  const board1Container = document.getElementById("board1-container");
  const board2Container = document.getElementById("board2-container");
  board2Container.classList.toggle("disabled");
  addClickables(board2Container, handleClick);
  renderShips(board1Container, player1Board);
}

function renderShips(boardContainer, board) {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = board.grid[row][col];
      if (cell !== null) {
        const button = boardContainer.querySelector(
          `.boardSquare[data-row="${row}"][data-col="${col}"]`
        );
        button.classList.add("ship");
      }
    }
  }
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

function setupResetButton(player1Name, player2Name) {
  const rstButton = document.getElementById("reset-button");
  rstButton.addEventListener("click", () => {
    const players = startNewGame(player1Name, player2Name);
    resetBoardContainers();
    const board1Container = document.getElementById("board1-container");
    const board2Container = document.getElementById("board2-container");
    board2Container.classList.toggle("disabled", false);
    renderShips(board1Container, players[0].gameboard);
  });
}

function addClickables(boardContainer, handleClick) {
  const buttons = boardContainer.querySelectorAll(".boardSquare");
  buttons.forEach((button) => {
    button.addEventListener("click", handleClick, false);
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

function resetBoardContainers() {
  const boardContainers = document.querySelectorAll(".board-container");
  boardContainers.forEach((container) => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const button = container.querySelector(
          `.boardSquare[data-row="${row}"][data-col="${col}"]`
        );
        button.className = "boardSquare";
        while (button.firstChild) {
          button.removeChild(button.firstChild);
        }
      }
    }
  });
}

export function renderWin(winnerName) {
  const dialog = document.querySelector("#win-dialog");
  const winDiv = document.createElement("div");
  winDiv.id = "win-screen";
  const winMessage = document.createElement("h2");
  winMessage.textContent = `${winnerName} Wins!`;
  const rstButton = document.getElementById("reset-button");
  rstButton.textContent = "Play Again";
  const boardContainers = document.querySelectorAll(".board-container");
  boardContainers.forEach((container) => {
    container.classList.toggle("disabled", true);
  });
  winDiv.appendChild(winMessage);
  dialog.prepend(winDiv);
  dialog.showModal();
  const closeButton = document.getElementById("close-win-dialog");
  closeButton.addEventListener("click", () => {
    dialog.close();
    winDiv.remove();
  });
}
