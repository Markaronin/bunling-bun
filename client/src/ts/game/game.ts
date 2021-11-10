import { Size } from "@markaronin/jefferson-util";
import { AudioHandler } from "./handlers/audio-handler";
import { ImageHandler } from "./handlers/image-handler";
import { InputHandler } from "./handlers/input-handler";
import { Renderable } from "./renderable";
import { Updatable } from "./updatable";

export class Game {
    private readonly inputHandler = new InputHandler();
    private readonly imageHandler = new ImageHandler();
    private readonly audioHandler = new AudioHandler();

    private readonly objects: (Renderable & Updatable)[] = [];

    constructor(
        private readonly canvasSize: Size,
        private readonly context2d: CanvasRenderingContext2D,
    ) {}

    private update(elapsedTime: number): void {
        this.objects.forEach((object) => object.update(elapsedTime));
    }

    private render(): void {
        this.context2d.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.context2d.fillStyle = 'rgb(200, 200, 200)';
        this.context2d.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.objects.forEach((object) => object.render(this.context2d));
    }

    public async start(): Promise<void> {
        await this.imageHandler.load();
        await this.audioHandler.load();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    private lastTime?: number;
    private loop(timestamp: number): void {
        if (!this.lastTime) {
            this.lastTime = timestamp;
        }
        const elapsedTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.update(elapsedTime);
        this.render();
        window.requestAnimationFrame(this.loop.bind(this));
    }
}