import './style.css'
import { PlayGround } from './playground.ts';
import db from "./firebase.ts";
import { collection, doc, getDoc, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';

const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#playground")!;

const highScoreName: HTMLHeadingElement = document.querySelector<HTMLHeadingElement>("#highScoreName")!;

const highScoreValue: HTMLParagraphElement = document.querySelector<HTMLParagraphElement>("#highScoreValue")!;

const startBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#startBtn')!;

const stopBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#stopBtn')!;

const leftBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#left')!;

const rightBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#right')!;

const shootBtn : HTMLButtonElement = document.querySelector<HTMLButtonElement>('#shoot')!;

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

shootBtn.addEventListener("click", () => {
  if (!playGround.ongoing) return;

  playGround?.addShooterBullet();
})

let holdInterval: number | undefined;

const clearHoldInterval = () => {
  clearInterval(holdInterval);
}

const moveRight = () => {
  if (holdInterval) clearHoldInterval();
  setInterval(() => {}, 8)
  holdInterval = window.setInterval(() => {

    if (!playGround.ongoing) return;

    playGround?.shooter.moveRight();
  }, 50); 
}

const moveLeft = () => {
  if (holdInterval) clearHoldInterval();
  
  holdInterval = window.setInterval(() => {

    if (!playGround.ongoing) return;

    playGround?.shooter.moveLeft();
  }, 50); 
}

const shoot = () => {
  if (holdInterval) clearHoldInterval();

  holdInterval = window.setInterval(() => {
    if (!playGround.ongoing) return;

    playGround?.addShooterBullet();
  }, 50); 
}

leftBtn.addEventListener("mousedown", moveLeft);

leftBtn.addEventListener("mouseup", clearHoldInterval);

leftBtn.addEventListener("touchstart", moveLeft);

leftBtn.addEventListener("touchend", clearHoldInterval);

rightBtn.addEventListener("mousedown", moveRight);

rightBtn.addEventListener("mouseup", clearHoldInterval);


rightBtn.addEventListener("touchstart", moveRight)

rightBtn.addEventListener("touchend", clearHoldInterval);


shootBtn.addEventListener("touchstart", shoot);

shootBtn.addEventListener("touchend", clearHoldInterval);

shootBtn.addEventListener("mousedown", shoot);

shootBtn.addEventListener("mouseup", clearHoldInterval);


document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (!playGround.ongoing) return;

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

const q = query(collection(db, "scores"));

await getDocs(q).then(
  (snap: QuerySnapshot) => {
    snap.forEach((val: QueryDocumentSnapshot) => {
      highScoreName.innerHTML = val.data().name;
      highScoreValue.innerHTML = val.data().value
    })
  }
)


