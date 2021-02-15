const grid = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
]
for (let iOff = -1; iOff <= 1; iOff++) {
    for (let jOff = -1; jOff <= 1; jOff++) {
        console.log(iOff, jOff);

    }
}

// console.log(countAliveNeighbors(0,1));

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