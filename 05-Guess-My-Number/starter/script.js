'use strict';

const numberFiled = document.querySelector('.guess');
const check = document.querySelector('.check');
const message = document.querySelector('.message');
const result = document.querySelector('.number');
const score = document.querySelector('.score');
const again = document.querySelector('.again');
let secretNumber = Math.trunc(Math.random() * 20 + 1);

let currentScore = 20;
let highScore = 0;

check.addEventListener('click', e => {
  if (currentScore < 1) {
    message.textContent = '🔥 You lost the Game';
    return;
  }

  const value = Number(numberFiled.value);

  if (!!!value) {
    message.textContent = '⛔ No Value Entered';
  } else if (value === secretNumber) {
    updateMessage('🎉 Correct Number');
    document.body.style.background = '#60b347';
    result.textContent = secretNumber;
    result.style.width = '30rem';
    updateScore(++currentScore);
    if (highScore < currentScore) {
      highScore = currentScore;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (value > secretNumber) {
    updateMessage('📈 Number is Too high');
    updateScore(--currentScore);
  } else if (value < secretNumber) {
    updateMessage('📉 Number is Too Low');
    updateScore(--currentScore);
  }
});

again.addEventListener('click', e => {
  currentScore = 20;
  updateScore(currentScore);
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.body.style.background = '#222';
  result.textContent = '?';
  result.style.width = '15rem';
  numberFiled.value = '';
  message.textContent = 'Start guessing...';
});

const updateScore = s => (score.textContent = currentScore);
const updateMessage = msg => (message.textContent = msg);
