let block1;
let block2;
let blockImg;
let clack;
let count = 0;
let countDiv;
const timeSteps = 1000;
const digits = 5

function preload() {
	blockImg = loadImage('block.png')
	clack = loadSound('clack.wav')
}

function setup() {
	createCanvas(windowWidth, 200);
	block1 = new Block(100, 20, 1, 0, 0)
	block2 = new Block(200, 150, pow(100, digits - 1), -1 / timeSteps, block1.width)
	countDiv = createDiv(count)
	countDiv.style('font-size', '120px')
	getAudioContext().resume();

}

function draw() {
	background(200);
	let clackSound = false;
	for (let i = 0; i < timeSteps; i++) {
		if(block2.collide(block1)) {
			count += 1
			clackSound = true
		}
		
		if(block1.collideWall()) {
			block1.reverse()
			count += 1
			clackSound = true
		}
		block1.update();
		block2.update();
		countDiv.html(`Collisions: ${count}`)
	}
	if(clackSound) playCollisionSound();
	block2.show();
	block1.show();
}

function playCollisionSound() {
    if(clack.isPlaying()) {
        clack.stop()
    }
    clack.play()
}