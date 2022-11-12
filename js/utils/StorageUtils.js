export default class StorageUtils {

    static setItem(key, value = 0) {
        localStorage.setItem(`snake-${key}`, value);
    }

    static getItem(key, def = 0) {
        return localStorage.getItem(`snake-${key}`) || def;
    }

    static hasItem(key) {
        return localStorage.getItem(`snake-${key}`) !== null;
    }

    static getBestScore() {

        if (!StorageUtils.hasItem("best-score")) {
            StorageUtils.setItem("best-score", 0);
        }

        return StorageUtils.getItem("best-score");
    }
    static setBestScore(score) {

        const bestScore = StorageUtils.getBestScore();

        if (parseInt(score) > parseInt(bestScore)) {
            StorageUtils.setItem("best-score", score);
        }
    }
}
