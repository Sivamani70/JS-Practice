'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const randomGenerator = (min, max) =>
  min + Math.floor(Math.random() * (max - min)) + 1;

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

/**************
 * Smooth Scroll For Section - I
 **************
 */

const burttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

burttonScrollTo.addEventListener('click', e => {
  // Old way of Scroll
  const s1Coords = section1.getBoundingClientRect();

  // without smooth Scrolling Effect
  // window.scrollTo(
  //   s1Coords.left + window.pageXOffset,
  //   s1Coords.top + window.pageYOffset
  // );

  //With Scorlling Effect
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Moderen Way of Scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});
