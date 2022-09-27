document.addEventListener('DOMContentLoaded', () => {
  const width = 10;
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelector('#score');
  const StartBtm = document.querySelector('#start-button');
  let nextRandom = 0;

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPos = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      squares[currentPos + index].classList.add('tetromino');
    });
  }

  draw();

  function undraw() {
    current.forEach((index) => {
      squares[currentPos + index].classList.remove('tetromino');
    });
  }

  function moveDown() {
    undraw();
    currentPos += width;
    draw();
    freeze();
  }

  timerId = setInterval(moveDown, 1000);

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }

  document.addEventListener('keyup', control);

  function freeze() {
    if (current.some((index) => squares[currentPos + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPos + index].classList.add('taken'));
      // start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      //   nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPos = 4;
      draw();
      displayShape();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPos + index) % width === 0);
    if (!isAtLeftEdge) currentPos -= 1;
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      currentPos += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPos + index) % width === width - 1);
    if (!isAtRightEdge) currentPos += 1;
    if (current.some((index) => squares[currentPos + index].classList.contains('taken'))) {
      currentPos -= 1;
    }
    draw();
  }

  function rotate() {
    undraw();
    currentRotation += 1;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;

  // the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
    [0, 1, displayWidth, displayWidth + 1], // oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTetromino
  ];

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  }
});