import { Bullet } from "./entities/bullet";
import { Enemy } from "./entities/enemy";
import { Shooter } from "./entities/shooter";
import { EntityObject } from "./entity-object";

export class PlayGround implements EntityObject{
    bullets: Bullet[];
    enemies: Enemy[];
    bulletPositionToEnemy: number[];
    shooter: Shooter;
    context: CanvasRenderingContext2D;
    intervalId: number;
    enemyInterval: number;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.bullets = [];
        this.enemies = [];
        this.bulletPositionToEnemy = [];
        this.shooter = new Shooter(context);
        this.intervalId = setInterval(() => {
            this.render();
        }, 100);

        this.enemyInterval = setInterval(() => {
            this.addEnemy();
        }, 1000);
    }

    render() {
        this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);

        this.shooter.render();

        while(this.bullets.length && this.bullets[0].y < 0) {
            this.bullets.shift();
            this.bulletPositionToEnemy.shift();
        }
        // for (let i = this.bullets.length - 1; i >= 0; i--) {
        //     if (this.bullets[i].y < 0) this.
        // }
        // this.bullets = this.bullets.filter(bullet => bullet.y > 0);

        for(let bullet of this.bullets) {
            bullet.render();
        }

        while(this.enemies.length && this.enemies[0].y > this.context.canvas.clientHeight ) {
            this.enemies.shift();
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
        // console.log("check collision");
        let bIndex = 0;
        let reachedEnemyIndex = this.enemies.length;

        while(this.bullets.length && bIndex < this.bullets.length) {
            let enemyIndex = 0;
            const bullet = this.bullets[bIndex];
            let collide = false;
            while (enemyIndex < reachedEnemyIndex && bullet.y < this.enemies[enemyIndex].y) {
                // console.log(`${bIndex} => ${enemyIndex}`)
                collide = this.enemies[enemyIndex].intersect(bullet.rangeX, bullet.rangeY);
                if (collide) break;
                enemyIndex += 1;
            }
            reachedEnemyIndex = enemyIndex;
            if (collide) {
                // console.log(`collide == bullet ${bIndex}   with enemy ${enemyIndex}`);
                this.bullets.splice(bIndex, 1);
                this.enemies.splice(enemyIndex, 1);
                continue;
            }

            bIndex += 1;
        }
    }

    addShooterBullet() {
        this.bullets.push(new Bullet(this.context, this.shooter.x, this.shooter.y - 60));
        this.bulletPositionToEnemy.push(0);
    }

    addEnemy() {
        const shouldAdd = Math.floor(Math.random() * 2);
        if (!shouldAdd) return;
        this.enemies.push(new Enemy(this.context, Math.floor(Math.random() * this.context.canvas.clientWidth), 0))
    }
}