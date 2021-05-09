const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const row = 24;
const col = 10;
const SQ = 40;
let prevScore = 0;
let currentScore = 0;
let speed = 800;
let level = 1;
let game;
const displayScore = (score) => document.getElementById('score').innerText = `Score ${score}`;
const setLevel = (level) => document.getElementById('level').innerText = `Level ${level}`;
displayScore(currentScore);
setLevel(level);

function startNewGame(){
  prevScore = 0;
  currentScore = 0;
  speed = 800;
  level = 1;
  setLevel(level);
  clearInterval(game);
  newGameCircle();
}

async function newGameCircle () {

  const tetromino = [
    //L type
    [
      [
        [0, 1],
        [1, 1],
        [0, -1]
      ],
      [
        [-1, 1],
        [-1, 0],
        [1, 0]
      ],
      [
        [0, 1],
        [-1, -1],
        [0, -1]
      ],
      [
        [-1, 0],
        [1, 0],
        [1, -1]
      ]

    ],
    // J type
    [
      [
        [-1, 1],
        [0, 1],
        [0, -1]
      ],
      [
        [-1, 0],
        [1, 0],
        [-1, -1]
      ],
      [
        [0, 1],
        [0, -1],
        [1, -1]
      ],
      [
        [1, 1],
        [-1, 0],
        [1, 0]
      ]
    ],
    //I type
    [
      [
        [0, 1],
        [0, -1],
        [0, -2]
      ],
      [
        [-1, 0],
        [1, 0],
        [2, 0]
      ]
    ],
    // O type
    [
      [
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    ],
    // Z type
    [
      [
        [0, 1],
        [1, 0],
        [1, -1]
      ],
      [
        [0, 1],
        [1, 1],
        [-1, 0]
      ],
    ],
    // S type
    [
      [
        [0, 1],
        [-1, 0],
        [-1, -1]
      ],
      [
        [-1, 1],
        [0, 1],
        [1, 0]
      ],
    ],
    // T type
    [
      [
        [0, 1],
        [1, 0],
        [0, -1]
      ],
      [
        [0, 1],
        [-1, 0],
        [1, 0]
      ],
      [
        [0, 1],
        [-1, 0],
        [0, -1]
      ],
      [
        [-1, 0],
        [1, 0],
        [0, -1]
      ]
    ]
  ];

//The game board in array
  let landed = Array.from(Array(24), x => Array.from(Array(10), y => 0));
  let posY = 2;
  let posX = 4;
  let rotatePos = 0;

//Draw a square field
  function drawField (x, y, color) {
    context.fillStyle = color; // Set color for square field
    context.fillRect(x * SQ, y * SQ, SQ, SQ); //Draw a field color

    context.strokeStyle = "#f0f0f0"; // Set field grid color
    context.strokeRect(x * SQ, y * SQ, SQ, SQ); //Draw a field grid
  }

  //Clear the board by coloring it to white color
  function clearBoard () {
    for (let r in landed) {
      for (let c in landed[r]) {
        drawField(c, r, "WHITE");
      }
    }
  }
  await clearBoard();

// Draw the game board
  function drawBoard () {
    for (let r in landed) {
      for (let c in landed[r]) {
        if (landed[r][c] === 0) drawField(c, r, "WHITE");
        else drawField(c, r, "BLUE");
      }
    }
  }
  await drawBoard();

// Select random tetro figure
  function random () {
    let i = Math.floor(Math.random() * tetromino.length);
    return tetromino[i];
  }

  let randomTetro = random();

//Draw tetro figure on board
  function drawTetro (tetro, color) {
    for(let i = 0; i <= 3; i++){
      if(i === 3) drawField(posX, posY, color);
      else drawField(posX + tetro[i][0], posY + tetro[i][1], color);
    }
  }

  drawTetro(randomTetro[0], "BLUE");

// Move right function
  this.right = () => {
    if (
      randomTetro[rotatePos][0][0] + posX === col - 1 ||
      randomTetro[rotatePos][1][0] + posX === col - 1 ||
      randomTetro[rotatePos][2][0] + posX === col - 1 ||
      landed[posY][posX + 1] === 1 ||
      landed[randomTetro[rotatePos][0][1] + posY][randomTetro[rotatePos][0][0] + posX + 1] === 1 ||
      landed[randomTetro[rotatePos][1][1] + posY][randomTetro[rotatePos][1][0] + posX + 1] === 1 ||
      landed[randomTetro[rotatePos][2][1] + posY][randomTetro[rotatePos][2][0] + posX + 1] === 1
    ) {return false}
    else {
      drawTetro(randomTetro[rotatePos], "WHITE");
      posX++;
      drawTetro(randomTetro[rotatePos], "BLUE");
    }
  }

  // Move left function
  this.left = () => {
    if (
      randomTetro[rotatePos][0][0] + posX === 0 ||
      randomTetro[rotatePos][1][0] + posX === 0 ||
      randomTetro[rotatePos][2][0] + posX === 0 ||
      landed[posY][posX - 1] === 1 ||
      landed[randomTetro[rotatePos][0][1] + posY][randomTetro[rotatePos][0][0] + posX - 1] === 1 ||
      landed[randomTetro[rotatePos][1][1] + posY][randomTetro[rotatePos][1][0] + posX - 1] === 1 ||
      landed[randomTetro[rotatePos][2][1] + posY][randomTetro[rotatePos][2][0] + posX - 1] === 1
    ) {}
    else {
      drawTetro(randomTetro[rotatePos], "WHITE");
      posX--;
      drawTetro(randomTetro[rotatePos], "BLUE");
    }
  }

  // Rotate the tetro function
  this.rotate = () => {
    if (randomTetro.length - 1 <= rotatePos) {
      drawTetro(randomTetro[rotatePos], "WHITE");
      rotatePos = 0;
      drawTetro(randomTetro[rotatePos], "BLUE");
    }
    else if (
      posX + 1 > col - 1 || posX + 1 < 0 ||
      randomTetro[rotatePos + 1][0][0] + posX > col - 1 || randomTetro[rotatePos + 1][0][0] + posX < 0 ||
      randomTetro[rotatePos + 1][1][0] + posX > col - 1 || randomTetro[rotatePos + 1][1][0] + posX < 0 ||
      randomTetro[rotatePos + 1][2][0] + posX > col - 1 || randomTetro[rotatePos + 1][2][0] + posX < 0 ||
      landed[posY][posX + 1] === 1 ||
      landed[randomTetro[rotatePos][0][1] + posY][randomTetro[rotatePos][0][0] + posX + 1] === 1 ||
      landed[randomTetro[rotatePos][1][1] + posY][randomTetro[rotatePos][1][0] + posX + 1] === 1 ||
      landed[randomTetro[rotatePos][2][1] + posY][randomTetro[rotatePos][2][0] + posX + 1] === 1
    ) {}
    else {
      drawTetro(randomTetro[rotatePos], "WHITE");
      rotatePos++;
      drawTetro(randomTetro[rotatePos], "BLUE");
    }
  }

  this.fallingTetro = () => {
    if (
      randomTetro[rotatePos][0][1] + posY + 1 === row ||
      randomTetro[rotatePos][1][1] + posY + 1 === row ||
      randomTetro[rotatePos][2][1] + posY + 1 === row ||
      landed[posY + 1][posX] === 1 ||
      landed[randomTetro[rotatePos][0][1] + posY + 1][randomTetro[rotatePos][0][0] + posX] === 1 ||
      landed[randomTetro[rotatePos][1][1] + posY + 1][randomTetro[rotatePos][1][0] + posX] === 1 ||
      landed[randomTetro[rotatePos][2][1] + posY + 1][randomTetro[rotatePos][2][0] + posX] === 1
    ) {
      for(let i = 0; i <= 3; i++){
        if(i === 3) landed[posY][posX] = 1;
        else landed[randomTetro[rotatePos][i][1] + posY][randomTetro[rotatePos][i][0] + posX] = 1;
      }
      for (let r in landed) {
        if (landed[r].reduce((a,b) => a + b) === 10) {
          landed.splice(+r, 1);
          landed.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          prevScore = currentScore;
          currentScore += 10;
          speedUp();
        }
      }
      posY = 2;
      posX = 4;
      rotatePos = 0;
      randomTetro = random();
      drawTetro(randomTetro[0], "BLUE");
    } else {
      drawTetro(randomTetro[rotatePos], "WHITE");
      posY++;
      drawTetro(randomTetro[rotatePos], "BLUE");
    }
    displayScore(currentScore);
  }

  //Move tetro figures by arrow keys
  function moveTetro (e) {
    if (e.keyCode === 40) fallingTetro();
    if (e.keyCode === 39) right();
    if (e.keyCode === 37) left();
    if (e.keyCode === 38) rotate();
  }

  let touochStart = {};
  function tSt(e) {
    touochStart.x = e.touches[0].clientX;
    touochStart.y = e.touches[0].clientY;
  }
  document.addEventListener('touchstart', tSt, false);
  document.addEventListener('touchmove', onMouseUpdate, false);
  document.addEventListener('mousedown', this.rotate, false);

  function onMouseUpdate(e){
    if(e.changedTouches[0].clientX > touochStart.x && Math.trunc(e.changedTouches[0].clientX) / 10 % 2 === 0) right();
    if(e.changedTouches[0].clientX < touochStart.x && Math.trunc(e.changedTouches[0].clientX) / 10 % 2 === 0) left();
    if(e.changedTouches[0].clientY > touochStart.y && Math.trunc(e.changedTouches[0].clientY) / 10 % 2 === 0) fallingTetro();
  }

  document.onkeydown = moveTetro;

  game = setInterval(() => {
    fallingTetro();
    for (let i in landed[4]) {
      if (landed[4][i] === 1) {
        alert('Game Over');
        clearInterval(game);
      }
    }
  }, speed);

  function speedUp() {
    switch (true) {
      case prevScore < 100 && currentScore >= 100:
        clearInterval(game);
        newGameCircle();
        speed = 700;
        level = 2;
        setLevel(level);
        break;
      case prevScore < 200 && currentScore >= 200:
        clearInterval(game);
        speed = 600;
        level = 3;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 300 && currentScore >= 300:
        clearInterval(game);
        speed = 500;
        level = 4;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 400 && currentScore >= 400:
        clearInterval(game);
        speed = 400;
        level = 5;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 500 && currentScore >= 500:
        clearInterval(game);
        speed = 300;
        level = 6;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 600 && currentScore >= 600:
        clearInterval(game);
        speed = 250;
        level = 7;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 700 && currentScore >= 700:
        clearInterval(game);
        speed = 200;
        level = 8;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 800 && currentScore >= 800:
        clearInterval(game);
        speed = 150;
        level = 9;
        setLevel(level);
        newGameCircle();
        break;
      case prevScore < 900 && currentScore >= 900:
        clearInterval(game);
        speed = 100;
        level = 10;
        setLevel(level);
        newGameCircle();
        break;
      default:
        drawBoard();
        break
    }
  }
}
