class Particle {
    constructor(numRays) {
        this.pos = createVector(width / 2, height / 2)
        this.rays = []
        for (let a = 0; a < 360; a += 360/max(numRays, 1)) {
            this.rays.push(new Ray(this.pos, radians(a)))
        }
    }

    show() {
        fill(255)
        ellipse(this.pos.x, this.pos.y, 1)
        this.rays.forEach(ray => ray.show())
    }

    move(x, y) {
        this.pos.x = x
        this.pos.y = y
    }

    look(walls) {
        this.rays.forEach(ray => {
            let record = Infinity
            let closest = null
            walls.forEach(wall => {
                const pt = ray.cast(wall)
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt)
                    if(d < record) {
                        record = d
                        closest = pt
                    }
                }
            })
            if(closest) {
                stroke(255, 255, 0, 20)
                line(this.pos.x, this.pos.y, closest.x, closest.y)
            }
        })
    }
}