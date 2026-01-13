class GameModel {
  constructor() {
    this.currentPlayer;
  }

  setPlayers(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.opponentPlayer = player2;
  }

  getActivePlayer() {
    return this.currentPlayer;
  }

  getOpponent() {
    return this.opponentPlayer;
  }

  switchPlayer() {
    this.opponentPlayer = this.currentPlayer;
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
}
export { GameModel };
