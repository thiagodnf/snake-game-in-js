export default class Canvas {

    constructor(id, game) {
        this.game = game;
        this.size = 15;
        this.canvas = document.getElementById(id);
        this.ctx = canvas.getContext("2d");
        this.canvas.height = this.size * game.settings.lines+1;
        this.canvas.width = this.size * game.settings.columns+1;
    }

    drawLine(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x0 + 0.5, y0 + 0.5);
        this.ctx.lineTo(x1 + 0.5, y1 + 0.5);
        this.ctx.stroke();
    }

    drawSquare(x, y, width = 10, height = 10, color = "red") {

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
        this.ctx.stroke();
    }

    drawGrid(lines = 10, columns = 10) {

        let height = lines * this.size;
        let width = columns * this.size;

        for (let i = 0; i < lines + 1; i++) {
            this.drawLine(0, i * this.size, width, i * this.size);
        }

        for (let i = 0; i < columns + 1; i++) {
            this.drawLine(i * this.size, 0, i * this.size, height);
        }
    }

    drawSnake() {

        for (const segment of this.game.snake.segments) {
            this.drawSquare(segment.i * this.size, segment.j * this.size, this.size, this.size, "black");
        }
    }

    drawFood() {

        const { i, j } = this.game.foodPosition;

        this.drawSquare(i * this.size, j * this.size, this.size, this.size, "red");
    }

    animate() {

        const that = this;

        if (this.game.isEndGame) {
            return;
        }

        that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

        that.drawGrid(this.game.settings.lines, this.game.settings.columns);

        that.drawFood(this.game);
        that.drawSnake(this.game);

        requestAnimationFrame(function () {
            that.animate();
        });
    }
}
