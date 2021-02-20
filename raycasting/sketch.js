let walls;
let ray;
let particle
let xoff = 0
let yoff = 10000

function setup() {
	createCanvas(windowWidth, windowHeight);
	walls = [
		new Boundary([0,0], [width, 0]),
		new Boundary([0,0], [0, height]),
		new Boundary([width,height], [0, height]),
		new Boundary([width,height], [width, 0]),
	];

	for (let i = 0; i < 3; i++) {
		walls.push(new Boundary(
			[random(width), random(height)],
			[random(width), random(height)]
		))

	}
	particle = new Particle(360)
}

function draw() {
	background(0)
	walls.forEach(wall => wall.show())
	particle.move(noise(xoff) * width, noise(yoff) * height)
	particle.show()
	particle.look(walls)
	xoff += .01
	yoff += .01
	 
}