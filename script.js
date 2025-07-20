const board = document.getElementById('board');
const statusText = document.getElementById('status');
const winLine = document.getElementById('winLine');
let currentPlayer = 'X';
let gameActive = true;
const cells = [];
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function showWinLine(indexes) {
  const firstCell = cells[indexes[0]].getBoundingClientRect();
  const lastCell = cells[indexes[2]].getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  const x1 = firstCell.left + firstCell.width / 2 - boardRect.left;
  const y1 = firstCell.top + firstCell.height / 2 - boardRect.top;
  const x2 = lastCell.left + lastCell.width / 2 - boardRect.left;
  const y2 = lastCell.top + lastCell.height / 2 - boardRect.top;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  winLine.style.width = length + 'px';
  winLine.style.left = x1 + 'px';
  winLine.style.top = y1 + 'px';
  winLine.style.transform = `rotate(${angle}deg)`;
  winLine.style.display = 'block';
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      statusText.textContent = `🎉 Player ${gameState[a]} wins!`;
      showWinLine([a, b, c]);
      return;
    }
  }

  if (!gameState.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function handleCellClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer);

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  cells.length = 0;
  winLine.style.display = 'none';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function restartGame() {
  createBoard();
}

createBoard();
