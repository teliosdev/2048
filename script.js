var grid, gridElem = document.getElementById("grid");

var touchElem = document.getElementById("touch");

var score = 0, sum = 0, scoreElem = document.getElementById("score");

var level = 0, levelElem = document.getElementById("level"),
	levelText = levelElem.getElementsByTagName("p")[0],
	levelBar = levelElem.getElementsByTagName("div")[0].getElementsByTagName("div")[0];

var shareElem = document.getElementById("share");

function updateGrid() {
	var e;

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++) {
			e = gridElem.getElementsByTagName("div")[(y * 4) + x];

			if(grid[y][x] !== -1) {
				e.innerHTML = grid[y][x];
				e.setAttribute("class", "b" + grid[y][x]);
			} else {
				e.innerHTML = "";
				e.setAttribute("class", "bv");
			}
		}
	}
}

function spawnRand() {
	var possibles = [];

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++) {
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
	var dontTouch = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

	if(direction === 1) {
		for(var y = 3; y >= 0; y--) {
			for(var x = 0; x < 4; x++) {
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
		for(var x = 0; x < 4; x++) {
			for(var y = 0; y < 4; y++) {
				if(x != 3 && grid[y][x] > 0 && dontTouch[y][x] === 0) {
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
		for(var x = 3; x >= 0; x--) {
			for(var y = 3; y >= 0; y--) {
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
		for(var y = 0; y < 4; y++) {
			for(var x = 3; x >= 0; x--) {
				if(y != 3 && grid[y][x] > 0 && dontTouch[y][x] === 0) {
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

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++) {
			if(grid[y][x] !== -1) {
				sum += grid[y][x];
			}
		}
	}

	updateScore();
}

function updateScore() {
	shareElem.href = "https://twitter.com/home?status=Got%20a%20score%20of%20" + (score + sum) + "%20on%20%232048%20saming.fr/p/2048";

	scoreElem.innerHTML = (score + sum) + "pts";

	updateLevel();
}

function getLevelText(lvl) {
	if(lvl === 0) { return ""; }

	var text = "";
	if(lvl === 1) { text = "Welcome newbie"; } // 4+
	else if(lvl === 2) { text = "Now you're playing"; } // 16+
	else if(lvl === 3) { text = "Keep calm and press up"; } // 64+
	else if(lvl === 4) { text = "That's okay for a first time I guess"; } // 256+
	else if(lvl === 5) { text = "That's okay for a second time I guess"; } // 1024+
	else if(lvl === 6) { text = "This is getting serious isn't it"; } // 4,096+
	else if(lvl === 7) { text = "Wow!"; } // 16,384+
	else if(lvl === 8) { text = "Can I have an autograph?"; } // 65,536+
	else if(lvl === 9) { text = "You're not supposed to see this, stop"; } // 262,144+
	else if(lvl === 10) { text = "I'm pretty sure it's illegal to use supercomputers for that"; } // 1,048,576+

	return text;
}

function updateLevel() {
	level = Math.floor(Math.log(score + sum) / Math.log(4));

	if(level > 10) { level = 10; }
	if(level < 0) { level = 0; }

	var desc = getLevelText(level);

	levelText.innerHTML = "Level " + level + (desc === "" ? "" : (" — " + desc));
	levelBar.style.width = (level * 10) + "%";
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
	} else if(code === 13) {
		init(); // reinit
	}
}

function initScore() {
	score = 0, sum = 0;

	updateScore();
}

function initGrid() {
	grid = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];

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

touchElem.getElementsByTagName("div")[0].onclick = function() { moveGrid(1); }
touchElem.getElementsByTagName("div")[1].onclick = function() { moveGrid(3); }
touchElem.getElementsByTagName("div")[2].onclick = function() { moveGrid(2); }
touchElem.getElementsByTagName("div")[3].onclick = function() { moveGrid(4); }

initGrid();