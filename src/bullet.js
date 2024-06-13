export default class Bullet {
  constructor(x = 0, y = 0, interval = 5, width = 5, height = 10) {
    this.interval = interval;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  move() {
    this.y += this.interval;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  get() {
    const bullet = document.createElement('div');
    bullet.style.width = `${this.width}px`;
    bullet.style.height = `${this.height}px`;
    bullet.style.position = 'absolute';
    bullet.style.bottom = `${this.y}px`;
    bullet.style.left = `${this.x}px`;
    bullet.style.backgroundColor = 'red';
    return bullet;
  }
}
