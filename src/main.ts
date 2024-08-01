import './style.css'
import { PlayGround } from './playground.ts';

const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#playground")!;

const playGround = new PlayGround(canvas.getContext("2d")!);

playGround.render();

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "ArrowRight") {
    playGround.shooter.moveRight();
  }
  if (e.key === "ArrowLeft") {
    playGround.shooter.moveLeft();
  }

  if (e.key === " ") {
    playGround.addShooterBullet();
  }

  playGround.render();
})
