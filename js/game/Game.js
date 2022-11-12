import Snake from "./Snake.js";
import Move from "./Move.js";
import RandomUtils from "../utils/RandomUtils.js";
import PositionUtils from "../utils/PositionUtils.js";

export default class Game {

    constructor() {

        this.settings = {
            lines: 15,
            columns: 15,
            segmentsAdded: 1
        }

        this.sound = {
            "low": new Howl({src: ['music/low.mp3'], html5: true}),
            "high": new Howl({src: ['music/high.mp3'], html5: true}),
            "die": new Howl({src: ['music/die.mp3'], html5: true})
        }

        this.eventEmitter = new EventEmitter3();

        this.reset();
    }

    reset() {

        this.score = 0;
        this.lastDir = Move.DOWN;
        this.snake = new Snake([{ i: 0, j: 2 }, { i: 0, j: 1 }, { i: 0, j: 0 }]);
        this.foodPosition = this.getRandomFoodPosition();
        this.isEndGame = false;

        this.eventEmitter.emit('reset', this);
        this.eventEmitter.emit('score-updated', this.score);
    }

    getRandomGridPosition() {
        return RandomUtils.getRandomGridPosition(this.settings.columns - 1, this.settings.lines - 1);
    }

    getRandomFoodPosition() {

        let pos = this.getRandomGridPosition();

        while (this.snake.hasSegmentOn(pos)) {
            pos = this.getRandomGridPosition();
        }

        return pos;
    }

    move(dir = Move.DOWN) {

        this.lastDir = dir;

        if (dir == Move.UP) {
            this.snake.move({ i: 0, j: -1 });
        } else if (dir == Move.DOWN) {
            this.snake.move({ i: 0, j: 1 });
        } else if (dir == Move.LEFT) {
            this.snake.move({ i: -1, j: 0 })
        } else if (dir == Move.RIGHT) {
            this.snake.move({ i: 1, j: 0 });
        }

        if (PositionUtils.equals(this.snake.getHeadPosition(), this.foodPosition)) {
            this.score++;
            this.snake.addTail(this.settings.segmentsAdded);
            this.foodPosition = this.getRandomFoodPosition();
            this.sound.low.play();
            this.eventEmitter.emit('score-updated', this.score);
        }

        if (this.isSnakeEncounteredItsSegments() || this.isSnakeOutsideOfGrid()) {
            this.isEndGame = true;
        }

        if (this.isEndGame) {
            this.sound.die.play();
            this.eventEmitter.emit('end-game', this);
        }
    }

    isSnakeEncounteredItsSegments() {
        return this.snake.hasSegmentOn(this.snake.getHeadPosition(), { ignoreHead: true });
    }

    isSnakeOutsideOfGrid() {

        const head = this.snake.getHeadPosition();

        if (head.i < 0 || head.i === this.settings.columns) {
            return true;
        }

        if (head.j < 0 || head.j === this.settings.lines) {
            return true;
        }

        return false;
    }

    on(event, callback) {
        this.eventEmitter.on(event, callback, this);
    }
}
