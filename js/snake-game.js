document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('snakeGameModal');
  const openBtn = document.getElementById('snakeGameBtn');
  const closeBtn = document.getElementById('snakeCloseBtn');
  const startBtn = document.getElementById('snakeStartBtn');
  const pauseBtn = document.getElementById('snakePauseBtn');
  const restartBtn = document.getElementById('snakeRestartBtn');
  const scoreEl = document.getElementById('snakeScore');
  const bestScoreEl = document.getElementById('snakeBestScore');
  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');

  const tileSize = 20;
  const tileCount = canvas.width / tileSize;
  const tickIntervalMs = 120;
  const bestScoreKey = 'snakeBestScore';
  let gameTimer = null;
  let snake = [{ x: 9, y: 9 }];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let food = { x: 4, y: 4 };
  let score = 0;
  let bestScore = Number(localStorage.getItem(bestScoreKey)) || 0;
  let gameOver = false;
  let isModalOpen = false;

  bestScoreEl.textContent = String(bestScore);
  updateScore(0);
  draw();

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  startBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', pauseGame);
  restartBtn.addEventListener('click', restartGame);
  document.addEventListener('keydown', handleKeydown);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  function openModal() {
    isModalOpen = true;
    modal.style.display = 'flex';
    draw();
  }

  function closeModal() {
    isModalOpen = false;
    modal.style.display = 'none';
    pauseGame();
  }

  function startGame() {
    if (gameTimer || gameOver) {
      if (gameOver) restartGame();
      return;
    }

    gameTimer = setInterval(tick, tickIntervalMs);
  }

  function pauseGame() {
    if (!gameTimer) return;
    clearInterval(gameTimer);
    gameTimer = null;
  }

  function restartGame() {
    pauseGame();
    snake = [{ x: 9, y: 9 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    placeFood();
    updateScore(0);
    draw();
    startGame();
  }

  function handleKeydown(event) {
    if (!isModalOpen) return;

    const key = event.key.toLowerCase();
    const isArrow = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key);
    const isWasd = ['w', 'a', 's', 'd'].includes(key);

    if (!isArrow && !isWasd) return;
    event.preventDefault();

    if (key === 'arrowup' || key === 'w') setDirection(0, -1);
    if (key === 'arrowdown' || key === 's') setDirection(0, 1);
    if (key === 'arrowleft' || key === 'a') setDirection(-1, 0);
    if (key === 'arrowright' || key === 'd') setDirection(1, 0);

    if (!gameTimer && !gameOver) {
      startGame();
    }
  }

  function setDirection(x, y) {
    if (x === -direction.x && y === -direction.y) return;
    nextDirection = { x, y };
  }

  function tick() {
    direction = { ...nextDirection };
    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    if (isCollision(head)) {
      endGame();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      updateScore(score + 1);
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function isCollision(head) {
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      return true;
    }

    return snake.some((part) => part.x === head.x && part.y === head.y);
  }

  function placeFood() {
    const emptyCells = [];

    for (let y = 0; y < tileCount; y++) {
      for (let x = 0; x < tileCount; x++) {
        const occupied = snake.some((part) => part.x === x && part.y === y);
        if (!occupied) {
          emptyCells.push({ x, y });
        }
      }
    }

    if (emptyCells.length === 0) {
      endGame();
      return;
    }

    food = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  function updateScore(nextScore) {
    score = nextScore;
    scoreEl.textContent = String(score);

    if (score > bestScore) {
      bestScore = score;
      bestScoreEl.textContent = String(bestScore);
      localStorage.setItem(bestScoreKey, String(bestScore));
    }
  }

  function endGame() {
    pauseGame();
    gameOver = true;
    draw();
  }

  function draw() {
    ctx.fillStyle = '#1b1b1b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff5151';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);

    snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? '#6dfc7f' : '#43c55b';
      ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize - 2, tileSize - 2);
    });

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '16px sans-serif';
      ctx.fillText('点击“重新开始”再来一局', canvas.width / 2, canvas.height / 2 + 22);
    }
  }
});
