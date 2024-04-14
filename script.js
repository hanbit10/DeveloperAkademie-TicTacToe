let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

function init() {
  render();
}

// Function to render the game board
function render() {
  const boardElement = document.getElementById("content");
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleMove(index));
    boardElement.appendChild(cellElement);
  });
}

// Function to handle player moves
function handleMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    render();
    checkWin(); // Check for win condition after each move
  }
}

// Function to check for win/draw conditions
function checkWin() {
  // Define winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if any winning combination is achieved
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      alert(`Player ${board[a]} wins!`);
      // You might want to reset the game here
      return;
    }
  }

  // Check for draw condition
  if (!board.includes("")) {
    alert("It's a draw!");
    // You might want to reset the game here
  }
}
