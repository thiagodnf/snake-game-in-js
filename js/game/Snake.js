import PositionUtils from "../utils/PositionUtils.js";

export default class Snake {

    constructor(segments = []) {
        this.segments = segments;
    }

    getHeadPosition() {
        return this.segments[0];
    }

    getTail() {
        return this.segments[this.segments.length - 1];
    }

    addTail(numberOfSegmentsToAdd = 1) {
        for (let i = 0; i < numberOfSegmentsToAdd; i++) {
            this.segments.push({ ...this.getTail() })
        }
    }

    hasSegmentOn(pos, { ignoreHead = false } = {}) {

        return this.segments.some((segment, i) => {

            if (ignoreHead && i === 0) {
                return false;
            }

            return PositionUtils.equals(pos, segment)
        });
    }

    move(pos) {

        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i].i = this.segments[i - 1].i
            this.segments[i].j = this.segments[i - 1].j
        }

        this.segments[0].i += pos.i;
        this.segments[0].j += pos.j;

        this.lastPos = pos;
    }
}
