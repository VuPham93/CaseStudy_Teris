function setSpeed() {
    if (score <= 20) {
        document.getElementById("speedLV").innerHTML = '1';
        return 800 + bonusSpeed + dropSpeed;
    }
    if (score <= 40) {
        document.getElementById("speedLV").innerHTML = '2';
        return 700 + bonusSpeed + dropSpeed;
    }
    if (score <= 60) {
        document.getElementById("speedLV").innerHTML = '3';
        return 600 + bonusSpeed + dropSpeed;
    }
    if (score <= 70) {
        document.getElementById("speedLV").innerHTML = '4';
        return 500 + bonusSpeed + dropSpeed;
    }
    if (score <= 100) {
        document.getElementById("speedLV").innerHTML = '5';
        return 400 + bonusSpeed + dropSpeed;
    }
    if (score <= 130) {
        document.getElementById("speedLV").innerHTML = '6';
        return 350 + bonusSpeed + dropSpeed;
    }
    if (score <= 160) {
        document.getElementById("speedLV").innerHTML = '7';
        return 300 + bonusSpeed + dropSpeed;
    }
    if (score <= 200) {
        document.getElementById("speedLV").innerHTML = '8';
        return 250 + bonusSpeed + dropSpeed;
    }
    if (score <= 250) {
        document.getElementById("speedLV").innerHTML = '9';
        return 200 + bonusSpeed + dropSpeed;
    }
    else
        {
        document.getElementById("speedLV").innerHTML = '10';
        return 100 + bonusSpeed + dropSpeed;
        }
}

function setDifficult(value) {
    if (value === 1) {
        bonusSpeed = 400;
        return bonusSpeed;
    }
    if (value === 2) {
        bonusSpeed = 200;
        return bonusSpeed;
    }
    if (value === 3) {
        bonusSpeed = 0;
        return bonusSpeed;
    }
}
