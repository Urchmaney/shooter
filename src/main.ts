import './style.css'
import { PlayGround } from './playground.ts';

const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#playground")!;

const startBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#startBtn')!;

const stopBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#stopBtn')!;

const score : HTMLHeadingElement = document.querySelector<HTMLHeadingElement>('#score')!;

const context: CanvasRenderingContext2D = canvas.getContext("2d")! 

let playGround: PlayGround | undefined;
const updateScore = (scoreVal: number) => {
  score.innerHTML = `${scoreVal}`
}

const gameOver = () => {
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
}

playGround = new PlayGround(context, updateScore, gameOver);
  

startBtn.addEventListener("click", () => {

  if (playGround.ongoing) return;
  playGround.startGame();
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
})

stopBtn.addEventListener("click", () => {
  if (!playGround.ongoing) return;
  playGround.stopGame();
  gameOver();
})

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "ArrowRight") {
    playGround?.shooter.moveRight();
  }
  if (e.key === "ArrowLeft") {
    playGround?.shooter.moveLeft();
  }

  if (e.key === " ") {
    playGround?.addShooterBullet();
  }
})
