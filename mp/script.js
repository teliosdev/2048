var playerData = [
{
	grid: [], gridElem: document.getElementById("g1"),
	score: 0, sum: 0, best: 0,
	scoreElem: document.getElementById("s1"),
	bestElem: document.getElementById("b1")
},{
	grid: [], gridElem: document.getElementById("g2"),
	score: 0, sum: 0, best: 0,
	scoreElem: document.getElementById("s2"),
	bestElem: document.getElementById("b2")
}];

function updateGrid(p) {
	var e;

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++) {
			e = playerData[p].gridElem.getElementsByTagName("div")[(y * 4) + x];

			if(playerData[p].grid[y][x] !== -1) {
				e.innerHTML = playerData[p].grid[y][x];
				e.setAttribute("class", "b" + playerData[p].grid[y][x]);
			} else {
				e.innerHTML = "";
				e.setAttribute("class", "bv");
			}
		}
	}
}

function spawnRand(p) {
	var possibles = [];

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++) {
			if(playerData[p].grid[y][x] === -1) {
				possibles.push([x, y]);
			}
		}
	}

	if(possibles.length) {
		var randomValue = (Math.floor(Math.random() * 9) === 8 ? 4 : 2),
			randomBlock = possibles[(Math.floor(Math.random() * possibles.length))],
			x = randomBlock[0],
			y = randomBlock[1];

		playerData[p].grid[y][x] = randomValue;
	}
}

function moveGrid(p, direction) {
	var dontTouch = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

	if(direction === 1) {
		for(var y = 3; y >= 0; y--) {
			for(var x = 0; x < 4; x++) {
				if(y != 0 && playerData[p].grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(playerData[p].grid[y - 1][x] === playerData[p].grid[y][x]) {
						addScore(p, playerData[p].grid[y][x]);
						playerData[p].grid[y][x] = -1;
						playerData[p].grid[y - 1][x] *= 2;
						dontTouch[y-1][x] = 1;
					} else if(playerData[p].grid[y - 1][x] === -1) {
						playerData[p].grid[y - 1][x] = playerData[p].grid[y][x];
						playerData[p].grid[y][x] = -1;
					}
				}
			}
		}
	} else if(direction === 2) {
		for(var x = 0; x < 4; x++) {
			for(var y = 0; y < 4; y++) {
				if(x != 3 && playerData[p].grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(playerData[p].grid[y][x + 1] === playerData[p].grid[y][x]) {
						addScore(p, playerData[p].grid[y][x]);
						playerData[p].grid[y][x] = -1;
						playerData[p].grid[y][x + 1] *= 2;
						dontTouch[y][x+1] = 1;
					} else if(playerData[p].grid[y][x + 1] === -1) {
						playerData[p].grid[y][x + 1] = playerData[p].grid[y][x];
						playerData[p].grid[y][x] = -1;
					}
				}
			}
		}
	} else if(direction === 3) {
		for(var x = 3; x >= 0; x--) {
			for(var y = 3; y >= 0; y--) {
				if(x != 0 && playerData[p].grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(playerData[p].grid[y][x - 1] === playerData[p].grid[y][x]) {
						addScore(p, playerData[p].grid[y][x]);
						playerData[p].grid[y][x] = -1;
						playerData[p].grid[y][x - 1] *= 2;
						dontTouch[y][x-1] = 1;
					} else if(playerData[p].grid[y][x - 1] === -1) {
						playerData[p].grid[y][x - 1] = playerData[p].grid[y][x];
						playerData[p].grid[y][x] = -1;
					}
				}
			}
		}
	} else if(direction === 4) {
		for(var y = 0; y < 4; y++) {
			for(var x = 3; x >= 0; x--) {
				if(y != 3 && playerData[p].grid[y][x] > 0 && dontTouch[y][x] === 0) {
					if(playerData[p].grid[y + 1][x] === playerData[p].grid[y][x]) {
						addScore(p, playerData[p].grid[y][x]);
						playerData[p].grid[y][x] = -1;
						playerData[p].grid[y + 1][x] *= 2;
						dontTouch[y+1][x] = 1;
					} else if(playerData[p].grid[y + 1][x] === -1) {
						playerData[p].grid[y + 1][x] = playerData[p].grid[y][x];
						playerData[p].grid[y][x] = -1;
					}
				}
			}
		}
	}

	spawnRand(p);
	updateGrid(p);
	getScore(p);	
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

function addScore(p, block) {
	playerData[p].score += calcScore(block);
}

function getScore(p) {
	playerData[p].sum = 0;

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++) {
			if(playerData[p].grid[y][x] !== -1) {
				playerData[p].sum += playerData[p].grid[y][x];
			}
		}
	}

	updateScore(p);
}

function updateScore(p) {
	playerData[p].scoreElem.innerHTML = (playerData[p].score + playerData[p].sum) + "pts";

	updateBest(p);
}

function updateBest(p) {
	var both = playerData[p].score + playerData[p].sum;

	if(both > playerData[p].best) {
		playerData[p].best = both;
		playerData[p].bestElem.innerHTML = "Best Score<br/>" + both + "pts";
	}
}

function keyPress(code) {
	if(code === 74) {
		moveGrid(0, 3); // left
	} else if(code === 73) { 
		moveGrid(0, 1); // up
	} else if(code === 76) {
		moveGrid(0, 2); // right
	} else if(code === 75) {
		moveGrid(0, 4); // down
	}

	else if(code === 37) {
		moveGrid(1, 3); // left
	} else if(code === 38) { 
		moveGrid(1, 1); // up
	} else if(code === 39) {
		moveGrid(1, 2); // right
	} else if(code === 40) {
		moveGrid(1, 4); // down
	}
}

function initScore(p) {
	playerData[p].score = 0;
	playerData[p].sum = 0;

	updateScore(p);
}

function initGrid(p) {
	playerData[p].grid = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];

	spawnRand(p);
	spawnRand(p);

	updateGrid(p);
}

function init(p) {
	initScore(p);
	initGrid(p);
}

function initAll() {
	initGrid(0);
	initGrid(1)
}

document.onkeydown = function(e) { keyPress(e.keyCode); }

document.getElementById("scores").getElementsByTagName("a")[0].onclick = function() { init(0); };
document.getElementById("scores").getElementsByTagName("a")[1].onclick = function() { init(1); };

initAll();