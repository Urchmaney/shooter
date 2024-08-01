import { Entity } from "./entity";

export class Enemy implements Entity {
    x: number;
    y: number;
    context: CanvasRenderingContext2D;

    MOVE_BY: number = 10;

    private width: number = 20;
    private height: number = 20;

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        this.context = context;
        this.x = x;
        this.y = y;
        setInterval(() => {
            this.move()
        }, 100);
    }
    render(): void {
        this.context.beginPath();
        this.context.fillRect(this.x - this.width, this.y - this.height, this.width * 2, this.height * 2);
    }

    move() {
        this.y += this.MOVE_BY;
        // this.render();
    }

    get rangeX(): [number, number] {
        return [this.x - this.width, this.x + this.width];
    }

    get rangeY(): [number, number] {
        return [this.y - this.height, this.y + this.height];
    }
    
    intersect(xRange: [number, number], yRange: [number, number]): boolean {
        console.log(this.rangeX, this.rangeY);
        console.log(xRange, yRange);
        console.log("============ ")
        return ((this.rangeX[0] >= xRange[0] && this.rangeX[1] <= xRange[0]) || (this.rangeX[0] >= xRange[1] && this.rangeX[1] <= xRange[1]))
        && ((this.rangeY[0] >= yRange[0] && this.rangeY[1] <= yRange[0]) || (this.rangeY[0] >= yRange[1] && this.rangeY[1] <= yRange[1]))
    }
}