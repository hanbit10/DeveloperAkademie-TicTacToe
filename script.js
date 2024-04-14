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

// Function to handle player moves
function handleMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === generateCircleSVG() ? generateXSVG() : generateCircleSVG();
    render();
    animateSVG();
    checkWin(); // Check for win condition after each move
  }
}

function animateSVG() {
  const xLines = document.querySelectorAll(".x-line1, .x-line2");
  xLines.forEach((line) => {
    line.style.strokeDasharray = "200";
    line.style.strokeDashoffset = "200";
    line.style.animation = "drawLine 1.5s ease forwards";
  });
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

// Initialize the game
init();

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
