// board
const cellSize = 35;
const rows = 22;
const columns = 22;

window.onload = function () {
    let board = document.getElementById("board");
    board.height = rows * cellSize;
    board.width = columns * cellSize;
    let context = board.getContext("2d");

    update();

}

function update() {
    context.fillStyle = "black";
    context.fillRec = (0, 0, board.height, board.width);
    
}

