// board
const cellSize = 35;
const rows = 22;
const columns = 22;
let context;
let board;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * cellSize;
    board.width = columns * cellSize;
    context = board.getContext("2d");

    update();

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
}
