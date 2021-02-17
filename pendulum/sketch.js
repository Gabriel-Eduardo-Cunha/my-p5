const G = .01
const DUMP = .99
let pendulums

function preload() {
	clack = loadSound('clack.wav')
}

function setup() {
	createCanvas(640, 360);
	pendulums = [
		new Pendulum([width * (1.4 / 3), 0], -PI / 4),
		new Pendulum([width * (1.6 / 3), 0], PI / 4),
	]
	const numOfPendulums = 2

}

function draw() {

	background(255)
	pendulums.forEach(pendulumn => {
		pendulumn.update()
		pendulums.forEach(other => {
			if(other === pendulumn) return;
			if(pendulumn.checkCollision(other)) {
				clack.play()
			}
		})
		}
	)

}

class Pendulum {
	constructor(origin, initialAngle = 0, initialAngleVelocity = 0, len = 180, bobSize = 32) {
		const [originX, originY] = origin
		this.origin = new p5.Vector(originX, originY)
		this.bob = new p5.Vector(originX, len)
		this.angle = initialAngle || 0
		this.aVel = initialAngleVelocity || 0
		this.aAcc = 0
		this.bobSize = bobSize
		this.len = len
	}

	update() {
		const [x, y] = this.getXY()
		this.bob.x = x
		this.bob.y = y

		line(this.origin.x, this.origin.y, this.bob.x, this.bob.y)
		ellipse(this.bob.x, this.bob.y, this.bobSize)

		this.aAcc = -G * sin(this.angle)

		this.angle += this.aVel
		this.aVel += this.aAcc
		this.aVel *= DUMP
	}

	getXY(angle=null) {
		return [
			this.origin.x + this.len * sin(angle||this.angle),
			this.origin.y + this.len * cos(angle||this.angle),
		]
	}

	checkCollision(pendulum) {
		const bob1 = createVector(...this.getXY(this.angle + this.aVel))
		const bob2 = createVector(...pendulum.getXY(pendulum.angle + pendulum.aVel))
		if(bob1.dist(bob2) < (this.bobSize + pendulum.bobSize) / 2) {
			if(((this.aVel + this.aAcc) < (pendulum.aVel + pendulum.aAcc) && bob1.x > bob2.x) ||
			((pendulum.aVel + pendulum.aAcc) < (this.aVel + this.aAcc) && bob2.x > bob1.x)) {
				this.aVel = -this.aVel
				pendulum.aVel = -pendulum.aVel
				return true
			}
		}
		return false
	}
}