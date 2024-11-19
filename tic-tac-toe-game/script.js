//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection 

const board = document.getElementById("game-board");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");
const twoPlayerBtn = document.getElementById("two-player-btn");
const vsComputerBtn = document.getElementById("vs-computer-btn");

let gameActive = false;
let currentPlayer = "X";
let gameMode = "TWO_PLAYER"; // or 'VS_COMPUTER'
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  if (boardState[cellIndex] !== "" || !gameActive) {
    return;
  }

  updateCell(event.target, cellIndex);
  checkResult();

  if (gameMode === "VS_COMPUTER" && currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 500);
  }
}

function updateCell(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function updateStatus() {
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${
      currentPlayer === "X" ? "O" : "X"
    } Wins!`;
    gameActive = false;
    return;
  }

  if (!boardState.includes("")) {
    statusDisplay.textContent = "Draw!";
    gameActive = false;
  }
}

function computerMove() {
  const emptyIndices = boardState
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);
  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  const cell = document.querySelector(`[data-index='${randomIndex}']`);
  updateCell(cell, randomIndex);
  checkResult();
}

function initializeGame() {
  board.innerHTML = "";
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  updateStatus();

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

restartBtn.addEventListener("click", initializeGame);
twoPlayerBtn.addEventListener("click", () => {
  gameMode = "TWO_PLAYER";
  twoPlayerBtn.classList.add("picked-mode");
  vsComputerBtn.classList.remove("picked-mode");
  initializeGame();
});
vsComputerBtn.addEventListener("click", () => {
  gameMode = "VS_COMPUTER";
  vsComputerBtn.classList.add("picked-mode");
  twoPlayerBtn.classList.remove("picked-mode");

  initializeGame();
});

initializeGame();
