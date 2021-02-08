'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

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

/**
 *
 * Menu Fade-out Animation
 *
 */

const fadeAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const parent = link.closest('.nav');
    const sibilings = parent.querySelectorAll('.nav__link');
    const img = parent.querySelector('img');

    sibilings.forEach(sibiling => {
      if (link !== sibiling) {
        sibiling.style.opacity = img.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', fadeAnimation.bind(0.5));

nav.addEventListener('mouseout', fadeAnimation.bind(1));

/**
 *
 * Sticky Scroll Bar Implementation
 *
 */

// Old Way of creating the sticky nav with scroll But not that much effiecient.

// window.addEventListener('scroll', () => {
//   const initalCordinates = section1.getBoundingClientRect();
//   if (window.scrollY > initalCordinates.top) {
//     document.querySelector('.nav').classList.add('sticky');
//   } else {
//     document.querySelector('.nav').classList.remove('sticky');
//   }
// });

const header = document.querySelector('.header');

const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

headerObserver.observe(header);

/**
 *
 * Revealing Sections
 *
 */

const sections = document.querySelectorAll('.section');

const sectionObserverCallBack = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionObserverCallBack, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/**
 *
 * Lazy Loading Images
 *
 */

const images = document.querySelectorAll('img[data-src]');

const imageObserverCallBack = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(imageObserverCallBack, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

images.forEach(img => imageObserver.observe(img));

/**
 *
 * Sliders
 *
 */

const slider = document.querySelector('.slider');

const sliderImages = document.querySelectorAll('.slide');

const buttonNext = document.querySelector('.slider__btn--right');
const buttonPrevious = document.querySelector('.slider__btn--left');

let currentIndex = 0;
const maxSlides = sliderImages.length;

const goToSlides = () => {
  sliderImages.forEach((img, index) => {
    img.style.transform = `translate(${(index - currentIndex) * 100}%)`;
  });
};

goToSlides();

const nextSlide = () => {
  if (currentIndex === maxSlides - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  goToSlides();
};

const prevSlide = () => {
  if (currentIndex === 0) {
    currentIndex = maxSlides - 1;
  } else {
    currentIndex--;
  }
  goToSlides();
};

buttonNext.addEventListener('click', nextSlide);

buttonPrevious.addEventListener('click', prevSlide);
