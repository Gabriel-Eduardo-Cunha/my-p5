const ocillators = []

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 100; i++) {
		ocillators.push(new Ocillator())
	}
}

function draw() {
	
	background(255)
	translate(width / 2, height / 2)

	ocillators.forEach(ocillator => ocillator.move())
}

class Ocillator {

	constructor() {
		this.amplitudeX = random(width*.45/6, width*.45)
		this.periodX = random(150, 300);
		this.amplitudeY = random(height*.45/6, height*.45)
		this.periodY = random(150, 300);
	}

	move() {
		let x = this.amplitudeX * sin((frameCount / this.periodX) * TWO_PI)
		let y = this.amplitudeY * sin((frameCount / this.periodY) * TWO_PI)
		fill(255, 0, 0)
		stroke(150)

		line(0, 0, x, y)
		ellipse(x, y, 18)
		
	}

}


