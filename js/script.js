import Canvas from "./game/Canvas.js";
import Game from "./game/Game.js";
import Move from "./game/Move.js";
import StorageUtils from "./utils/StorageUtils.js";

let game;
let canvas;

$(function () {

    $("#best-score").text(StorageUtils.getBestScore());

    game = new Game();
    canvas = new Canvas("canvas", game);

    game.on("score-updated", function (score) {

        StorageUtils.setBestScore(score);

        $("#your-score").text(score);
        $("#best-score").text(StorageUtils.getBestScore());
    });

    game.on("reset", function () {
        canvas.animate();
    });

    game.on("end-game", function () {
        if (confirm("You lost. Press ok to restart")) {
            game.reset();
        }
    });

    game.reset();

    setInterval(() => {
        if (!game.isEndGame){
            game.move(game.lastDir);
        }
    }, 500);

    $(window).keyup(function (e) {
        switch (e.keyCode) {
            case 37:
                game.lastDir = Move.LEFT;
                // game.move(Move.LEFT);
                break;
            case 38:
                game.lastDir = Move.UP;
                // game.move(Move.UP);
                break;
            case 39:
                game.lastDir = Move.RIGHT;
                // game.move(Move.RIGHT);
                break;
            case 40:
                game.lastDir = Move.DOWN;
                // game.move(Move.DOWN);
                break;
        }
    });
});
