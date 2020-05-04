import Shooter from './shooter';
import Bullet from './bullet';

const bullets = [];
const shooter = new Shooter(window.innerWidth);
const main = document.getElementById('main');

const displayBoard = () => {
  main.innerHTML = '';
  main.appendChild(shooter.get());
  bullets.forEach(bullet => main.appendChild(bullet.get()));
};

const moveBullets = () => {
  const windowHeight = window.innerHeight;
  bullets.forEach(bullet => {
    bullet.move();
    // possible bug
    if (bullet.getPosition().y > windowHeight) bullets.shift();
  });
  displayBoard();
};

window.addEventListener('load', () => {
  displayBoard();
});

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 39) shooter.moveRight();
  if (e.keyCode === 37) shooter.moveLeft();
  if (e.keyCode === 32) bullets.push(new Bullet(shooter.getPosition(), 110, 20));
});

const interval = setInterval(moveBullets, 100);

setTimeout(() => {
  clearInterval(interval);
}, 20000);
