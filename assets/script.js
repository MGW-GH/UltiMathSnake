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


// numbers
let answerX = cellSize * Math.floor(Math.random()*columns);
let answerY = cellSize * Math.floor(Math.random()*rows);

let incorrectX = cellSize * Math.floor(Math.random()*columns);
let incorrectY = cellSize * Math.floor(Math.random()*rows);

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * cellSize;
    board.width = columns * cellSize;
    context = board.getContext("2d");

    placeNumbers();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "Lime";
    snakeX += velocityX * cellSize;
    snakeY += velocityY * cellSize;
    context.beginPath();
    context.arc(snakeX + cellSize / 2, snakeY + cellSize / 2, cellSize / 1.5, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "red";
    context.font ="15px Arial";
    context.fillText(Math.floor(Math.random()*50), answerX, answerY, cellSize);
    context.fillText(Math.floor(Math.random()*50), incorrectX, incorrectY, cellSize);

}

function placeNumbers() {
    do {
        answerX;
        answerY;
        incorrectX;
        incorrectY;
    } while ((answerX === snakeX && answerY === snakeY) || (incorrectX === snakeX && incorrectY === snakeY) || (answerX === incorrectX && incorrectY === snakeY));  // Ensure food doesn't overlap with the snake
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

