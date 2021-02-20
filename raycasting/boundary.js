class Boundary {
    constructor(a, b) {
        this.a = createVector(...a)
        this.b = createVector(...b)
    }

    show() {
        stroke(255)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
    }
}