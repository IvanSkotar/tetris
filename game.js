let score = 0;
let speed = 800;
let level = 1;
let game;
document.getElementById('score').value = score;
document.getElementById('level').innerText = `Level ${level}`;

function startNewGame(){
  score = 0;
  speed = 800;
  level = 1;
  document.getElementById('level').innerText = `Level ${level}`;
  clearInterval(game);
  newGameCircle();
}

function newGameCircle () {
  const canvas = document.getElementById('canv');
  const context = canvas.getContext('2d');

  const row = 24;
  const col = 10;
  const SQ = 40;
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
  let landed = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let posY = 2;
  let posX = 4;
  let rotatePos = 0;

//Draw a square field
  function drawField (x, y, color) {
    context.fillStyle = color; // Set color for square field
    context.fillRect(x * SQ, y * SQ, SQ, SQ); //Draw a field color

    context.strokeStyle = "WHITE"; // Set field grid color
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
  clearBoard ();

// Draw the game board
  function drawBoard () {
    for (let r in landed) {
      for (let c in landed[r]) {
        if (landed[r][c] === 0) {
          drawField(c, r, "WHITE");
        } else {
          drawField(c, r, "BLUE");
        }
      }
    }
  }

// Select random tetro figure
  function random () {
    let i = Math.floor(Math.random() * tetromino.length);
    return tetromino[i];
  }

  let randomTetro = random();

//Draw tetro figure on board
  function drawTetro (tetro, color) {
    drawField(posX, posY, color);
    drawField(posX + tetro[0][0], posY + tetro[0][1], color);
    drawField(posX + tetro[1][0], posY + tetro[1][1], color);
    drawField(posX + tetro[2][0], posY + tetro[2][1], color);
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
    ) {}
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
    } else if (
      posX + 1 > col - 1 || posX + 1 < 0 ||
      randomTetro[rotatePos + 1][0][0] + posX > col - 1 || randomTetro[rotatePos + 1][0][0] + posX < 0 ||
      randomTetro[rotatePos + 1][1][0] + posX > col - 1 || randomTetro[rotatePos + 1][1][0] + posX < 0 ||
      randomTetro[rotatePos + 1][2][0] + posX > col - 1 || randomTetro[rotatePos + 1][2][0] + posX < 0 ||
      landed[posY][posX + 1] === 1 ||
      landed[randomTetro[rotatePos][0][1] + posY][randomTetro[rotatePos][0][0] + posX + 1] === 1 ||
      landed[randomTetro[rotatePos][1][1] + posY][randomTetro[rotatePos][1][0] + posX + 1] === 1 ||
      landed[randomTetro[rotatePos][2][1] + posY][randomTetro[rotatePos][2][0] + posX + 1] === 1 ||
      landed[posY][posX - 1] === 1 ||
      landed[randomTetro[rotatePos][0][1] + posY][randomTetro[rotatePos][0][0] + posX - 1] === 1 ||
      landed[randomTetro[rotatePos][1][1] + posY][randomTetro[rotatePos][1][0] + posX - 1] === 1 ||
      landed[randomTetro[rotatePos][2][1] + posY][randomTetro[rotatePos][2][0] + posX - 1] === 1
    ) {} else {
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
      landed[posY][posX] = 1;
      landed[randomTetro[rotatePos][0][1] + posY][randomTetro[rotatePos][0][0] + posX] = 1;
      landed[randomTetro[rotatePos][1][1] + posY][randomTetro[rotatePos][1][0] + posX] = 1;
      landed[randomTetro[rotatePos][2][1] + posY][randomTetro[rotatePos][2][0] + posX] = 1;
      for (let r in landed) {
        if (JSON.stringify(landed[r]) === JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])) {
          landed.splice(r, 1);
          landed.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          score += 10;
          drawBoard();
          speed = speedUp();
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
    document.getElementById('score').value = score;
  }

  //Move tetro figures by arrow keys
  function moveTetro (e) {
    if (e.keyCode === 40) {
      fallingTetro();
    }
    if (e.keyCode === 39) {
      right();
    }
    if (e.keyCode === 37) {
      left();
    }
    if (e.keyCode === 38) {
      rotate();
    }
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
    console.log(speed);
  }, speed);

  function speedUp() {
    switch (score) {
      case 100:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 700;
        level = 2;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 200:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 600;
        level = 3;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 300:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 500;
        level = 4;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 400:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 400;
        level = 5;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 500:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 300;
        level = 6;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 600:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 250;
        level = 7;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 700:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 200;
        level = 8;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 800:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 150;
        level = 9;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
      case 900:
        clearInterval(game);
        clearBoard();
        drawBoard();
        speed = 100;
        level = 10;
        document.getElementById('level').innerText = `Level ${level}`;
        newGameCircle();
        break;
    }
  }
}
