const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 40;
const BOARD_COLOR = "black";
let score = 0;
let dropSpeed;
let bonusSpeed = 200;
let dropStart = Date.now();
let gameOver = false;
let lineCount = 0;

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#FF2D95";
    ctx.globalAlpha = 0.8;
}

let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
        board[r][c] = BOARD_COLOR;
    }
}

function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();
