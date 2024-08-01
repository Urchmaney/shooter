import { Entity } from "./entity";

export class Shooter implements Entity {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    // private height: number = 50;
    // private width: number = 50

    private MOVE_BY: number = 10;
    
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = 300;
        this.y = 600;
    }

    render(): void {
        // const playgroundHeight = this.context.canvas.clientHeight;
        // const playgroundWidth = this.context.canvas.clientWidth;
        this.context.beginPath();
        this.drawBase();
        this.drawSecondLayer();
        this.drawThirdLayer();
        this.drawPistol();
    }

    drawBase(): void {
        this.context.fillRect(this.x, this.y - 20, 25, 20);
        this.context.fillRect(this.x -25, this.y - 20, 25, 20);
    }

    drawSecondLayer(): void {
        this.context.fillRect(this.x, this.y - 30, 20, 10);
        this.context.fillRect(this.x - 20, this.y - 30, 20, 10);
    }

    drawThirdLayer(): void {
        this.context.fillRect(this.x, this.y - 40, 8, 10);
        this.context.fillRect(this.x - 8, this.y - 40, 8, 10);
    }

    drawPistol(): void {
        this.context.fillRect(this.x, this.y - 50, 3, 10);
        this.context.fillRect(this.x - 3, this.y - 50, 3, 10);
    }

    moveRight(): void {
        if (this.x + this.MOVE_BY > this.context.canvas.clientWidth) return;
        this.x += this.MOVE_BY;
    }

    moveLeft(): void {
        if (this.x - this.MOVE_BY < 0) return;
        this.x -= this.MOVE_BY;
    }
}