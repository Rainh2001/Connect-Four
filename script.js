// Variables for HTML elements
var game_div;
var board_div;
var dropArea_div;
var text_span;
var restartText_span;

// Constants for colors
const background = "#3e4e6d";
const blue = "#428cf4";
const red = "#e23d34";
const white = "white";

// Constant 6x7 board
const rows = 6;
const columns = 7;

const setNum = 4;

// Function which returns a boolean if all values in array are equal
const allEqual = arr => arr.every(v => v === arr[0]);

// Game variables
var dropCircle = [];
var circle = [];
var colorCache = [];
var setListeners = true;
var currentPlayer = 1;
var turn = 0;
var gameFinished = false;
var winner;

// Circle class
class Circle {
    constructor(element, circleColor, circleState){
        this.elem = element;
        this.color = white;
        this.state = circleState || false;
    }
}
// When the page has loaded, set element reference to variables
onload = function() {
    game_div = document.getElementById("game");
    board_div = document.getElementById("board");
    dropArea_div = document.getElementById("drop-area");
    text_span = document.getElementById("text");
    restartText_span = document.getElementById("restart-text");
    setup();
}
// Create circles, the drop circle zone, and add event listeners
function setup(){
    let row = [];
    for(let i = 0; i < rows; i++){
        row[i] = document.createElement("div");
        row[i].classList.add("row");
        board_div.appendChild(row[i]);
        for(let j = 0; j < columns; j++){
            circle[j] = document.createElement("div");
            circle[j].classList.add("circle");
            circle[j].setAttribute("id", "circle" + (i*columns + j));
            row[i].appendChild(circle[j]);
        }
    }
    for(let i = 0; i < columns; i++){
        dropCircle[i] = document.createElement("div");
        dropCircle[i].classList.add("circle");
        dropCircle[i].setAttribute("id", "dropCircle" + i);
        dropArea_div.appendChild(dropCircle[i]);
        dropCircle[i].style.backgroundColor = background;
        dropCircle[i].addEventListener('mouseover', function(){
            if(!(gameFinished)){
                if(currentPlayer === 1){
                    dropCircle[i].style.backgroundColor = red;
                } else {
                    dropCircle[i].style.backgroundColor = blue;
                }
            }   
        });
        dropCircle[i].addEventListener('mouseout', function(){
            dropCircle[i].style.backgroundColor = background;
        });
        dropCircle[i].addEventListener('click', function(){
            if(!(gameFinished)){
                playerTurn(dropCircle[i]);
            }
            if(currentPlayer === 1){
                dropCircle[i].style.backgroundColor = red;
            } else {
                dropCircle[i].style.backgroundColor = blue;
            }
        });
    }
    circle = new Array(rows);
    for(let i = 0; i < rows; i++){
        circle[i] = new Array(columns);
        for(let j = 0; j < columns; j++){
            circle[i][j] = new Circle(document.getElementById("circle" + ((rows*columns - columns) - columns*i + j)));
            circle[i][j].color = background;
            circle[i][j].state = false;
        }
    }
    restartText_span.addEventListener('click', function(){
        restart();
    });
}
// When a token is dropped into the board, run this code:
function playerTurn(dropCircle){
    let j = dropCircle.getAttribute("id").replace("dropCircle", "");
    let emptyColumn = true;
    let circleChange = false;
    let newI = null;    
    if(!(circle[rows-1][j].state)){
        for(let i = rows-2; i > -1; i--){
            if(circle[i][j].state){
                newI = i + 1;
                emptyColumn = false;
                circleChange = true;
                break;
            }
        }
        if(emptyColumn){
            newI = 0;
            circleChange = true;
        }
    }
    if(circleChange){
        if(currentPlayer === 1){
            circle[newI][j].color = red;
            circle[newI][j].state = true;
            text_span.innerHTML = "Blue's Move!";
            text_span.style.color = blue;
            currentPlayer = 2;
        }else{
            circle[newI][j].color = blue;
            circle[newI][j].state = true;
            text_span.innerHTML = "Red's Move!";
            text_span.style.color = red;
            currentPlayer = 1;
        }
        if(newI == rows-1){
            circle[newI][j].elem.style.backgroundColor = circle[newI][j].color;
        }else{
            let i = rows-1;
            let start = true;
            let circleFall = setInterval(function(){    
                if(start){
                    circle[i][j].elem.style.backgroundColor = circle[newI][j].color;
                    start = false;
                }else{
                    circle[i+1][j].elem.style.backgroundColor = white;
                    circle[i][j].elem.style.backgroundColor = circle[newI][j].color;
                    if(i == newI){
                        clearInterval(circleFall);
                    }
                }
                i--; 
            }, 60);
        }
        turn++;
    }
    if(turn >= 2*setNum - 1){
        if(checkForWin()){
            gameFinished = true;
            if(winner === red){
                text_span.innerHTML = "Red Wins!";
                text_span.style.color = red;
            }else{
                text_span.innerHTML = "Blue Wins!";
                text_span.style.color = blue;
            }
            restartText_span. style.visibility = "visible";
        }
    }
    if(turn == (rows*columns)){
        restartText_span. style.visibility = "visible";
    }
}
function cacheColors(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            colorCache[i*columns + j] = circle[i][j].color;
        }
    }
}
function checkForWin(){
    cacheColors();
    let set = [];
    // Check for vertical alignment
    for(let i = 0; i < rows-3; i++){
        for(let j = 0; j < columns; j++){
            for(let x = 0; x < setNum; x++){
                set[x] = colorCache[columns*i + j + columns*x];
            }
            if(set[0] != white && set[0] != background){
                if(allEqual(set)){
                    winner = set[0];
                    return true;
                }
            }
        }
        // Check for positive diagonal alignment
        for(let j = 0; j < columns-3; j++){
            for(let x = 0; x < setNum; x++){
                set[x] = colorCache[columns*i + j + (columns + 1)*x];
            }
            if(set[0] != white && set[0] != background){
                if(allEqual(set)){
                    winner = set[0];
                    return true;
                }
            }
            // Check for negative diagonal alignment
            for(let x = 0; x < setNum; x++){
                set[x] = colorCache[columns*i + j + (columns - 1)*x + 3];
            }
            if(set[0] != white && set[0] != background){
                if(allEqual(set)){
                    winner = set[0];
                    return true;
                }
            }
        }
    }
    // Check for horizontal alignment
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns-3; j++){
            for(let x = 0; x < setNum; x++){
                set[x] = colorCache[i + columns*j + x];
            }
            if(set[0] != white && set[0] != background){
                if(allEqual(set)){
                    winner = set[0];
                    return true;
                }
            }
        }
    }
    return false;
}
// Reset the board, reset the game text, and reset game variables
function restart(){
    restartText_span.style.visibility = "hidden";
    text_span.innerHTML = "Red's Move!";
    text_span.style.color = red;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            circle[i][j].elem.style.backgroundColor = white;
            circle[i][j].state = false;
            circle[i][j].color = white;
        }
    }
    gameFinished = false;
    currentPlayer = 1;
    winner = null;
    turn = 0;
}
