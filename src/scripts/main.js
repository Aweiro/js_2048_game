'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const startButton = document.querySelector('.button');

startButton.addEventListener('click', () => {
  if (startButton.matches('.start')) {
    game.start();
  } else {
    game.restart();
  }

  startButton.classList.remove('start');
  startButton.classList.add('restart');
  startButton.textContent = 'Restart';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (e.key === 'ArrowRight') {
    game.moveRight();
  }

  if (e.key === 'ArrowUp') {
    game.moveUp();
  }

  if (e.key === 'ArrowDown') {
    game.moveDown();
  }
});
