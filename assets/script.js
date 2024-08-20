// board
const cellSize = 14;
const rows = 28;
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

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let gameType = this.getAttribute("data-type");
                runGame(gameType);
        });  
    }

    runGame("addition");
});

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
    context.fillText(missingNumber, answerX, answerY, cellSize);
    context.fillText(Y, incorrectX, incorrectY, cellSize);

    
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

function runGame(gameType) {

    // Creates two random numbers between 0 and 24
    let X = Math.floor(Math.random() * 25);
    let Y = Math.floor(Math.random() * 25);

    let operator = sumType(gameType);

    let equation = `${X} ${operator} ${Y}`;

    let answer = eval(equation);


    if (gameType === "addition") {
        displayAdditionQuestion(X, Y);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(X, Y);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(X, Y);
    } else if (gameType === "division") {
        displayDivideQuestion(X, Y); 
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
    
    return answer;
}


function sumType(gameType) {
    let operator;
    if(gameType === "addition"){
        operator = "+";
    } else if (gameType === "subtract"){
        operator = "-";
    } else if (gameType === "multiply"){
        operator = "*";
    } else if (gameType === "division"){
        operator = "/";
    } else {
        throw `Unknown operator for game type: ${gameType}`;
    }
    return operator;
}

function displayAdditionQuestion(X, Y) {

    const eqArr = ["X", "Y", "X", "Y", "X", "A"];
    let missingNumber = eqArr[(Math.floor(Math.random() * eqArr.length))];
    document.getElementById('operator').textContent = "+";

    if(missingNumber === "X") {
        document.getElementById('X').textContent = "?";
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = X + Y;

    } else if (missingNumber === "Y") {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = "?";
        document.getElementById('answer').textContent = X + Y;

    } else {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = "?";
    }

    return missingNumber;
}

function displaySubtractQuestion(X, Y) {
    document.getElementById('X').textContent = X;
    document.getElementById('Y').textContent = Y;
    document.getElementById('operator').textContent = "-";
    document.getElementById('answer').textContent = X - Y;

}

function displayMultiplyQuestion(X, Y) {
    document.getElementById('X').textContent = X;
    document.getElementById('Y').textContent = Y;
    document.getElementById('operator').textContent = "x";
    document.getElementById('answer').textContent = X * Y;
}

function displayDivideQuestion(X, Y) {
    document.getElementById('X').textContent = X;
    document.getElementById('Y').textContent = Y;
    document.getElementById('operator').textContent = "/";
    document.getElementById('answer').textContent = X / Y;
}

   /* function sumType() {
    return operators[(Math.floor(Math.random()*operators.length))];
    }
    */
