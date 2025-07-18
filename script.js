const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const grid = 20, cols = canvas.width / grid, rows = canvas.height / grid;

let snake = [{ x: 5, y: 5 }];
let dir = { x: 1, y: 0 }, nextDir = { x: 1, y: 0 };
let food = getRandomFood();
let score = 0;

function getRandomFood() {
  return { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
}

function update() {
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  if (
    head.x < 0 || head.x >= cols ||
    head.y < 0 || head.y >= rows ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    alert(`Game Over! Score: ${score}`);
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = getRandomFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * grid, food.y * grid, grid, grid);

  snake.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? 'lime' : 'green';
    ctx.fillRect(seg.x * grid, seg.y * grid, grid - 1, grid - 1);
  });
}

function gameLoop() {
  update();
  draw();
}

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  dir = nextDir = { x: 1, y: 0 };
  food = getRandomFood();
  score = 0;
}

function changeDirInput(input) {
  const { x, y } = dir;
  if (input === 'up' && y === 0) nextDir = { x: 0, y: -1 };
  if (input === 'down' && y === 0) nextDir = { x: 0, y: 1 };
  if (input === 'left' && x === 0) nextDir = { x: -1, y: 0 };
  if (input === 'right' && x === 0) nextDir = { x: 1, y: 0 };
}

document.addEventListener('keydown', e => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    e.preventDefault();
    changeDirInput(e.key.replace('Arrow', '').toLowerCase());
  }
});

['up','down','left','right'].forEach(dirKey => {
  const btn = document.getElementById(dirKey);
  btn.addEventListener('mousedown', () => changeDirInput(dirKey));
  btn.addEventListener('touchstart', e => {
    e.preventDefault();
    changeDirInput(dirKey);
  });
});

setInterval(gameLoop, 200);
draw();
