export class Player {
  constructor(name, isComputer = false, gameboard) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = gameboard;
  }
}
