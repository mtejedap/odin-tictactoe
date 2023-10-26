let currentMarker = "x";
let player1Score = 0;
let player2Score = 0;

const gameboard = (function () {
    const gameboard = [];

    const updateGameboard = (cell) => {
        gameboard[cell] = currentMarker;
        let marker = checkVictory();
        const display = document.querySelector(".display");
        const player1 = document.querySelector(".player1");
        const player2 = document.querySelector(".player2");
        if (marker == "x") {
            display.textContent = "Player X Wins!";
            player1Score++;
            player1.textContent = "Player X: " + player1Score;
            resetGameboard();
        } else if (marker == "o") {
            display.textContent = "Player O Wins!";
            player2Score++;
            player2.textContent = "Player O: " + player2Score;
            resetGameboard();
        } else if (marker == "draw") {
            display.textContent = "Draw!";
            resetGameboard();
        }
    }

    const checkVictory = () => {
        let row = true;
        for (let i = 0; i < 3; i++) {
            row = true;
            let marker = gameboard[i * 3];
            if (marker == "x" || marker == "o") {
                for (let j = (i * 3); j < ((i + 1) * 3); j++) {
                    if (marker != gameboard[j]) {
                        row = false;
                    }
                }
                if (row == true) {
                    return marker;
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            row = true;
            let marker = gameboard[i];
            if (marker == "x" || marker == "o") {
                for (let j = i; j < 9; j = j + 3) {
                    if (marker != gameboard[j]) {
                        row = false;
                    }
                }
                if (row == true) {
                    return marker;
                }
            }
        }
        if (gameboard[4] == "x") {
            if (gameboard[0] == "x" && gameboard[8] == "x") {
                return "x";
            } else if (gameboard[2] == "x" && gameboard[6] == "x") {
                return "x";
            }
        } else if (gameboard[4] == "o") {
            if (gameboard[0] == "o" && gameboard[8] == "o") {
                return "o";
            } else if (gameboard[2] == "o" && gameboard[6] == "o") {
                return "o";
            }
        }
        let full = true;
        for (let i = 0; i < 9; i++) {
            if (gameboard[i] != "x" && gameboard[i] != "o") {
                full = false;
            }
        }
        if (full == true) {
            return "draw";
        }
    }

    const resetGameboard = () => {
        const cells = document.querySelectorAll(".cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
            gameboard[i] = "";
        }
    }

    return { gameboard, updateGameboard, resetGameboard }
})();

const cells = document.querySelectorAll(".cell");

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", () => {
        if (gameboard.gameboard[i] == "x" || gameboard.gameboard[i] == "o") {
            return;
        }
        cells[i].textContent = currentMarker.toUpperCase();
        gameboard.updateGameboard(i);
        if (currentMarker == "x") {
            currentMarker = "o";
        } else {
            currentMarker = "x";
        }
    });
}

const newGame = document.querySelector(".new-game");
newGame.addEventListener("click", () => {
    gameboard.resetGameboard();
    player1Score = 0;
    player2Score = 0;
    currentMarker = "x";
    const display = document.querySelector(".display");
    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector(".player2");
    display.textContent = "";
    player1.textContent = "Player X: 0";
    player2.textContent = "Player O: 0";
});