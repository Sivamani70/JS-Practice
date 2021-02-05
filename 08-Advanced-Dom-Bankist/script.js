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

/**
 * Smooth Scrolling For Nav Bar Elements
 *
 *
 * */
// **** Not a Good Practice
// document.querySelectorAll('.nav__link').forEach(ele => {
//   ele.addEventListener('click', e => {
//     e.preventDefault();
//     const target = ele.getAttribute('href');
//     document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ****Good Practice

/**
 * 1 . Add Event Listner to the Common Parent element.
 * 2 . Determine the What Element Originated the Event
 */

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const target = e.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  }
});

/**
 *
 *  Tabbed componets
 *
 */

const tabs = document.querySelectorAll('.operations__tab');
const container = document.querySelector('.operations__tab-container');
const contents = document.querySelectorAll('.operations__content ');

container.addEventListener('click', e => {
  const button = e.target.closest('.operations__tab');

  if (!button) return;

  // Hidding Active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  contents.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Adding Active class to button
  button.classList.add('operations__tab--active');

  // Adding Active class to Content Division
  document
    .querySelector(`.operations__content--${button.dataset.tab}`)
    .classList.add('operations__content--active');
});
