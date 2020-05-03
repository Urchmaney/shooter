import shooter from '../img/space-shooter.png';

export default class Shooter {
  constructor(boardSize, moveBy = 5, width = 100, height = 100) {
    this.size = boardSize;
    this.moveBy = moveBy;
    this.position = this.size / 2;
    this.width = width;
    this.height = height;
  }

  moveRight() {
    this.position += this.position >= this.size - (this.width / 2) ? 0 : this.moveBy;
  }

  moveLeft() {
    this.position -= this.position <= (this.width / 2) ? 0 : this.moveBy;
  }

  getPosition() {
    return this.position;
  }

  display() {
    const img = document.createElement('img');
    img.src = shooter;
    img.style.position = 'absolute';
    img.style.bottom = 0;
    img.style.left = `${this.position - (this.width / 2)}px`;
    img.height = this.height;
    img.width = this.width;
    const main = document.getElementById('main');
    main.appendChild(img);
  }
}