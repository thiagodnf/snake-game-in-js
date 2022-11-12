export default class RandomUtils {

    /**
     * This JavaScript function always returns a random number between min and max (both included):
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomGridPosition(maxI, maxJ) {
        return {
            i: RandomUtils.getRandomInt(0, maxI),
            j: RandomUtils.getRandomInt(0, maxJ),
        };
    }
}
