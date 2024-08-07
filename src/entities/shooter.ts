import { Entity } from "./entity";
import { MOVE_BY_DIVISOR } from "../util"

export class Shooter implements Entity {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    private height: number | undefined;
    private width: number | undefined;

    private MOVE_BY: number | undefined;
    
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = Math.ceil(context.canvas.width / 2);
        this.y = context.canvas.height;
        this.MOVE_BY = Math.ceil(context.canvas.width / MOVE_BY_DIVISOR);
        this.width = Math.ceil(context.canvas.width / 7);
        this.height = Math.ceil(context.canvas.height / 9);
    }

    render(): void {
        this.context.beginPath();
        let y: number;
        y= this.drawBase();
        y = this.drawSecondLayer(y);
        y = this.drawThirdLayer(y);
        this.drawPistol(y);
    }

    drawBase(): number {
        const baseHeight = Math.ceil((this.height || 0) / 3);
        const baseWidth = Math.ceil((this.width || 0) / 3)
        this.context.fillRect(this.x, this.y - baseHeight, baseWidth, baseHeight);
        this.context.fillRect(this.x - baseWidth, this.y - baseHeight, baseWidth, baseHeight);
        return this.y - baseHeight;
    }

    drawSecondLayer(startY: number): number {
        const layerHeight =  Math.ceil((this.height || 0) / 8);
        const layerWidth = Math.ceil((this.width || 0) / 4)
        this.context.fillRect(this.x, startY - layerHeight, layerWidth, layerHeight);
        this.context.fillRect(this.x - layerWidth, startY - layerHeight, layerWidth, layerHeight);
        return startY - layerHeight;
    }

    drawThirdLayer(startY: number): number {
        const layerHeight = Math.ceil((this.height || 0) / 10);
        const layerWidth = Math.ceil((this.width || 0) / 5);
        this.context.fillRect(this.x, startY - layerHeight, layerWidth, layerHeight);
        this.context.fillRect(this.x - layerWidth, startY - layerHeight, layerWidth, layerHeight);
        return startY - layerHeight;
    }

    drawPistol(startY: number): void {
        const layerHeight = Math.ceil((this.height || 0) / 8);
        const layerWidth = Math.ceil((this.width || 0) / 20);
        this.context.fillRect(this.x, startY - layerHeight, layerWidth, layerHeight);
        this.context.fillRect(this.x - layerWidth, startY - layerHeight, layerWidth, layerHeight);
    }

    moveRight(): void {
        if (this.x + (this.MOVE_BY || 0) > this.context.canvas.clientWidth) return;
        this.x += (this.MOVE_BY || 0);
    }

    moveLeft(): void {
        if (this.x - (this.MOVE_BY || 0) < 0) return;
        this.x -= (this.MOVE_BY || 0);
    }
}