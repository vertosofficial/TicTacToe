// Game functions //
var move = 0; 				// Move counter
var gameOver = false; 		// Game over flag
var grid = [["", "", ""],
    		["", "", ""],
    		["", "", ""]]; 	// Game grid

function onLoad() {             // Start function
    var n = 3; 										// Grid size (3x3)
    var table = document.getElementById("Grid");	// Get the table element
    var s = "";									    // String to be inserted in the table
    
    // Reset game variables //
    move = 0;
    gameOver = false;
    grid = [["", "", ""], 
            ["", "", ""], 
            ["", "", ""]];

    for (var i = 0; i < n; i++) {   // Create table rows
        s += "<tr>";
        for (var j = 0; j < n; j++) // Create table cells
            s += '<td id="' + i + j + '" onclick="choose(this);"></td>';    // Add click event to each cell
        s += "</tr>";
    }
    table.innerHTML = s; // Insert the string in the table

    // Clear the winner div //
    var winnerDiv = document.getElementById("winner");
    winnerDiv.innerHTML = "";
}
function choose(element) {      // Click function
    var id = element.getAttribute("id");    // Get the ID of the clicked element
    const [i, j] = getPosFromId(id); 	    // Get the position from the getPosFromId()

    if (grid[i][j] != "" || gameOver)   // If the cell is already filled or the game is over
        return;

    var s = "";         // String to be inserted in the cell
    if (move % 2 == 0)  // Odd moves are X  
        s = "X";        
    else                // Even moves are O
        s = "O";

    element.innerHTML = s;  // Update the cell's visible content
    grid[i][j] = s;         // Update the data matrix
    move++;                 // Increment the move counter
    checkWinner();          // Check if there is a winner
}
function getPosFromId(id) {     // Find APosition From ID
    // For example, "01" is the position [0, 1]
    var row = id[0];                // The first character represents the row number
    if (row < '0' || row > '2') {   // If the character is not a number between 0 and 2
        alert('ID errato ', i);
        return null;
    }
    var column = id[1];                     // The second character represents the column number
    if (column < '0' || column > '2') {     // If the character is not a number between 0 and 2
        alert('ID errato ', i);
        return null;
    }

    var result = [row.valueOf(), column.valueOf()]; // Restituisce la posizione come coppia di valori
    return result;
}
function checkWinner() {        // Check Winner
    for (i = 0; i < 3; i++) {   
        result = checkColumn(i);
        if (result == false)
            result = checkRow(i);
        if (result == false)
            result = checkDiagonals();
        
        if (result) {   // Finded a winner
            winnerDiv = document.getElementById("winner");                                              // Get the winner div
            winnerDiv.innerHTML = "<h1>Finded a winner: " + result + " Click here to restart</h1>";     // Update the winner div
            winnerDiv.onclick = onLoad;                                                                 // Restart the game on click
            gameOver = true;                                                                            // Set the game over flag
     
            return result;
        }
    }

    return false;
}
function checkRow(row) {        // Check Row
    [a, b, c] = grid[row];  // Get the row
    if (a == b && a == c)   // If all the cells are equal
        return a;
    return false;
}
function checkColumn(column) {  // Check Column
    [a, b, column] = [grid[0][column], grid[1][column], grid[2][column]];
    if (a == b && a == column)
        return a;
    return false;
}
function checkDiagonals() {     // Check Diagonals
    if (grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2])
        return grid[0][0];
    if (grid[0][2] == grid[1][1] && grid[0][2] == grid[2][0])
        return grid[0][2];
    return false;
}

