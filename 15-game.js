// resultGameField is game field before shuffling and final result to be compared with actual game field
var resultGameField = [ [ 1,   2,   3,   4 ], 
						[ 5,   6,   7,   8 ],
						[ 9,  10,  11,  12 ],
						[ 13, 14,  15,   0 ] ];

// actual game field user see and moves in 
var gameField =   [ [ 1,   2,   3,   4 ], 
					[ 5,   6,   7,   8 ],
					[ 9,  10,  11,  12 ],
					[ 13, 14,  15,   0 ] ];

var initialTime;
var directionNames = ["up", "down", "left", "right"];

var scoreLabel = document.getElementById("score-inner-value");
var bestScoreLabel = document.getElementById("best-inner-value");

var score = 100;
var bestScore = 0;
var endMessageDiv = document.getElementById("inner-gameEnd");
var cookieKey = "15-Puzzle_bestscore";

var ChangeBoxAnimationTimeout;
var changeContentOfScoreInterval;

var gameEnd;

// called when the game is over
function end() {
	gameEnd = true;
	clearInterval(changeContentOfScoreInterval);
	$('#inner-timer').addClass('paused');
	$('#gameEndOverlay').css('opacity', '0.9');
}

// called when the user won
function win() {
	if (! gameEnd) {
		end();
		score = Math.ceil(score);
		endMessageDiv.innerHTML = "Congratulations - you won! <br>score: " + score;
		if (score > bestScore) {
			document.cookie = cookieKey + "=" + score + ';expires = Tue, 19 Jan 2038 03:14:07 GMT';
			bestScoreLabel.innerHTML = score;
		}
	}
}

// read the cookie
function ReadCookie(key) {
	var allcookies = document.cookie;
	alert("All Cookies : " + allcookies );

	// Get all the cookies pairs in an array
	cookiearray  = allcookies.split(';');

	// Now take key value pair out of this array
	for(var i = 0; i < cookiearray.length; i++){
		name = cookiearray[i].split('=')[0];
		if(name === key) {
			return cookiearray[i].split('=')[1];
		}
	}

	return 0;
}

// called when the user lost
function gameOver() {
	if (! gameEnd) {
		end();
		document.cookie = '';
		endMessageDiv.innerHTML = "Game over";
	}
}

// display a tile movement
function showMove(moved, positionFrom, positionTo) {
	var box = $('#box-' + moved);
	box.removeClass('row-' + positionFrom[0]);
	box.removeClass('column-' + positionFrom[1]);
	box.addClass('row-' + positionTo[0]);
	box.addClass('column-' + positionTo[1]);
};

// checks if user game field is same as resultGameField
function checkWin() {
	for (var i = 0; i < gameField.length; i++) {
		for (var j = 0; j < gameField[i].length; j++) {
			if (gameField[i][j] !== resultGameField[i][j]) {
				return;
			}
		};
	};
	win();
};

// returns position of a tile in the gamefield 
function findCell(number) {
	for (var i = 0; i < gameField.length; i++) {
		for (var j = 0; j < gameField[i].length; j++) {
			if (gameField[i][j] === number) {
				return [i, j];
			}
		};
	};
};

// finds the empty space and moves a tile (corresponding to direction) there
function move(direction, invokedByUser) {
	if (! gameEnd) {
		var directions = {"up": [1, 0], "down":[-1, 0], "right":[0, -1], "left":[0, 1]};
		var direction = directions[direction];
		var positionEmptyTile = findCell(0);
		var positionMoved = [ (positionEmptyTile[0] + direction[0]), (positionEmptyTile[1] + direction[1])];
		if (positionMoved.indexOf(gameField.length) < 0 && positionMoved.indexOf(-1) < 0) {
			var moved = gameField[ positionMoved[0] ][ positionMoved[1] ];
			showMove(moved, positionMoved, positionEmptyTile);
			gameField[positionEmptyTile[0]][positionEmptyTile[1]] = moved;
			gameField[positionMoved[0]][positionMoved[1]] = 0;
		};
		if (invokedByUser) { // check a win if the user invoked a move (not shuffling)
			checkWin();
		};
	}	
};

// shuffle a game field
function shuffle(amount) {
	for (var i = 0; i < amount; i++) {
		move(directionNames[Math.floor(Math.random() * directionNames.length)], false); // random direction - "up", "down", "left", "right"
	};
};

// reloads initial look of the game
function newGameDesign() {
	$('.grid-box').css({"-webkit-transition": "1500ms ease-in-out", "transition": "1500ms ease-in-out"});
	ChangeBoxAnimationTimeout = setTimeout( function() {
		$('.grid-box').css({"-webkit-transition": "80ms ease-in-out", "transition": "80ms ease-in-out"});
	}, 1000);
	$('#inner-timer').css({"animation": "none", "animation-play-state": "initial"});
	$('#inner-timer').width("100%");
	$('#inner-timer').css("animation", "100s linear animate-timer forwards");
	$('#inner-timer').removeClass('paused');
	$('#gameEndOverlay').css('opacity', '0');

	endMessageDiv.innerHTML = "";
}

// changes score in the label every second
function changeScore() {
	clearInterval(changeContentOfScoreInterval);
	changeContentOfScoreInterval = setInterval( function() {
		score -= 1;
		scoreLabel.innerHTML = Math.ceil(score);
		if (score <= 0) {
			gameOver();
		}
	}, 1000);
}

// runs a new game
function newGame() {
	gameEnd = false;
	score = 100;
	gameEnd = false;
	bestScore = ReadCookie(cookieKey);
	bestScoreLabel.innerHTML = bestScore;

	newGameDesign();
	shuffle(1000);

	changeScore();
}

$('#main-content').fadeIn(1200); // show fade effect on page load
newGame(); // start new game on page load