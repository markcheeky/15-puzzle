var resultGameField = [ [ 1,   2,   3,   4 ], 
						[ 5,   6,   7,   8 ],
						[ 9,  10,  11,  12 ],
						[ 13, 14,  15,   0 ] ];
var gameField =   [ [ 1,   2,   3,   4 ], 
					[ 5,   6,   7,   8 ],
					[ 9,  10,  11,  12 ],
					[ 13, 14,  15,   0 ] ];

var score = 0;
var directionNames = ["up", "down", "left", "right"];

function showMove(moved, positionFrom, positionTo) {
	var box = $('#box-' + moved);
	box.removeClass('row-' + positionFrom[0]);
	box.removeClass('column-' + positionFrom[1]);
	box.addClass('row-' + positionTo[0]);
	box.addClass('column-' + positionTo[1]);
};

function checkWin() {
	for (var i = 0; i < gameField.length; i++) {
		for (var j = 0; j < gameField[i].length; j++) {
			if (gameField[i][j] !== resultGameField[i][j]) {
				return;
			}
		};
	};
	alert("win");
	newGame();
};

function findCell(number) {
	for (var i = 0; i < gameField.length; i++) {
		for (var j = 0; j < gameField[i].length; j++) {
			if (gameField[i][j] === number) {
				return [i, j];
			}
		};
	};
};

function move(direction, invokedByUser) {
	var directions = {"up": [1, 0], "down":[-1, 0], "right":[0, -1], "left":[0, 1]};
	var direction = directions[direction];
	var positionEmptyCell = findCell(0);
	var positionMoved = [ (positionEmptyCell[0] + direction[0]), (positionEmptyCell[1] + direction[1])];
	if (positionMoved.indexOf(gameField.length) < 0 && positionMoved.indexOf(-1) < 0) {
		var moved = gameField[ positionMoved[0] ][ positionMoved[1] ];
		showMove(moved, positionMoved, positionEmptyCell);
		gameField[positionEmptyCell[0]][positionEmptyCell[1]] = moved;
		gameField[positionMoved[0]][positionMoved[1]] = 0;
	};
	if (invokedByUser) {
		checkWin();
	};
};

function shuffle(amount) {
	for (var i = 0; i < amount; i++) {
		move(directionNames[Math.floor(Math.random() * directionNames.length)], false); // random direction - "up", "down", "left", "right"
	};
};

function newGame() {
	$('.grid-box').css({"-webkit-transition": "1500ms ease-in-out", "transition": "1500ms ease-in-out"});
	shuffle(500);
	$('#inner-timer').width("0");
	setTimeout( function() {
		$('.grid-box').css({"-webkit-transition": "80ms ease-in-out", "transition": "80ms ease-in-out"});
	}, 1000);

}

$('#main-content').fadeIn(1200);
newGame();