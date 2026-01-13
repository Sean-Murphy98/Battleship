import { startNewGame } from "./index.js";

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
  });

  body.appendChild(form);
}
