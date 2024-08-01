import { Bullet } from "./entities/bullet";
import { Shooter } from "./entities/shooter";
import { EntityObject } from "./entity-object";

export class PlayGround implements EntityObject{
    bullets: Bullet[];
    shooter: Shooter;
    context: CanvasRenderingContext2D;
    intervalId: number;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.bullets = [];
        this.shooter = new Shooter(context);
        this.intervalId = setInterval(() => {
            this.render();
        }, 5);
    }

    render() {
        this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        this.bullets = this.bullets.filter(bullet => bullet.y > 0);

        for(let bullet of this.bullets) {
            bullet.move();
        }
 
        this.shooter.render();

        console.log(this.bullets.length);

    }

    moveBullets() {
        this.bullets.forEach(x=> x.y - x.MOVE_BY)
    }

    addShooterBullet() {
        this.bullets.push(new Bullet(this.context, this.shooter.x, this.shooter.y - 60));
    }
}