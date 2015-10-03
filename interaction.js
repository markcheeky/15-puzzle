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
// $(function hammerListener() {
// 	var options = {
// 		touchAction: "pan-x"
// 	};
// 	var mc = new Hammer(document.getElementById('game-field'), options);
// 	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL});

// 	mc.on("swipeleft", function(ev) {
// 		move("left", true);
// 	});

// 	mc.on("swiperight", function(ev) {
// 		move("right", true);
// 	});	

// 	mc.on("swipeup", function(ev) {
// 		move("up", true);
// 	});	

// 	mc.on("swipedown", function(ev) {
// 		move("down", true);
// 	});	

// });

var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });


$(function touchListener() {
	$("#game-field").on( "swipeleft", function(event) {
 		event.stopPropagation();
 		event.preventDefault();
		move("left", true);
	});
	$("#game-field").on( "swiperight", function(event) {
 		event.stopPropagation();
 		event.preventDefault();
 		move("right", true);
	});
	$("#game-field").on( "swipeup", function(event) {
 		event.stopPropagation();
 		event.preventDefault();
 		move("up", true);
	});
	$("#game-field").on( "swipedown", function(event) {
 		event.stopPropagation();
 		event.preventDefault();
 		move("down", true);
	});
});