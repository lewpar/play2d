class Play2D {
    constructor(canvasName) {
        this.name = canvasName;
        this.drawItems = [];
    }

    start(fps) {
        console.log("Starting engine..");

        this.fps = fps;
        this.drawTime = 0;

        let container = document.getElementById(this.name);
        if(container === null || container === undefined)
        {
            console.error(`Could not find a container with the id '${this.name}'!`);
            return;
        }

        let canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        container.appendChild(canvas);

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        console.log("Engine started.");
    }

    fillRect(x, y, width, height, color) {
        this.drawItems.push(this.fillRectInternal.bind(this, x, y, width, height, color));
    }

    fillText(x, y, text, fontFamily, fontSize, color) {
        this.drawItems.push(this.fillTextInternal.bind(this, x, y, text, fontFamily, fontSize, color));
    }

    fillRectInternal(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    fillTextInternal(x, y, text, fontFamily, fontSize, color) {
        this.context.fillStyle = color;
        this.context.font = `${fontSize}px ${fontFamily}`;
        this.context.textAlign = "left";
        this.context.fillText(text, x, y + fontSize);
    }

    beginDraw(fillColor) {
        this.startDrawTime = new Date().getTime();
        console.log("Start draw");
        this.context.reset();
        this.fillRectInternal(0, 0, window.innerWidth, window.innerHeight, fillColor);
    }

    endDraw() {
        for(let i = 0; i < this.drawItems.length; i++) {
            let drawItem = this.drawItems[i];
            console.log(`Drawing item ${i}`);
            drawItem();
        }

        this.drawItems = [];

        let currentTime = new Date().getTime();
        this.drawTime = currentTime - this.startDrawTime;
        console.log(currentTime);
        console.log(this.startDrawTime);
        console.log("End draw");
    }

    getFPS() {
        return this.drawTime;
    }

    getRedrawTime() {
        return this.fps;
    }
}