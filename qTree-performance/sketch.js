const particles = []
const numParticles = 1000
let qTree
let screenBoundary

function setup() {
	createCanvas(windowWidth, windowHeight);
	screenBoundary = new Rectangle(width/2, height/2, width, height)
	for (let i = 0; i < numParticles; i++) {
		particles.push(new Particle(random(width), random(height), random(2, 4), random(1, 4)))
	}
	refreshQtree()
}

function refreshQtree() {
	qTree = new QuadTree(screenBoundary, 4)
	particles.forEach(particle => {
		qTree.insert(particle)
	})
}

function draw() {
	background(0)
	particles.forEach(p => {
		p.move()
		p.render()
		p.setHighlight(false)
	})
	refreshQtree()
	
	particles.forEach(p1 => {
		let particleBoundary = new Rectangle(p1.x, p1.y, 10, 10)
		let nearParticles = qTree.query(particleBoundary)
		nearParticles.forEach(p2 => {
			if(p1 !== p2 && p1.intersects(p2)) {
				p1.setHighlight(true)
			}
		})
	})
	if(mouseIsPressed) {
		let particleBoundary = new Rectangle(mouseX, mouseY, 25, 25)
		let nearParticles = qTree.query(particleBoundary)
		let mousePoint = new Point(mouseX, mouseY)
		nearParticles.forEach(p => p.moveTo(mousePoint, 4))
	}
}


class Particle extends Point {
	constructor(x, y, r=8, speed=1) {
		super(x, y)
		this.r = r
		this.speed = speed
		this.highlight = false
		this.highlightCount = 0
	}

	getPoints() {
		return [new Point(this.x, this.y)]
	}

	intersects(particle) {
		const distance = dist(this.x, this.y,particle.x, particle.y)
		return distance < this.r + particle.r
	}

	setHighlight(highlight) {
		if(highlight) this.highlightCount++;
		this.highlight = highlight
	}

	move() {
		this.x += random(-this.speed, this.speed)
		this.y += random(-this.speed, this.speed)
	}

	render() {
		noStroke()
		if(this.highlight) {
			fill(180 + random(this.highlightCount), 0 + random(this.highlightCount), 0 + random(this.highlightCount))
		} else {
			fill(100)
		}
		ellipse(this.x, this.y, this.r * 2)
	}
}