let noiseMax = 0;
let slider;
let phase = 0;
let zoff = 0
let zdelta = .01;

function setup() {
	createCanvas(600, 600);
	slider = createSlider(0, 10, 5, .001)
}

function draw() {
	background(0);
	translate(width/2, height/2)
	stroke(255)
	noFill()
	noiseMax = slider.value()
	beginShape()
	for (let a = 0; a < TWO_PI; a+=.001) {
		let xoff = map(cos(a), -1, 1, 0, noiseMax);
		let yoff = map(sin(a), -1, 1, 0, noiseMax);
		const r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200) ;
		let x = r * cos(a)
		let y = r * sin(a)
		vertex(x, y)
	}
	endShape(CLOSE);
	// console.log(zoff);
	zoff += .01
	// phase += .05
	// noLoop();
}