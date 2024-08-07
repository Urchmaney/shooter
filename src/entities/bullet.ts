import { Entity } from "./entity";

export class Bullet implements Entity {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;

    private bulletWidth: number;
    private bulletHeight: number;

    moveInterval: number;
    MOVE_BY: number = 5;

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.bulletHeight = Math.ceil(this.context.canvas.height / 100);
        this.bulletWidth = Math.ceil(this.context.canvas.width / 300);
        this.moveInterval = window.setInterval(() => {
            this.move()
        }, Math.ceil(6000 / this.context.canvas.height));
    }

   
    render(): void {
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