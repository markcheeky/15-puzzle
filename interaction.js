// function that gets a pressed key and move
function moveEvent(e) {
	/* key presses: left = 37, up = 38, right = 39, down = 40 */

	// e.preventDefaults() causes that page will not scroll when arrows pressed

	switch(e.which) {
		case 37:
			move("left", true);
			e.preventDefault();
			break;
			
		case 38:
			move("up", true);
			e.preventDefault();
			break;
			
		case 39:
			move("right", true);
			e.preventDefault();
			break;
			
		case 40:
			move("down", true);
			e.preventDefault();
			break;
	}
}

// page catches user keypresses
$(function(){
	$('html').keydown(function(e) {
		moveEvent(e);
	});
});

// game field catches user swipe actions
$(function hammerListener() {
	var options = {
		touchAction: "pan-x"
	};
	var mc = new Hammer(document.getElementById('game-field'), options);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL});
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL});


	mc.on("swipeleft", function(ev) {
		move("left", true);
	});
	mc.on("panleft", function(ev) {
		move("left", true);
	});


	mc.on("swiperight", function(ev) {
		move("right", true);
	});	
	mc.on("panright", function(ev) {
		move("right", true);
	});	


	mc.on("swipeup", function(ev) {
		move("up", true);
	});
	mc.on("panup", function(ev) {
		move("up", true);
	});	
		

	mc.on("swipedown", function(ev) {
		move("down", true);
	});
	mc.on("pandown", function(ev) {
		move("down", true);
	});	

});
