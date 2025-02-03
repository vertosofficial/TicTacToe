// Game functions //

var gMove = 0; 				// Move counter
var gGameOver = false; 		// Game over flag
var gGrid = [["", "", ""],
    		["", "", ""],
    		["", "", ""]]; 	// Game grid

function onLoad() {
    var grid_size = 3;
    var gameGrid = document.getElementById("Grid");
    var gridHTML = "";
    
    // Reset game variables
    gMove = 0;
    gGameOver = false;
    gGrid = [["", "", ""], 
             ["", "", ""], 
             ["", "", ""]];

    // Generate HTML Grid
    for(var row = 0; row < grid_size; row++) {
        gridHTML += "<tr>";
        for(var col = 0; col < grid_size; col++)
            gridHTML += '<td id="' + row + col + '" onclick="choose(this);"></td>';    // Add click event to each cell
        gridHTML += "</tr>";
    }
    gameGrid.innerHTML = gridHTML;

    // Clear the result message
    var winnerDiv = document.getElementById("Result");
    winnerDiv.innerHTML = "";
}
function choose(element) {
    var id = element.getAttribute("id");
    const [row, col] = getPosFromId(id);

    if(gGrid[row][col] != "" || gGameOver)
        return;

    var player = "";
    if(gMove % 2 == 0) {    // Odd -> X
        player = "X";
        element.classList.add("X");
    } else {                // Even -> O
        player = "O";
        element.classList.add("O");
    }

    element.innerHTML = player;
    gGrid[row][col] = player;
    gMove++;
    checkWinner();
}
function getPosFromId(id) {
    var row = id[0];    // "01" -> [0, 1]
    if(row < '0' || row > '2') {
        alert('Wrong ID', i);
        return null;
    }
    var column = id[1]; // "01" -> [0, 1]
    if(column < '0' || column > '2') {
        alert('Wrong ID', i);
        return null;
    }

    var result = [row.valueOf(), column.valueOf()];
    return result;
}
function checkRows() {
    for(let row = 0; row < 3; row++) {
        if(gGrid[row][0] !== "" && gGrid[row][0] === gGrid[row][1] && gGrid[row][0] === gGrid[row][2]) {
            return gGrid[row][0];
        }
    }
    
    return null;
}
function checkColumns() {
    for(let col = 0; col < 3; col++) {
        if(gGrid[0][col] !== "" && gGrid[0][col] === gGrid[1][col] && gGrid[0][col] === gGrid[2][col]) {
            return gGrid[0][col];
        }
    }

    return null;
}
function checkDiagonals() {
    if(gGrid[0][0] !== "" && gGrid[0][0] === gGrid[1][1] && gGrid[0][0] === gGrid[2][2])
        return gGrid[0][0];
    if(gGrid[0][2] !== "" && gGrid[0][2] === gGrid[1][1] && gGrid[0][2] === gGrid[2][0])
        return gGrid[0][2];

    return null;
}
function checkWinner() {
    let winner = checkRows() || checkColumns() || checkDiagonals();
    
    if(winner) {
        announceWinner(winner);
        return;
    }
    if(gMove === 9)
        announceDraw();
}
function announceWinner(winner) {
    var resultDiv = document.getElementById("Result");
    resultDiv.innerHTML = `<h1>Winner: ${winner}! Click here to restart.</h1>`;
    resultDiv.onclick = onLoad;
    gGameOver = true;
}
function announceDraw() {
    var resultDiv = document.getElementById("Result");
    resultDiv.innerHTML = `<h1>It's a draw! Click here to restart.</h1>`;
    resultDiv.onclick = onLoad;
    gGameOver = true;
}
