var grid, gridElem = document.getElementById("grid"),
	score = 0, sum = 0, scoreElem = document.getElementById("score");

function updateGrid() {
	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {
			if(grid[y][x] !== -1) {
				gridElem.getElementsByTagName("div")[(y * 8) + x].innerHTML = grid[y][x];
				gridElem.getElementsByTagName("div")[(y * 8) + x].setAttribute("class", "b" + grid[y][x]);
			} else {
				gridElem.getElementsByTagName("div")[(y * 8) + x].innerHTML = "";
				gridElem.getElementsByTagName("div")[(y * 8) + x].setAttribute("class", "bv");
			}
		}
	}
}

function spawnRand() {
	var possibles = [];

	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {
			if(grid[y][x] === -1) {
				possibles.push([x, y]);
			}
		}
	}

	if(possibles.length) {
		var randomValue = (Math.floor(Math.random() * 9) === 8 ? 4 : 2),
			randomBlock = possibles[(Math.floor(Math.random() * possibles.length))],
			x = randomBlock[0],
			y = randomBlock[1];

		grid[y][x] = randomValue;
	}
}

function moveGrid(direction) {
	var dontTouch = [
		[0,0,0,0,0,0,0,0], 
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0], 
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0], 
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0], 
		[0,0,0,0,0,0,0,0]
	];

	if(direction === 1) {
		for(var y = 7; y >= 0; y--) {
			for(var x = 0; x < 8; x++) {
				if(y != 0 && grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(grid[y - 1][x] === grid[y][x]) {
						addScore(grid[y][x]);
						grid[y][x] = -1;
						grid[y - 1][x] *= 2;
						dontTouch[y-1][x] = 1;
					} else if(grid[y - 1][x] === -1) {
						grid[y - 1][x] = grid[y][x];
						grid[y][x] = -1;
					}
				}
			}
		}
	} else if(direction === 2) {
		for(var x = 0; x < 8; x++) {
			for(var y = 0; y < 8; y++) {
				if(x != 7 && grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(grid[y][x + 1] === grid[y][x]) {
						addScore(grid[y][x]);
						grid[y][x] = -1;
						grid[y][x + 1] *= 2;
						dontTouch[y][x+1] = 1;
					} else if(grid[y][x + 1] === -1) {
						grid[y][x + 1] = grid[y][x];
						grid[y][x] = -1;
					}
				}
			}
		}
	} else if(direction === 3) {
		for(var x = 7; x >= 0; x--) {
			for(var y = 7; y >= 0; y--) {
				if(x != 0 && grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(grid[y][x - 1] === grid[y][x]) {
						addScore(grid[y][x]);
						grid[y][x] = -1;
						grid[y][x - 1] *= 2;
						dontTouch[y][x-1] = 1;
					} else if(grid[y][x - 1] === -1) {
						grid[y][x - 1] = grid[y][x];
						grid[y][x] = -1;
					}
				}
			}
		}
	} else if(direction === 4) {
		for(var y = 0; y < 8; y++) {
			for(var x = 7; x >= 0; x--) {
				if(y != 7 && grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(grid[y + 1][x] === grid[y][x]) {
						addScore(grid[y][x]);
						grid[y][x] = -1;
						grid[y + 1][x] *= 2;
						dontTouch[y+1][x] = 1;
					} else if(grid[y + 1][x] === -1) {
						grid[y + 1][x] = grid[y][x];
						grid[y][x] = -1;
					}
				}
			}
		}
	}

	spawnRand();
	updateGrid();
	getScore();	
}

function calcScore(n) {
	var points;

	if(n === 2) {
		points = 2;
	} else if(n === 4) {
		points = 5;
	} else if(n === 8) {
		points = 10;
	} else if(n === 16) {
		points = 25;
	} else if(n === 32) {
		points = 50;
	} else if(n === 64) {
		points = 125;
	} else if(n === 128) {
		points = 250;
	} else if(n === 256) {
		points = 500;
	} else if(n === 512) {
		points = 1000;
	} else if(n === 1024) {
		points = 2000;
	} else if(n === 2048) {
		points = 4000;
	} else if(n === 4096) {
		points = 8000;
	} else if(n === 8192) {
		points = 16000;
	} else if(n === 16384) {
		points = 32500;
	}

	return points;
}

function addScore(block) {
	score += calcScore(block);
}

function getScore() {
	sum = 0;

	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {
			if(grid[y][x] !== -1) {
				sum += grid[y][x];
			}
		}
	}

	updateScore();
}

function updateScore() {
	document.getElementById("share").href = "https://twitter.com/home?status=Got%20a%20score%20of%20" + (score + sum) + "%20on%20%232048%20saming.fr/p/2048"

	scoreElem.innerHTML = (score + sum) + "pts";
}

function keyPress(code) {
	if(code === 37 || code === 74) {
		moveGrid(3); // left
	} else if(code === 38 || code === 73) { 
		moveGrid(1); // up
	} else if(code === 39 || code === 76) {
		moveGrid(2); // right
	} else if(code === 40 || code === 75) {
		moveGrid(4); // down
	}
}

function initScore() {
	score = 0, sum = 0;

	updateScore();
}

function initGrid() {
	grid = [
		[-1,-1,-1,-1,-1,-1,-1,-1], 
		[-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1], 
		[-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1], 
		[-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1], 
		[-1,-1,-1,-1,-1,-1,-1,-1]
	];

	spawnRand();
	spawnRand();

	updateGrid();
}

function init() {
	initScore();
	initGrid();
}

document.onkeydown = function(e) { keyPress(e.keyCode); }

document.getElementsByTagName("header")[0].getElementsByTagName("a")[0].onclick = init;

gridElem.getElementsByTagName("div")[1].onclick = function() { moveGrid(1); }
gridElem.getElementsByTagName("div")[2].onclick = function() { moveGrid(1); }
gridElem.getElementsByTagName("div")[3].onclick = function() { moveGrid(1); }
gridElem.getElementsByTagName("div")[4].onclick = function() { moveGrid(1); }
gridElem.getElementsByTagName("div")[5].onclick = function() { moveGrid(1); }
gridElem.getElementsByTagName("div")[6].onclick = function() { moveGrid(1); }

gridElem.getElementsByTagName("div")[8].onclick = function() { moveGrid(3); }
gridElem.getElementsByTagName("div")[16].onclick = function() { moveGrid(3); }
gridElem.getElementsByTagName("div")[24].onclick = function() { moveGrid(3); }
gridElem.getElementsByTagName("div")[32].onclick = function() { moveGrid(3); }
gridElem.getElementsByTagName("div")[40].onclick = function() { moveGrid(3); }
gridElem.getElementsByTagName("div")[48].onclick = function() { moveGrid(3); }

gridElem.getElementsByTagName("div")[15].onclick = function() { moveGrid(2); }
gridElem.getElementsByTagName("div")[23].onclick = function() { moveGrid(2); }
gridElem.getElementsByTagName("div")[31].onclick = function() { moveGrid(2); }
gridElem.getElementsByTagName("div")[39].onclick = function() { moveGrid(2); }
gridElem.getElementsByTagName("div")[47].onclick = function() { moveGrid(2); }
gridElem.getElementsByTagName("div")[55].onclick = function() { moveGrid(2); }

gridElem.getElementsByTagName("div")[57].onclick = function() { moveGrid(4); }
gridElem.getElementsByTagName("div")[58].onclick = function() { moveGrid(4); }
gridElem.getElementsByTagName("div")[59].onclick = function() { moveGrid(4); }
gridElem.getElementsByTagName("div")[60].onclick = function() { moveGrid(4); }
gridElem.getElementsByTagName("div")[61].onclick = function() { moveGrid(4); }
gridElem.getElementsByTagName("div")[62].onclick = function() { moveGrid(4); }

initGrid();