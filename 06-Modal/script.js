'use strict';

const modals = document.querySelectorAll('.show-modal');
const msg = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');

const closeDialouge = () => {
  msg.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openDialouge = () => {
  msg.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

modals.forEach(element => {
  element.addEventListener('click', openDialouge);
});

close.addEventListener('click', closeDialouge);

overlay.addEventListener('click', closeDialouge);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !msg.classList.contains('hidden')) closeDialouge();
});
