let qtree;

function setup() {
	createCanvas(400, 400);
	let boundary = new Rectangle(width/2, height/2, width/2, height/2)
	qtree = new QuadTree(boundary, 4)
	for (let i = 0; i < 2000; i++) {
		const x = randomGaussian(width/2, width /2)
		const y = randomGaussian(height/2, height / 2)
		const p = new Point(x, y)
		qtree.insert(p)
	}
}

function draw() {
	background(0)
	strokeWeight(2)
	showQuadTree(qtree)
	stroke(0, 255, 0)
	rectMode(CENTER)
	let range = new Rectangle(mouseX, mouseY, 25, 25)
	rect(range.x, range.y, range.w*2, range.h*2)
	let points = qtree.query(range)
	strokeWeight(4)
	showPoints(points)
}

function showQuadTree(qt) {
	stroke(255)
	noFill()
	rectMode(CENTER)
	rect(qt.boundary.x, qt.boundary.y, qt.boundary.w*2, qt.boundary.h*2)
	if(qt.divided) {
		qt.subQuadTrees.forEach(showQuadTree)
	}
	showPoints(qt.getAllPoints())
}

function showPoints(points) {
	points.forEach(p => {
		point(p.x, p.y)
	})
}