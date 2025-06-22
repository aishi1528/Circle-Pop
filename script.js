let timeLeft = 30;
let score = 0;
let timerInterval;
let moveInterval;
let circle;

const timerDisplay = document.getElementById('timer');
const game = document.getElementById('game');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');
const finalMsg = document.getElementById('finalMessage');

function createCircle() {
  if (circle && game.contains(circle)) {
    game.removeChild(circle);
  }

  circle = document.createElement('div');
  circle.style.width = '50px';
  circle.style.height = '50px';
  circle.style.background = 'red';
  circle.style.borderRadius = '50%';
  circle.style.position = 'absolute';
  circle.style.cursor = 'pointer';

  circle.style.left = Math.floor(Math.random() * (game.clientWidth - 50)) + 'px';
  circle.style.top = Math.floor(Math.random() * (game.clientHeight - 50)) + 'px';

  circle.onclick = () => {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    createCircle();
  };

  game.appendChild(circle);
}

function startGame() {
  timeLeft = 30;
  score = 0;
  scoreDisplay.textContent = 'Score: 0';
  timerDisplay.textContent = 'Time: 30';
  finalMsg.style.display = 'none';
  startBtn.disabled = true;

  if (circle && game.contains(circle)) {
    game.removeChild(circle);
  }

  createCircle();

  clearInterval(timerInterval);
  clearInterval(moveInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = 'Time: ' + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(moveInterval);

      if (circle && game.contains(circle)) {
        game.removeChild(circle);
      }

      finalMsg.textContent = 'Time is up! Your final score is ' + score;
      finalMsg.style.display = 'block';

      startBtn.disabled = false;
    }
  }, 1000);

  moveInterval = setInterval(createCircle, 2000);
}

startBtn.onclick = () => {
  finalMsg.style.display = 'none';
  startBtn.disabled = true;
  startGame();
};
