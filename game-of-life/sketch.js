const startEmpty = false
let grid;
let rows;
let cols;
const resolution = 10;
let canvas;
let paused = false;
let slider;

function setup() {
	const w = floor(windowWidth*.9)
	const h = floor(windowHeight*.9)
	canvas = createCanvas(w, h);
	createDiv("left click to make alive, right click to pause simulation")
	canvas = document.querySelector('#defaultCanvas0')
	canvas.addEventListener('contextmenu', function(e) {
		e.preventDefault()
		paused = !paused
		return false;
	})
	canvas.addEventListener('click', function(e) {
		const rect = e.target.getBoundingClientRect()
		const x = e.pageX - rect.left;
		const y = e.pageY - rect.top;
		const i = floor(x / resolution)
		const j = floor(y / resolution)
		if(grid[i] !== undefined && grid[i][j] !== undefined) {
			grid[i][j] = 1
		}
	})
	canvas.addEventListener('mousemove', function(e) {
		if(e.buttons === 1) {
			const rect = e.target.getBoundingClientRect()
			const x = e.pageX - rect.left;
			const y = e.pageY - rect.top;
			const i = floor(x / resolution)
			const j = floor(y / resolution)
			if(grid[i] !== undefined && grid[i][j] !== undefined) {
				grid[i][j] = 1
			}
		}
	})
	canvas.addEventListener('touchmove', function(e) {
		e.preventDefault()
		const rect = e.target.getBoundingClientRect()
		const x = e.targetTouches[0].pageX - rect.left;
		const y = e.targetTouches[0].pageY - rect.top;
		const i = floor(x / resolution)
		const j = floor(y / resolution)
		if(grid[i] !== undefined && grid[i][j] !== undefined) {
			grid[i][j] = 1
		}
	})
	const button = createButton("clear")
	button.mousePressed(function() {
		grid = grid.map(_ => _.map( _ => 0))
	})
	rows = width / resolution
	cols = height / resolution
	grid = make2DArray(rows, cols)
	slider = createSlider(1, 120, 12, 1)
	frameRate(slider.value())
	slider.mouseReleased(function() {
		frameRate(slider.value())
	})
}

function draw() {
	background(0)
	renderGrid()
	if(!paused) {
		calculateNextGeneration()
	}
}

function countAliveNeighbors(i, j) {
	let total = 0;
	for (let iOff = -1; iOff <= 1; iOff++) {
		for (let jOff = -1; jOff <= 1; jOff++) {
			let i1 = i + iOff
			let j1 = j + jOff
			// if(i1 < 0) i1 = grid.length -1;
			// if(i1 >= grid.length) i1 = 0;
			// if(j1 < 0) j1 = grid.length -1;
			// if(j1 >= grid.length) j1 = 0;
			if((i === i1 && j === j1) || i1 < 0 || j1 < 0 || i1 >= grid.length || j1 >= grid.length) continue;
			const neighbor = grid[i1][j1]
			if(neighbor === 1) {
				total++
			}
		}
	}
	return total;
}

function calculateNextGeneration() {
	grid = grid.map((row, i) => row.map((isAlive, j) => {
		const numNeighboors = countAliveNeighbors(i, j)
		if(isAlive === 1 && (numNeighboors < 2 || numNeighboors > 3)) {
			return 0
		} else if(numNeighboors === 3) {
			return 1
		}
		return isAlive
	}))
}

function renderGrid() {
	grid.map((row, i) => row.map((col, j) => {
		let x = i * resolution
		let y = j * resolution
		if(col === 0) {
			fill(paused ? 240 : 255)
			stroke(255)
			rect(x, y, resolution, resolution)
		}
	}))
}

function make2DArray(rows, cols) {
	const array = []
	for (let i = 0; i < rows; i++) {
		const columns = []
		for (let j = 0; j < cols; j++) {
			columns.push(startEmpty ? 0 : floor(random(2)))
		}
		array.push(columns)
	}
	return array
}


