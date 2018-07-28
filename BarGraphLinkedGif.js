const nodes = 5

class State {
    constructor() {
        this.scale = 0
        this.deg = 0
        this.dir = 0
        this.prevDeg = 0
    }

    update(cb) {
        this.deg += Math.PI/20
        this.scale = Math.sin(this.deg)
        if (Math.abs(this.deg - this.prevDeg) > Math.PI/2) {
            this.deg = this.prevDeg + this.dir * Math.PI/2
            this.scale = Math.sin(this.deg)
            this.prevDeg = this.deg
            this.dir = 0
            cb()
        }
    }

    startUpdating() {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
        }
    }
}
