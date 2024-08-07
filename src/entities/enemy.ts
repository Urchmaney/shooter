import { Entity } from "./entity";

export class Enemy implements Entity {
    x: number;
    y: number;
    context: CanvasRenderingContext2D;

    MOVE_BY: number = 10;

    private width: number;
    private height: number;
    moveInterval : number;

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = Math.ceil(this.context.canvas.width / 25);
        this.height = Math.ceil(this.context.canvas.height / 25);

       
        const speed = Math.floor(60000 / this.context.canvas.height);
        this.moveInterval = window.setInterval(() => {
            this.move()
        }, speed);
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
        // console.log(this.rangeX, this.rangeY);
        // console.log(xRange, yRange);
        // console.log("============ ")
        // console.log(
        //     (this.rangeX[0] <= xRange[0] && this.rangeX[1] >= xRange[0]),
        //     (this.rangeX[0] <= xRange[1] && this.rangeX[1] >= xRange[1]),
        //     (this.rangeY[0] <= yRange[0] && this.rangeY[1] >= yRange[0]),
        //     (this.rangeY[0] <= yRange[1] && this.rangeY[1] >= yRange[1])
        // )

        const inXaxis = this.isInxAxis(xRange);
        if (!inXaxis) return inXaxis;

        return (
            ((this.rangeY[0] <= yRange[0] && this.rangeY[1] >= yRange[0]) ||
            (this.rangeY[0] <= yRange[1] && this.rangeY[1] >= yRange[1])))
    }

    isInxAxis(range: [number, number]): boolean {
        return ((this.rangeX[0] <= range[0] && this.rangeX[1] >= range[0]) &&
                (this.rangeX[0] <= range[1] && this.rangeX[1] >= range[1]))
    }
}