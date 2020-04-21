let Brick = function (brick, color) {
    this.brick = brick;
    this.color = color;
    this.brickId = 0;
    this.activeBrick = this.brick[this.brickId];
    this.x = 3;
    this.y = -2;
};

function randomBrick() {
    let random = Math.floor(Math.random() * BRICKS.length);
    return new Brick(BRICKS[random][0], BRICKS[random][1]);
}

let newBrick = randomBrick();

Brick.prototype.fill = function (color) {
    for (let r = 0; r < this.activeBrick.length; r++) {
        for (let c = 0; c < this.activeBrick.length; c++) {
            if( this.activeBrick[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
};

Brick.prototype.draw = function () {
    this.fill (this.color);
};

Brick.prototype.delete = function () {
    this.fill (BOARD_COLOR);
};

Brick.prototype.collision = function (x, y, brick) {
    for (let r = 0; r < brick.length; r++) {
        for (let c = 0; c < brick.length; c++) {
            if(brick[r][c] === 0) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            if (newY < 0) {
                continue;
            }
            if (board[newY][newX] !== BOARD_COLOR) {
                return true;
            }
        }
    }
    return false;
};

Brick.prototype.lock = function() {
    for (let r = 0; r < this.activeBrick.length; r++) {
        for (let c = 0; c < this.activeBrick.length; c++) {
            if(!this.activeBrick[r][c]) {
                continue;
            }
            if (this.y + r < 0) {
                gameOver = true;
                document.getElementById("theme").pause();
                document.getElementById("gameOver").play();
                document.getElementById("finish").innerHTML = "Game Over";
                document.getElementById('newGame').style.display="block";

                break;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    for (let row = 0; row < ROW; row++) {
        let  isRowFull = true;
        for (let col = 0; col < COL; col++) {
            isRowFull = isRowFull && (board[row][col]) !== BOARD_COLOR;
        }
        if (isRowFull) {
            for (let y = row; y > 1; y--) {
                for (let col = 0; col < COL; col++) {
                    board[y][col] = board[y - 1][col];
                    document.getElementById("clear").play();
                }
            }
            for (let col = 0; col < COL; col++) {
                board[0][col] = BOARD_COLOR;
            }
            score += 10;
            lineCount += 1;
            document.getElementById("lineCount").innerHTML = lineCount;
            document.getElementById("score").innerHTML = score;
            if (typeof (Storage) !== "undefined") {
                localStorage.highScore = 0;
                if (score > localStorage.highScore) {
                    localStorage.highScore = score;
                }
            }
        }
        drawBoard();
    }
};
if (localStorage.highScore === undefined) {
    document.getElementById("highScore").innerHTML = '0';
}
else {
    document.getElementById("highScore").innerHTML = localStorage.highScore;
}

function drop() {
    let now = Date.now();
    let time = now - dropStart;
    if (time > setSpeed()) {
        newBrick.moveDown();
        dropStart = Date.now()
    }
    if (!gameOver) {
        window.requestAnimationFrame(drop);
    }
}

window.requestAnimationFrame(drop);

function playButtonClicked() {
    dropSpeed = 0;
    document.getElementById('playButton').blur();

}function newGame() {
    location.reload();
}

