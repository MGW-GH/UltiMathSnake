// declaring variables
let rows = 26;
let columns = 22;
let cellSize = 14;
let context;
let board;
let hiddenAnswer;
let wrongAnswer;
let scoreTally = 0;
let gameOver = false;
let shuffleMode = false;


// snake
let snakeX = cellSize * Math.floor(Math.random()*columns);
let snakeY = cellSize * Math.floor(Math.random()*rows);

let velocityX = 0;
let velocityY = 0;

let lastDirection = { x: 0, y: 0 }; // Initial direction is stationary

let snakeBody = [{x: snakeX, y: snakeY}];


// numbers
let answerX = cellSize * Math.floor(Math.random()*columns);
let answerY = cellSize * Math.floor(Math.random()*rows);

let incorrectX = cellSize * Math.floor(Math.random()*columns);
let incorrectY = cellSize * Math.floor(Math.random()*rows);


// Function to adjust board size
function resize() {
    if ((window.innerWidth) >= 1024) {     
    columns = 40;
    rows = 40;
    } else {
        columns = 22;
        rows = 26;
    }
}

// functionality created when window is loaded creating game board and elements and using update function (https://chatgpt.com/) & (https://www.youtube.com/watch?v=baBq5GAL0_U)
window.onload = function() {
    resize();

    board = document.getElementById("board");
    board.height = rows * cellSize;
    board.width = columns * cellSize;
    context = board.getContext("2d");

    placeNumbers();

    // Add event listeners for arrow keys
    document.addEventListener("keydown", changeDirection);

    // Add event listeners for touch controls
    document.getElementById('up-btn').addEventListener('click', function(e) {
        changeDirection({ target: e.target });
    });
    document.getElementById('down-btn').addEventListener('click', function(e) {
        changeDirection({ target: e.target });
    });
    document.getElementById('left-btn').addEventListener('click', function(e) {
        changeDirection({ target: e.target });
    });
    document.getElementById('right-btn').addEventListener('click', function(e) {
        changeDirection({ target: e.target });
    });
    setInterval(update, 1000/10);
    

}

// event listener for use of operator buttons (https://github.com/Code-Institute-Org/love-maths)
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let gameType = this.getAttribute("data-type");
            if (gameType === "shuffle") {
                shuffleMode = true;
            } else {
                shuffleMode = false;
            }
            runGame(gameType);
            setActiveBtn(this);
        });  
    }

    runGame("addition");
}); 

// update function (https://github.com/Code-Institute-Org/love-maths) & (https://chatgpt.com/)
function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Update snake's position
    snakeX += velocityX * cellSize;
    snakeY += velocityY * cellSize;

    // Update `lastDirection` to the current direction
    lastDirection = { x: velocityX, y: velocityY };

    // Add new head pos to snake's body
    snakeBody.push({x: snakeX, y: snakeY});

    if (snakeX === answerX && snakeY === (answerY - cellSize)) {

        // Update score
        score();

        if (shuffleMode) {
            displayShuffleQuestion(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
        } else {
            // Otherwise, display question based on selected operator
            let gameType = document.getElementById('operator').textContent;
            if (gameType === "-") {
                displaySubtractQuestion(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            } else if (gameType === "x") {
                displayMultiplyQuestion(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            } else if (gameType === "/") {
                displayDivideQuestion(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            } else if (gameType === "+") {
                displayAdditionQuestion(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            }
        }
        // Reposition the answers
        placeNumbers();
    } else {
        // If the snake didn't eat the answer, remove last part
        snakeBody.shift();   
    }

    //Draw the snake
    context.fillStyle = "Lime";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i].x, snakeBody[i].y, cellSize, cellSize);
    }

    // Draw the answers
    context.fillStyle = "red";
    context.font = "15px Arial";
    context.fillText(hiddenAnswer, answerX, answerY);
    context.fillText(wrongAnswer, incorrectX, incorrectY);

    // game over conditions
    if (snakeX < 0 || snakeX > (columns - 1)*cellSize ||snakeY < 0 || snakeY > (rows - 1)*cellSize) {
        alert("GAME OVER!");
        gameOver = true;
    }

    if (snakeX === incorrectX && snakeY === (incorrectY - cellSize)) {
        alert("GAME OVER!");
        gameOver = true;
    }

    for (let i = 0; i < (snakeBody.length - 1); i++) {
        if (snakeX == snakeBody[i].x && snakeY == snakeBody[i].y) {
            gameOver = true;
            alert("GAME OVER!");
        }
    }
}

// generate answers
function placeNumbers() {
    do {
        answerX = cellSize * Math.floor(Math.random() * columns);
        answerY = cellSize * Math.floor(Math.random() * rows);
        incorrectX = cellSize * Math.floor(Math.random() * columns);
        incorrectY = cellSize * Math.floor(Math.random() * rows);
        
        // Ensure that the answers are not too close to the top or bottom edges
        if (answerY < cellSize) {
            answerY += cellSize;
        }
        if (answerY > (rows - 1) * cellSize) {
            answerY -= cellSize;
        }
        
        if (incorrectY < cellSize) {
            incorrectY += cellSize;
        }
        if (incorrectY > (rows - 1) * cellSize) {
            incorrectY -= cellSize;
        }

    } while ((answerX === snakeX && answerY === snakeY) || (incorrectX === snakeX && incorrectY === snakeY) || (answerX === incorrectX && incorrectY === snakeY));  // Ensure food doesn't overlap with the snake
}

// fucntion to change direction when relevant (https://www.youtube.com/watch?v=baBq5GAL0_U)
function changeDirection(e) {

    if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
        e.preventDefault();
    }

    if (gameOver) return;

    if ((e.code === "ArrowUp" || e.target.id === "up-btn") && lastDirection.y === 0) {
        velocityX = 0;
        velocityY = -1;
    } 
    else if ((e.code === "ArrowDown" || e.target.id === "down-btn") && lastDirection.y === 0) {
        velocityX = 0;
        velocityY = 1;
    }
    else if ((e.code === "ArrowLeft" || e.target.id === "left-btn") && lastDirection.x === 0) {
        velocityX = -1;
        velocityY = 0;
    }
    else if ((e.code === "ArrowRight" || e.target.id === "right-btn") && lastDirection.x === 0) {
        velocityX = 1;
        velocityY = 0;
    }
}

// run game function for type of operator (https://github.com/Code-Institute-Org/love-maths)
function runGame(gameType) {

    // Creates two random numbers between 0 and 24
    
    let X = Math.floor(Math.random() * 25);
    let Y = Math.floor(Math.random() * 25);


    let operator = sumType(gameType);
    let operatorElement = document.getElementById('operator');

    // Remove any existing color classes
    operatorElement.classList.remove('blue', 'orange', 'red', 'green');

    // Add a new class based on the selected game type
    if (gameType === "addition") {
        operatorElement.classList.add('green');
    } else if (gameType === "subtract") {
        operatorElement.classList.add('blue');
    } else if (gameType === "multiply") {
        operatorElement.classList.add('orange');
    } else if (gameType === "division") {
        operatorElement.classList.add('red');
    }

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
    } else if (gameType === "shuffle") {
        displayShuffleQuestion(X, Y);
    }
    
    return answer;
}

// function to return operator value
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
    } else if (gameType === "shuffle"){
        operator = operators[Math.floor(Math.random() * operators.length)];
    } else {
        throw `Unknown operator for game type: ${gameType}`;
    }
    return operator;
}

// Function to set the active button
function setActiveBtn(selectedButton) {
    // Remove the active class from all buttons
    let buttons = document.getElementsByClassName("btn");
    for (let button of buttons) {
        button.classList.remove("active");
    }

    // Add the active class to the selected button
    selectedButton.classList.add("active");
}

// keeping the operator button selected with active style (https://chatgpt.com/)
function keepOperatorSelected() {
    let activeButton = document.querySelector(".btn.active");
    if (activeButton) {
        activeButton.focus();  // Ensure the button remains focused
    }
}


// functions to display the equation with the correct operator chosen

function displayAdditionQuestion(X, Y) {

    const eqArr = ["X", "Y", "X", "Y", "X", "A"];
    let missingNumber = eqArr[(Math.floor(Math.random() * eqArr.length))];
    document.getElementById('operator').textContent = "+";
    

    if(missingNumber === "X") {
        document.getElementById('X').textContent = "?";
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = X + Y;
        hiddenAnswer = X;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X;
        

    } else if (missingNumber === "Y") {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = "?";
        document.getElementById('answer').textContent = X + Y;
        hiddenAnswer = Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return Y;

    } else {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = "?";
        hiddenAnswer = X+Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X+Y;
    }


}

function displaySubtractQuestion(X, Y) {

    const eqArr = ["X", "Y", "X", "Y", "X", "A"];
    let missingNumber = eqArr[(Math.floor(Math.random() * eqArr.length))];
    document.getElementById('operator').textContent = "-";
    

    if(missingNumber === "X") {
        document.getElementById('X').textContent = "?";
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = X - Y;
        hiddenAnswer = X;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X;
        

    } else if (missingNumber === "Y") {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = "?";
        document.getElementById('answer').textContent = X - Y;
        hiddenAnswer = Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return Y;

    } else {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = "?";
        hiddenAnswer = X-Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X-Y;
    }


}

function displayMultiplyQuestion(X, Y) {

    const eqArr = ["X", "Y", "X", "Y", "X", "A"];
    if (Y === 0) {
        missingNumber = "A";
    } else if (X === 0) {
        missingNumber = "A";
    } else {
        missingNumber = eqArr[(Math.floor(Math.random() * eqArr.length))];
    }
    document.getElementById('operator').textContent = "x";
    

    if(missingNumber === "X") {
        document.getElementById('X').textContent = "?";
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = X * Y;
        hiddenAnswer = X;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X;
        

    } else if (missingNumber === "Y") {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = "?";
        document.getElementById('answer').textContent = X * Y;
        hiddenAnswer = Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return Y;

    } else {
        document.getElementById('X').textContent = X;
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = "?";
        hiddenAnswer = X*Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X*Y;
    }


}

// Division equation with help (https://chatgpt.com/)
function displayDivideQuestion(X, Y) {
    if (Y === 0) {
        Y = 1; // Set a default value to avoid zero division
    }

    if (X === 0) {
        X = -1;
    }


    const result = (X*Y / Y);


    const eqArr = ["X", "Y", "X", "Y", "X", "A"];
    let missingNumber = eqArr[(Math.floor(Math.random() * eqArr.length))];
    document.getElementById('operator').textContent = "/";
    

    if(missingNumber === "X") {
        document.getElementById('X').textContent = "?";
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = X*Y / Y;
        hiddenAnswer = X*Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return X;
        

    } else if (missingNumber === "Y") {
        document.getElementById('X').textContent = X*Y;
        document.getElementById('Y').textContent = "?";
        document.getElementById('answer').textContent = X*Y / Y;
        hiddenAnswer = Y;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return Y;

    } else {
        document.getElementById('X').textContent = X*Y;
        document.getElementById('Y').textContent = Y;
        document.getElementById('answer').textContent = "?";
        hiddenAnswer = result;
        do {
            wrongAnswer = Math.floor((Math.random() - 0.5) * 10) + hiddenAnswer;
        } while (wrongAnswer === hiddenAnswer);
        return result;
    }


}

const operators = ["+", "-", "*", "/"];

const questions = [displayAdditionQuestion, displaySubtractQuestion, displayMultiplyQuestion, displayDivideQuestion];

function displayShuffleQuestion(X, Y) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    randomQuestion(X, Y);
}

// score
function score() {
    if (snakeX === answerX && snakeY === (answerY - cellSize)) {
        scoreTally += 1;
        document.getElementById('score').textContent = (scoreTally * scoreTally) + (scoreTally - 1);

    }
}