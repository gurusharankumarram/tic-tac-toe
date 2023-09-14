console.log("Welcome to Tic Tac Toe");

// Audio
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

// Game Variables
let turn = "X";
let isgameover = false;
let scoreX = 0;
let scoreO = 0;

// Score Display Element
const scoreDisplay = document.createElement('div');
scoreDisplay.className = 'score';
document.body.appendChild(scoreDisplay);

// Function to update the score display
const updateScoreDisplay = () => {
    const scoreElement = document.querySelector('.score');
    scoreElement.innerText = `Score - X: ${scoreX} | O: ${scoreO}`;
};

// Function to reset the scores
const resetScores = () => {
    scoreX = 0;
    scoreO = 0;
    updateScoreDisplay();
};

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        // Rows
        [0, 1, 2, 6, 6, 0],    // Top row
        [3, 4, 5, 6, 16, 0],   // Middle row
        [6, 7, 8, 6, 26, 0],   // Bottom row

        // Columns
        [0, 3, 6, -4, 16, 90], // Left column
        [1, 4, 7, 6, 16, 90],  // Middle column
        [2, 5, 8, 16, 16, 90], // Right column

        // Diagonals
        [0, 4, 8, 5, 15, 45],  // Top-left to bottom-right diagonal
        [2, 4, 6, 5, 17, 135]  // Top-right to bottom-left diagonal
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";

            // Update the score
            if (boxtext[e[0]].innerText === "X") {
                scoreX++;
            } else {
                scoreO++;
            }
            updateScoreDisplay();

            // Start the next game after a win
            startNextGame();
        }
    });
};

// Function to start the next game automatically after a win
const startNextGame = () => {
    setTimeout(() => {
        let boxtexts = document.querySelectorAll('.boxtext');
        Array.from(boxtexts).forEach(element => {
            element.innerText = "";
        });
        turn = "X";
        isgameover = false;
        document.querySelector(".line").style.width = "0vw";
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }, 3000); // Wait for 3 seconds (3000 milliseconds) before starting the next game
};

// Get all boxes and add click event listeners
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

    // Reset the scores
    resetScores();
});

// Initial score display
updateScoreDisplay();