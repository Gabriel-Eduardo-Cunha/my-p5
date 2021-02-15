

class Block {

    constructor(x, width, mass, initialVelocity, xConstraint) {
        this.x = x
        this.y = height - width
        this.mass = mass
        this.width = width
        this.speed = initialVelocity
        this.xConstraint = xConstraint
    }

    collide(other) {
        if(!(this.x + this.width < other.x || this.x > other.x + other.width)) {
            const v1 = this.getNewSpeed(other)
            const v2 = other.getNewSpeed(this)
            this.speed = v1
            other.speed = v2
            return true;
        }
        return false;
    }

    getNewSpeed(other) {
        const totalMass = this.mass + other.mass
        return (((this.mass - other.mass) / totalMass) * this.speed) + (other.mass * 2 / totalMass) * other.speed
    }

    reverse() {
        this.speed = abs(this.speed)
    }
    
    collideWall() {
        if(this.x <= 0 && this.speed < 0) {
            return true;
        }
        return false;
    }
    
    update() {
        this.x += this.speed
    }
    
    show() {

        image(blockImg, this.x < this.xConstraint ? this.xConstraint : this.x , this.y, this.width, this.width)
    }
    
}

