import './style.css'
import { PlayGround } from './playground.ts';

const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#playground")!;

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

let holdInterval: number | undefined;


leftBtn.addEventListener("mousedown", () => {
  if (holdInterval) clearInterval(holdInterval);
  
  holdInterval = setInterval(() => {

    if (!playGround.ongoing) return;

    playGround?.shooter.moveLeft();
  }, 50); 
});

leftBtn.addEventListener("mouseup", () => {
  clearInterval(holdInterval);
})

leftBtn.addEventListener("touchstart", () => {
  if (holdInterval) clearInterval(holdInterval);

  holdInterval = setInterval(() => {

    if (!playGround.ongoing) return;

    playGround?.shooter.moveLeft();
  }, 50); 
});

leftBtn.addEventListener("touchend", () => {
  clearInterval(holdInterval);
})

rightBtn.addEventListener("mousedown", () => {
  if (holdInterval) clearInterval(holdInterval);

  holdInterval = setInterval(() => {

    if (!playGround.ongoing) return;

    playGround?.shooter.moveRight();
  }, 50); 
});

rightBtn.addEventListener("mouseup", () => {
  clearInterval(holdInterval);
})


rightBtn.addEventListener("touchstart", () => {
  if (holdInterval) clearInterval(holdInterval);

  holdInterval = setInterval(() => {

    if (!playGround.ongoing) return;

    playGround?.shooter.moveRight();
  }, 50); 
})

rightBtn.addEventListener("touchend", () => {
  clearInterval(holdInterval);
});

shootBtn.addEventListener("click", () => {
  if (!playGround.ongoing) return;

  playGround?.addShooterBullet();
})


shootBtn.addEventListener("touchstart", () => {
  if (holdInterval) clearInterval(holdInterval);

  holdInterval = setInterval(() => {
    if (!playGround.ongoing) return;

    playGround?.addShooterBullet();
  }, 50); 
});

shootBtn.addEventListener("touchend", () => {
  clearInterval(holdInterval);
});

shootBtn.addEventListener("mousedown", () => {
  if (holdInterval) clearInterval(holdInterval);

  holdInterval = setInterval(() => {
    console.log("gown  shooti", holdInterval)
    if (!playGround.ongoing) return;

    playGround?.addShooterBullet();
  }, 50); 
});

shootBtn.addEventListener("mouseup", () => {
  clearInterval(holdInterval);
})


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
