let r;
let rVel = -0.1;
let rAcc = -0.001
let a;
let aVel = 0.005;
let aAcc = 0.0001;
// let aAccAcc = -aAcc/2000

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0)
	a = PI/2
	r = height/2
	frameRate(60)
}

function draw() {
	r += rVel
	rVel += rAcc
	r = constrain(r, 0, height)
	translate(width/2, height/2)
	let x = r * cos(a)
	let y = r * sin(a)
	fill(255, 0, 0)
	stroke(255, 0, 0)
	ellipse(x, y, 1, 1)
	ellipse(-x, -y, 1, 1)
	a += aVel
	aVel += aAcc
}