import { Entity } from "./entity";

export class Bullet implements Entity {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;

    private bulletWidth: number = 2;
    private bulletHeight: number = 5;

    MOVE_BY: number = 5;

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        this.context = context;
        this.x = x;
        this.y = y;
        setInterval(() => {
            this.move()
        }, 10);
    }
   
    render(): void {
        // this.context.clearRect(
        //     this.x - this.bulletWidth,
        //     this.y + this.MOVE_BY - this.bulletHeight,
        //     this.bulletWidth * 2,
        //     this.bulletHeight * 2
        // )
        this.context.beginPath();
        this.context.fillRect(this.x, this.y, this.bulletWidth, this.bulletHeight);
        this.context.fillRect(this.x, this.y - this.bulletHeight, this.bulletWidth, this.bulletHeight);
        this.context.fillRect(this.x - this.bulletWidth, this.y, this.bulletWidth, this.bulletHeight);
        this.context.fillRect(this.x - this.bulletWidth, this.y - this.bulletHeight, this.bulletWidth, this.bulletHeight);
    }

    move(): void {
        this.y -= this.MOVE_BY;
    }

    get rangeX(): [number, number] {
        return [this.x - this.bulletWidth, this.x + this.bulletWidth];
    }

    get rangeY(): [number, number] {
        return [this.y - this.bulletHeight, this.y + this.bulletHeight];
    }
}