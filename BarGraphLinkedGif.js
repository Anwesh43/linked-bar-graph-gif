const nodes = 5, w = 300, h = 600

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

class BGNode {
    constructor(i) {
        this.i = i
        this.state = new State()
    }

    addNeighbor() {
        if (this.i < nodes - 1) {
            this.next = new BGNode(this.i + 1)
            this.next.prev = this
        }
    }

    draw(context) {
        const gap = (w) / nodes
        const hGap = h / 2
        context.save()
        context.translate(this.i * gap, h/2)
        context.fillRect(0, 0, gap, h / 2 * (1 - this.state.scale) * (1 - 2 * (this.i % 2)))
        context.restore()
    }

    update(stopcb) {
        this.state.update(stopcb)
    }

    startUpdating() {
        this.state.startUpdating()
    }

    getNext(dir, cb) {
        var curr = this.next
        if (dir == -1) {
            curr = this.dir
        }
        if (curr) {
            return curr
        }
        cb()
        return this
    }
}
