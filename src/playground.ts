import { Bullet } from "./entities/bullet";
import { Enemy } from "./entities/enemy";
import { Shooter } from "./entities/shooter";
import { EntityObject } from "./entity-object";

export class PlayGround implements EntityObject{
    bullets: Bullet[];
    enemies: Enemy[];
    shooter: Shooter;
    context: CanvasRenderingContext2D;
    intervalId: number;
    enemyInterval: number;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.bullets = [];
        this.enemies = [];
        this.shooter = new Shooter(context);
        this.intervalId = setInterval(() => {
            this.render();
        }, 100  );

        this.enemyInterval = setInterval(() => {
            this.addEnemy();
        }, 900000000);
    }

    render() {
        this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        this.bullets = this.bullets.filter(bullet => bullet.y > 0);

        for(let bullet of this.bullets) {
            bullet.render();
        }
 
        this.shooter.render();


        this.enemies.filter(enemy => {
            return enemy.y < this.context.canvas.clientHeight && !this.bullets.some((bullet) => {
                return enemy.intersect(bullet.rangeX, bullet.rangeY)
            });
        })

        this.addEnemy();



        for(let enemy of this.enemies) {
            enemy.render();
        }
  

    }

    moveBullets() {
        this.bullets.forEach(x=> x.y - x.MOVE_BY)
    }

    addShooterBullet() {
        this.bullets.push(new Bullet(this.context, this.shooter.x, this.shooter.y - 60));
    }

    addEnemy() {
        const shouldAdd = Math.floor(Math.random() * 2);
        if (!shouldAdd) return;
        this.enemies.push(new Enemy(this.context, Math.floor(Math.random() * this.context.canvas.clientWidth), 0))
    }
}