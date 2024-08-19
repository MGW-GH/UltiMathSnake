// board
const cellSize = 30;
const rows = 22;
const columns = 22;
let context;
let board;

// snake
let snakeX = cellSize * Math.floor(Math.random()*rows);
let snakeY = cellSize * Math.floor(Math.random()*columns);

// food
let foodX = cellSize * Math.floor(Math.random()*rows);
let foodY = cellSize * Math.floor(Math.random()*columns);

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * cellSize;
    board.width = columns * cellSize;
    context = board.getContext("2d");

    placeFood();
    update();

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "Lime";
    context.beginPath();
    context.arc(snakeX + cellSize / 2, snakeY + cellSize / 2, cellSize / 2, 0, Math.PI * 2);
    context.fill();
    
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX + cellSize / 2, foodY + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
    context.fill();
}

function placeFood() {
    do {
        foodX = cellSize * Math.floor(Math.random() * rows);
        foodY = cellSize * Math.floor(Math.random() * columns);
    } while (foodX === snakeX && foodY === snakeY);  // Ensure food doesn't overlap with the snake
}