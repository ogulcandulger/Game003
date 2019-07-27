let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.background = "black";


let hiddenMessageColor = "black";
let hiddenMessage2Color = "black"
let jumpSound = new Audio("jump.mp3");
let blockColor = "red";
let blockHeight = 30;
let blockWidth = 30;
let blockY = (canvas.height-blockHeight);
let blockX = canvas.width/2;
let dy = 2;
let dx = 2;
let played = false;
let fall = false;


let upPressed = false;
let rightPressed = false;
let leftPressed = false;
let a = 0;
let b = 0;
let c = 1;
let counter = 0;
let jumpDif = 0;

let brickX = 200;
let brickY = 240;
let brickHeight = 20;
let brickWidth = 80;
let brickColor = "#0095DD";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const hiddenMessage = () => {    
    ctx.font = "30px Georgia"
    ctx.fillStyle = hiddenMessageColor;
    ctx.textAlign = "center";
    ctx.fillText("That's enough jumping", canvas.width/2, canvas.height/2-40); 
} 

const hiddenMessage2 = () => {    
    ctx.font = "35px Georgia"
    ctx.fillStyle = hiddenMessage2Color;
    ctx.textAlign = "center";
    ctx.fillText("I said enough, dude!", canvas.width/2, canvas.height/2+10); 
} 

function drawBlock() {
    ctx.beginPath();
    ctx.rect(blockX, blockY-1, blockWidth, blockHeight);
    ctx.fillStyle = blockColor;
    ctx.fill();
    ctx.closePath();
}

const drawBricks = () => {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
}

const reset = () => {
    upPressed = false;
    fall = false;
    a = 0;
    blockColor = getRandomColor();
    played = 0;
    c = 1;
}

const collisionDetection = () => {
    if(blockY <= brickY+ blockHeight-5) {
        if(blockX > brickX-blockWidth && blockX <= brickX+brickWidth) {    
            if(brickY <= blockY) {    
                c = 0;
                brickColor = getRandomColor();
            }
            else if(blockY + blockHeight >= brickY) {
                jumpDif = canvas.height -brickY;
                brickColor = getRandomColor();
            }
        } 
        else if(jumpDif !== 0 ) {
            if(a === 0) {
                jumpDif = 0;
                fall = true;
                c = 0;
                played = 1;
            } else {
                jumpDif = 0;
            }            
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock();
    hiddenMessage();
    hiddenMessage2();
    drawBricks();
    collisionDetection();
    if(rightPressed) {
        blockX += dx;
    }         
    else if(leftPressed) {
        blockX -= dx;
    }        
    if(upPressed || fall) {
        a += 0.14;
        if(!played){
            jumpSound.play();
            played = true;
        }
        blockY -= 5.5*a*c - (1/3 * 4 * a**2);            
        if(blockY > (canvas.height-blockHeight-jumpDif)) {
            counter++;
            if(counter === 3) {
                hiddenMessageColor = "red";
            }else if(counter === 7) {
                hiddenMessage2Color = "orange"
            }
            blockY = canvas.height-blockHeight-jumpDif;
            reset();
        }
    }
}

let interval = setInterval(draw, 10);




