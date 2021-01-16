'use strict';

// Getting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const players = document.querySelectorAll('.player');
const newGame = document.querySelector('.btn--new');

// Setting Initial Values
let currentScore, activePlayer, status, scores;

const init = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add('hide');
  currentScore = 0;
  activePlayer = 0;
  status = true;
  players[activePlayer].classList.add('player--active');
  scores = [0, 0];
  players.forEach(element => {
    if (element.classList.contains('player--winner')) {
      element.classList.remove('player--winner');
    }
  });
};
init();

const alterSocreAndPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  players.forEach(player => {
    player.classList.toggle('player--active');
  });
};

//Adding Events
roll.addEventListener('click', () => {
  if (status) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.setAttribute('src', `dice-${randomNumber}.png`);
    dice.classList.remove('hide');
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else if (randomNumber === 1) alterSocreAndPlayer();
  }
});

hold.addEventListener('click', () => {
  if (!status) return;
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 50) {
    status = false;
    dice.classList.add('hide');
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    players[activePlayer].classList.add('player--winner');
    players[activePlayer].classList.toggle('player--active');
    return;
  }
  alterSocreAndPlayer();
});

newGame.addEventListener('click', init);
