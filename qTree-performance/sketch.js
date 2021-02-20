const particles = []
const numParticles = 500
let qTree
let screenBoundary
const mousePullForce = 2

let forceMultiplier = 1

window.addEventListener('contextmenu', function (e) {
	e.preventDefault();
}, false);

function setup() {
	createCanvas(windowWidth, windowHeight);
	screenBoundary = new Rectangle(width / 2, height / 2, width, height)
	for (let i = 0; i < numParticles; i++) {
		particles.push(new Particle(random(width), random(height), random(2, 4), random(1, 4)))
	}
	refreshQtree()
}

function refreshQtree() {
	qTree = new QuadTree(screenBoundary, numParticles / 20)
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
			if (p1 !== p2 && p1.intersects(p2)) {
				p1.setHighlight(true)
				p1.x += random(-8, 8)
				p1.y += random(-8, 8)
			}
		})
	})
	if (mouseIsPressed) {
		let pullForce = mousePullForce * forceMultiplier
		forceMultiplier += .01
		if(mouseButton === RIGHT) pullForce = -pullForce;
		const [x1, y1] = [mouseX, mouseY]
		translate(x1, y1)
		particles.forEach(p => {
			const [x2, y2] = [p.x, p.y]
			const r = distanceBetweenPoints(x1, y1, x2, y2)
			let a = angleBetweenPoints(x1, y1, x2, y2)
			let x = (r) * cos(a) * (r / r ** 2) * pullForce
			let y = (r) * sin(a) * (r / r ** 2) * pullForce
			p.x += x
			p.y += y
		})
	} else {
		forceMultiplier = 1
	}
}

function distanceBetweenPoints(x1, y1, x2, y2) {
	const a = Math.abs(x1 - x2)
	const b = Math.abs(y1 - y2)
	return Math.sqrt((a * a) + (b * b))
}

function angleBetweenPoints(x1, y1, x2, y2) {
	const hip = distanceBetweenPoints(x1, y1, x2, y2)
	const co = Math.abs(y1 - y2)
	const a = Math.asin(co / hip);
	if (x1 < x2) {
		if (y1 < y2) {
			return a + Math.PI
		}
		return Math.PI - a
	}
	if (y1 < y2) {
		return Math.PI * 2 - a
	}
	return a
}


class Particle extends Point {
	constructor(x, y, r = 8, speed = 1) {
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
		const distance = dist(this.x, this.y, particle.x, particle.y)
		return distance < this.r + particle.r
	}

	setHighlight(highlight) {
		if (highlight) this.highlightCount++;
		this.highlight = highlight
	}

	move() {
		this.x += random(-this.speed, this.speed)
		this.y += random(-this.speed, this.speed)
	}

	render() {
		noStroke()
		if (this.highlight) {
			fill(180 + random(this.highlightCount), 0 + random(this.highlightCount), 0 + random(this.highlightCount))
		} else {
			fill(100)
		}
		ellipse(this.x, this.y, this.r * 2)
		this.highlightCount *= .99
	}
}