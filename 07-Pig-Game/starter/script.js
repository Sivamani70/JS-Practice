'use strict';

// Getting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

// Setting Initial Values
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hide');
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

//Adding Events
roll.addEventListener('click', () => {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(randomNumber);
  dice.setAttribute('src', `dice-${randomNumber}.png`);
  dice.classList.remove('hide');
  if (randomNumber !== 1) {
    currentScore += randomNumber;
    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = currentScore;
  } else if (randomNumber === 1) {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
  }
});

hold.addEventListener('click', () => {});
