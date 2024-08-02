import { Bullet } from "./entities/bullet";
import { Enemy } from "./entities/enemy";
import { Shooter } from "./entities/shooter";
import { EntityObject } from "./entity-object";

export class PlayGround implements EntityObject{
    bullets: Bullet[];
    enemies: Enemy[];
    shooter: Shooter;
    context: CanvasRenderingContext2D;
    intervalId: number | undefined;
    enemyInterval: number | undefined;
    ongoing: boolean;
    score: number;
    scoreCb: (score: number) => void;
    gameOverCb: () => void;
    constructor(context: CanvasRenderingContext2D, scorecb: (score: number) => void, gameOverCb: () => void) {
        this.context = context;
        this.bullets = [];
        this.enemies = [];
        this.shooter = new Shooter(context);
        this.ongoing = false;
        this.score = 0;
        this.scoreCb = scorecb;
        this.gameOverCb = gameOverCb;
    }

    render() {
        this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);

        this.shooter.render();

        while(this.bullets.length && this.bullets[0].y < 0) {
            const bullet = this.bullets.shift();
            clearInterval(bullet?.moveInterval);
        }
        // for (let i = this.bullets.length - 1; i >= 0; i--) {
        //     if (this.bullets[i].y < 0) this.
        // }
        // this.bullets = this.bullets.filter(bullet => bullet.y > 0);

        for(let bullet of this.bullets) {
            bullet.render();
        }

        while(this.enemies.length && this.enemies[0].y > this.context.canvas.clientHeight ) {
            this.stopGame();
            const enemy = this.enemies.shift();
            clearInterval(enemy?.moveInterval);
        }
        // this.enemies.filter(enemy => enemy.y < this.context.canvas.clientHeight)

        for(let enemy of this.enemies) {
            enemy.render();
        }
        
        this.bulletEnemyCollision();
        // console.log(this.bulletPositionToEnemy, "==="); 
    }

    // bulletEnemyCollision() {
    //     // console.log("check collision");
    //     let bIndex = 0;
    //     while(this.bullets.length && bIndex < this.bullets.length && (bIndex === 0 || this.bulletPositionToEnemy[bIndex] < this.bulletPositionToEnemy[bIndex - 1])) {
    //         let enemyIndex = this.bulletPositionToEnemy[bIndex];
    //         const bullet = this.bullets[bIndex];
    //         let collide = false;
    //         while (!collide && this.enemies[enemyIndex] && bullet.y < this.enemies[enemyIndex].y) {
    //             console.log(`${bIndex} => ${enemyIndex}`)
    //             collide = this.enemies[enemyIndex].intersect(bullet.rangeX, bullet.rangeY);
    //             enemyIndex += 1;
    //         }
            
    //         if (collide) console.log("collide ====================")
    //         this.bulletPositionToEnemy[bIndex] = enemyIndex;
    //         bIndex += 1;
    //     }
    // }

    bulletEnemyCollision() {
        let bIndex = 0;
        let reachedEnemyIndex = this.enemies.length;

        while(this.bullets.length && bIndex < this.bullets.length) {
            let enemyIndex = 0;
            const bullet = this.bullets[bIndex];
            let collide = false;
            while (enemyIndex < reachedEnemyIndex && bullet.rangeY[0] < this.enemies[enemyIndex].rangeY[1]) {
                collide = this.enemies[enemyIndex].intersect(bullet.rangeX, bullet.rangeY);
                if (collide) {
                    break;
                }
                enemyIndex += 1;
            }
            reachedEnemyIndex = enemyIndex;
            if (collide) {
                clearInterval(bullet.moveInterval);
                this.bullets.splice(bIndex, 1);
                clearInterval(this.enemies[enemyIndex].moveInterval);
                this.enemies.splice(enemyIndex, 1);
                this.score += 5;
                this.scoreCb(this.score);
                continue;
            }

            bIndex += 1;
        }
    }

    addShooterBullet() {
        this.bullets.push(new Bullet(this.context, this.shooter.x, this.shooter.y - 60));
    }

    addEnemy() {
        const shouldAdd = Math.floor(Math.random() * 2);
        if (!shouldAdd) return;
        this.enemies.push(new Enemy(this.context, Math.floor(Math.random() * this.context.canvas.clientWidth), 0))
    }

    startGame() {
        this.ongoing = true;
        this.score = 0;
        this.intervalId = setInterval(() => {
            this.render();
        }, 100);

        this.enemyInterval = setInterval(() => {
            this.addEnemy();
        }, 1000);
    }

    stopGame() {
        this.ongoing = false;
        clearInterval(this.intervalId);
        clearInterval(this.enemyInterval);
        this.enemies = [];
        this.bullets = [];
        this.gameOverCb();
    }
}