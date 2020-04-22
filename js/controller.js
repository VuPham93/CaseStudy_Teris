document.body.onkeyup = function (e) {
    let keys = {
        32: 'drop',
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyUp( keys[ e.keyCode ] );
    }
};

function keyUp(key) {
    if (key === 'drop')
        dropSpeed = 0;
}

document.body.onkeydown = function(e) {
    let keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
        32: 'drop',
        13: 'pause',
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        e.preventDefault();
        document.getElementById("theme").play();
    }
};

function keyPress(key) {
    switch (key) {
        case 'left': {
            dropSpeed = 0;
            newBrick.moveLeft();
        }
        break;
        case 'right': {
            dropSpeed = 0;
            newBrick.moveRight();
        }
        break;
        case 'down': {
            dropSpeed = 0;
            newBrick.moveDown();
        }
        break;
        case 'rotate': {
            dropSpeed = 0;
            newBrick.rotate();
        }
        break;
        case 'drop': {
            dropSpeed = 0;
            newBrick.dropBrick();
        }
        break;
        case 'pause': {
            pauseGame();
        }
            break;
    }
}

function mouseUp() {
    dropSpeed = 0;
}

Brick.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.activeBrick)) {
        this.delete();
        this.y++;
        this.draw();
    }
    else {
        this.lock();
        document.getElementById("fall").play();
        newBrick = randomBrick();
    }
};
Brick.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.activeBrick)) {
        this.delete();
        this.x--;
        this.draw();
    }
};
Brick.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.activeBrick)) {
        this.delete();
        this.x++;
        this.draw();
    }
};
Brick.prototype.rotate = function () {
    let nextPattern = this.brick[(this.brickId + 1)%this.brick.length];
    let kick = 0;
    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL/2) {
            kick = -1;
        } else {
            kick = 1;
        }
    }
    if (!+this.collision(kick, 0, nextPattern)) {
        this.delete();
        this.x += kick;
        this.brickId = (this.brickId + 1)%this.brick.length;
        this.activeBrick = this.brick[this.brickId];
        document.getElementById("brickRotate").play();
        this.draw();
    }
};

Brick.prototype.dropBrick = function () {
    if (!this.collision(0, 1, this.activeBrick)) {
        this.delete();
        this.y++;
        dropSpeed = -3000;
        this.draw();
    }
    else {
        this.lock();
        newBrick = randomBrick();
    }
};

function pauseGame() {
    if (dropSpeed === 0) {
        dropSpeed = Infinity;
        document.getElementById('pause').style.display = "none";
        document.getElementById('playButton').style.display = "block";
    }
    else {
        dropSpeed = 0;
        document.getElementById('pause').style.display = "block";
        document.getElementById('playButton').style.display = "none";
    }
}

