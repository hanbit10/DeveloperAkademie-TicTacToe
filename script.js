let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = generateXSVG(); // Initialize currentPlayer with SVG code

function init() {
  render();
}

function render() {
  const boardElement = document.getElementById("content");
  boardElement.innerHTML = ""; // Clear previous content

  // Create table element
  const table = document.createElement("table");

  // Loop through the board array to create table rows and cells
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 3; j++) {
      const cellIndex = i * 3 + j;
      const cellValue = board[cellIndex];

      const cell = document.createElement("td");
      cell.innerHTML = cellValue; // Set inner HTML to the SVG code
      cell.setAttribute("data-index", cellIndex);
      cell.setAttribute("data-content", cellValue); // Set data-content attribute
      cell.addEventListener("click", () => handleMove(cellIndex));

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  // Append the table to the board element
  boardElement.appendChild(table);
}

function handleMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === generateCircleSVG() ? generateXSVG() : generateCircleSVG();
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
      drawWinningLine(combination); // Draw the winning line
      console.log(combination);
      // You might want to reset the game here
      // Inside the checkWin function after the alert for win or draw
      let restart = document.getElementById("restartButton");
      restart.classList.remove("d-none");
      return;
    }
  }

  // Check for draw condition
  if (!board.includes("")) {
    // You might want to reset the game here
    restartGame();
  }
}

function generateCircleSVG() {
  const outerRadius = 35; // Outer radius of the circle
  const innerRadius = 25; // Inner radius of the hole

  // SVG attributes
  const svgWidth = 70; // Width of the SVG
  const svgHeight = 70; // Height of the SVG
  const circleColor = "#00B0EF"; // Color of the circle
  const holeColor = "#323232"; // Background color of the hole

  // SVG HTML code for the circle with a hole
  const svgCode = `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer circle representing the circle with a hole -->
      <circle cx="${svgWidth / 2}" cy="${svgHeight / 2}" r="${outerRadius}" fill="${circleColor}" />
      <!-- Inner circle representing the hole -->
      <circle cx="${svgWidth / 2}" cy="${svgHeight / 2}" r="${innerRadius}" fill="${holeColor}" />
    </svg>
  `;

  return svgCode;
}

function generateXSVG() {
  const width = 80; // Width of the X
  const height = 80; // Height of the X
  const thickness = 15; // Thickness of the lines
  const color = "#ffc000"; // Color of the X

  // SVG HTML code for the X symbol
  const svgCode = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <line id="x-line1" x1="${thickness}" y1="${thickness}" x2="${width - thickness}" y2="${
    height - thickness
  }" stroke="${color}" stroke-width="${thickness}" />
      <line id="x-line2" x1="${width - thickness}" y1="${thickness}" x2="${thickness}" y2="${
    height - thickness
  }" stroke="${color}" stroke-width="${thickness}" />
    </svg>
  `;

  return svgCode;
}

function drawWinningLine(combination) {
  // Remove any existing winning lines
  const existingLine = document.querySelector(".winning-line");
  if (existingLine) {
    existingLine.remove();
  }

  const lineColor = "#ffffff";
  const lineWidth = 8;

  const startCell = document.querySelectorAll(`td`)[combination[0]];
  const endCell = document.querySelectorAll(`td`)[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const contentRect = document.getElementById("content").getBoundingClientRect();

  // Calculate line length to extend beyond the boundaries of the cells
  const lineLength = Math.sqrt(Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)); // Adjust as needed

  const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  const line = document.createElement("div");
  line.className = "winning-line"; // Add a class to identify winning lines
  line.style.position = "absolute";
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
  line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  document.getElementById("content").appendChild(line);
}

function restartGame() {
  // Clear the board
  const boardCells = document.querySelectorAll("td");
  boardCells.forEach((cell) => {
    cell.innerHTML = "";
    cell.setAttribute("data-content", "");
  });

  // Reset the board array
  board = ["", "", "", "", "", "", "", "", ""];

  // Remove any winning lines
  const winningLines = document.querySelectorAll(".winning-line");
  winningLines.forEach((line) => line.remove());
}
