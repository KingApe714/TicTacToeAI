import root from "./buildTree.js";

const innerContainer = document.querySelector(".inner-container");

let current = root;

export default class GameNode {
  constructor(i, j) {
    this.div = document.createElement("div");
    this.div.className = "game-tile";
    this.played = false;
    this.i = i;
    this.j = j;
    this.div.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.playMove();
    });
    this.div.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.playMove();
    });
  }

  playMove() {
    console.log(current);
    this.div.innerHTML = "O";
    this.played = true;

    const board = current.board;
    const play = 10 ** (8 - (this.i * 3 + this.j));
    const key = board + play;
    current = current.children[key];

    let maxWinner = -Infinity;
    let maxChild = null;

    for (const key in current.children) {
      const child = current.children[key];
      if (child.winner > maxWinner) {
        maxWinner = child.winner;
        maxChild = child;
      }
    }

    current = maxChild;

    const tile = gameBoard[current.i][current.j];
    tile.div.innerHTML = "X";
    tile.played = true;
  }
}

export const gameBoard = [
  [new GameNode(0, 0), new GameNode(0, 1), new GameNode(0, 2)],
  [new GameNode(1, 0), new GameNode(1, 1), new GameNode(1, 2)],
  [new GameNode(2, 0), new GameNode(2, 1), new GameNode(2, 2)],
];

for (const row of gameBoard) {
  const gameRow = document.createElement("div");
  gameRow.className = "game-row";

  for (const cell of row) {
    gameRow.appendChild(cell.div);
  }

  innerContainer.appendChild(gameRow);
}
