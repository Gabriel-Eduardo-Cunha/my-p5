let coordTopLeft = [-2, 2]
let coordBottomRight = [2, -2]
let zoom = .05
let iterations = 100

function setup() {
	createCanvas(600, 600);
	pixelDensity(1);
	loadPixels();
}

async function draw() {

	const promises = []
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			promises.push(calculatePixel(x, y))
		}
	}
	await Promise.all(promises)
	updatePixels();
}

function calculatePixel(x, y) {
	return new Promise(resolve => {
		let a = map(x, 0, width, coordTopLeft[0], coordBottomRight[0]);
		let b = map(y, 0, height, coordTopLeft[1], coordBottomRight[1]);
	
		let ca = a;
		let cb = b;
	
		let n = 0;
		while (n < iterations) {
			let aa = a * a - b * b;
			let bb = 2 * a * b;
	
			a = aa + ca;
			b = bb + cb;
	
			if (abs(a + b) > 16) {
				break;
			}
			n++;
		}
	
		let bright = n * (255 / iterations);
	
		let pix = (x + y * width) * 4;
		pixels[pix + 0] = bright;
		pixels[pix + 1] = bright;
		pixels[pix + 2] = bright;
		pixels[pix + 3] = 255;
		resolve()
	})
}

$(function () {
	$(document).on('click', '#defaultCanvas0', function (e) {
		const ratio = abs(coordTopLeft[0] - coordBottomRight[0])
		const [mouseX, mouseY] = [e.clientX, e.clientY]
		let coordX = (mouseX / width) * ratio + coordTopLeft[0]
		let coordY = -((mouseY / height) * ratio - coordTopLeft[1])
		const zoomRatio = ratio * zoom
		coordTopLeft = [coordX - zoomRatio, coordY + zoomRatio]
		coordBottomRight = [coordX + zoomRatio, coordY - zoomRatio]
		draw()
	})
})
