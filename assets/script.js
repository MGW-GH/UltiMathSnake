// board
const cellSize = 14;
const rows = 32;
const columns = 22;
let context;
let board;

// snake
let snakeX = cellSize * Math.floor(Math.random()*columns);
let snakeY = cellSize * Math.floor(Math.random()*rows);

let velocityX = 0;
let velocityY = 0;


// food
let foodX = cellSize * Math.floor(Math.random()*columns);
let foodY = cellSize * Math.floor(Math.random()*rows);

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * cellSize;
    board.width = columns * cellSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    update();

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "Lime";
    context.beginPath();
    context.arc(snakeX + cellSize / 2, snakeY + cellSize / 2, cellSize / 1.5, 0, Math.PI * 2);
    context.fill();
    
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX + cellSize / 2, foodY + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
    context.fill();
}

function placeFood() {
    do {
        foodX;
        foodY;
    } while (foodX === snakeX && foodY === snakeY);  // Ensure food doesn't overlap with the snake
}

function changeDirection(e) {
    if (e.code == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

