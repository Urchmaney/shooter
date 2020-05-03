import Shooter from './shooter';

const shooter = new Shooter(window.innerWidth);
const main = document.getElementById('main');

window.addEventListener('load', (e) => {
  shooter.display();
  const mainContent = document.getElementById('main');
  mainContent.append('Welcome to webpack');
});

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 39) shooter.moveRight();
  if (e.keyCode === 37) shooter.moveLeft();
  main.innerHTML = '';
  shooter.display();
});
