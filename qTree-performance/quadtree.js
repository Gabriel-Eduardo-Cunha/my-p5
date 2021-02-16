
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    moveTo(point, speed=1) {
        this.x += cos(point.x)
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    contains(point) {
        return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h
        );
    }
    getX1() {
        return this.x - this.w
    }
    getX2() {
        return this.x + this.w
    }
    getY1() {
        return this.y - this.h
    }
    getY2() {
        return this.y + this.h
    }
    intersects(rect) {
        return !(
            this.getX2() < rect.getX1() ||
            rect.getX2() < this.getX1() ||
            this.getY2() < rect.getY1() ||
            rect.getY2() < this.getY1()
        )
    }
}
let count = 0
class QuadTree {

    query(range) {
        let points = []
        if (!this.boundary.intersects(range)) {
            return points;
        }
        for (const p of this.points) {
            count++
            if (range.contains(p)) {
                points.push(p)
            }
        }
        if (this.divided) {
            points = points.concat(...this.subQuadTrees.map(subQTree => subQTree.query(range)))
        }
        return points
    }

    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = []
        this.divided = false;
    }

    subdivide() {
        const { x, y, w, h } = this.boundary

        const quadrants = [
            new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2), // North East
            new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2), // North West
            new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), // South East
            new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2), // South West
        ]
        this.subQuadTrees = quadrants.map(boundary => new QuadTree(boundary, this.capacity))
        this.divided = true
    }

    insert(point) {

        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point)
            return true
        } else {
            if (!this.divided) {
                this.subdivide()
            }
            for (const subQTree of this.subQuadTrees) {
                if (subQTree.insert(point)) {
                    return true;
                }
            }
            return false;
        }
    }

    getAllPoints() {
        let points = this.points
        if (this.divided) {
            points = points.concat(...this.subQuadTrees.map(qt => qt.getAllPoints()))
        }
        return points
    }

}