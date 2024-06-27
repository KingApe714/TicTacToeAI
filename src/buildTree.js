const Node = function (board = 1_000_000_000, zeroCount = 9) {
  this.board = board;
  this.winner = null; // greater than 0 means bot wins and less than zero means user wins.
  this.children = {};
  this.userPlay = null;
  this.zeroCount = zeroCount;
  this.i = null;
  this.j = null;
};

const buildNextNode = (board, pos, player, zeroCount) => {
  const leftSide = Math.floor(board / 10 ** (pos + 1));
  const rightSide = board % 10 ** pos;
  const addPlayer = leftSide * 10 + player;
  const newBoard = addPlayer * 10 ** pos + rightSide;
  const nextNode = new Node(newBoard, zeroCount - 1);
  const winner = checkWinner(newBoard, zeroCount);

  nextNode.i = 2 - Math.floor(pos / 3);
  nextNode.j = 2 - (pos % 3);
  nextNode.winner = winner;
  return nextNode;
};

const checkWinner = (board, zeroCount) => {
  for (let i = 2; i >= 0; i -= 1) {
    // grab the row
    const rowPos1 = Math.floor(board / 10 ** (3 * i + 2)) % 10;
    const rowPos2 = Math.floor(board / 10 ** (3 * i + 1)) % 10;
    const rowPos3 = Math.floor(board / 10 ** (3 * i)) % 10;

    // grab the columns
    const colPos1 = Math.floor(board / 10 ** (8 - (2 - i))) % 10;
    const colPos2 = Math.floor(board / 10 ** (5 - (2 - i))) % 10;
    const colPos3 = Math.floor(board / 10 ** (2 - (2 - i))) % 10;

    if (
      rowPos1 &&
      rowPos2 &&
      rowPos3 &&
      rowPos1 === rowPos2 &&
      rowPos2 === rowPos3
    )
      return rowPos1 === 2 ? zeroCount : -1 * zeroCount;
    if (
      colPos1 &&
      colPos2 &&
      colPos3 &&
      colPos1 === colPos2 &&
      colPos2 === colPos3
    )
      return colPos1 === 2 ? zeroCount : -1 * zeroCount;
  }

  // grab diagonal points
  const pos8 = Math.floor(board / 10 ** 8) % 10;
  const pos6 = Math.floor(board / 10 ** 6) % 10;
  const pos4 = Math.floor(board / 10 ** 4) % 10;
  const pos2 = Math.floor(board / 10 ** 2) % 10;
  const pos0 = Math.floor(board / 10 ** 0) % 10;

  if (pos8 && pos4 && pos0 && pos8 === pos4 && pos4 === pos0)
    return pos8 === 2 ? zeroCount : -1 * zeroCount;
  if (pos6 && pos4 && pos2 && pos6 === pos4 && pos4 === pos2)
    return pos6 === 2 ? zeroCount : -1 * zeroCount;

  return zeroCount === 0 ? 0 : null;
};

// the three winner types by priority are:
//  - 1 = bot wins
//  - 0 = draw
//  - -1 = user wins
const buildTree = (root) => {
  const dfs = (node) => {
    if (!node) return null;
    // if (node.winner) return node.winner;

    const board = node.board;

    for (let pos = 8; pos >= 0; pos -= 1) {
      const num = Math.floor(board / 10 ** pos) % 10;

      if (num === 0) {
        if (node.userPlay === null) {
          // here I know that I'm looking at the root node so I want to have both bot and player as children
          const nextNode1 = buildNextNode(board, pos, 1, node.zeroCount);
          node.children[nextNode1.board] = nextNode1;
          nextNode1.userPlay = true;
          if (!nextNode1.winner) nextNode1.winner = dfs(nextNode1);

          const nextNode2 = buildNextNode(board, pos, 2, node.zeroCount);
          node.children[nextNode2.board] = nextNode2;
          nextNode2.userPlay = false;
          if (!nextNode2.winner) nextNode2.winner = dfs(nextNode2);

          node.winner = nextNode2.winner;
        } else {
          const player = node.userPlay ? 2 : 1;
          const nextNode = buildNextNode(board, pos, player, node.zeroCount);
          nextNode.userPlay = !node.userPlay;
          node.children[nextNode.board] = nextNode;

          if (!nextNode.winner) nextNode.winner = dfs(nextNode);

          if (node.userPlay) {
            node.winner =
              node.winner === null
                ? nextNode.winner
                : Math.max(node.winner, nextNode.winner);
          } else {
            node.winner =
              node.winner === null
                ? nextNode.winner
                : Math.min(node.winner, nextNode.winner);
          }
        }
      }
    }

    return node.winner;
  };

  dfs(root);
  return root;
};

const root = new Node();
buildTree(root);

export default root;
