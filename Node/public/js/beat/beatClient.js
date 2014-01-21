var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/beat');

$(document).ready(function() {

	$('.play').css("height", ($(window).height() / 10))

	$('.play').click(function() {
		showBeat()
		var clone = $(this).clone()
		clone.find('audio')[0].play();
		var currentThis = $(this);
		$(this).addClass("pressed")
		setTimeout(function() {
			currentThis.removeClass("pressed")
		}, 500)
		socket.emit("beatToServer", this.id)
	})

	socket.on("beatToClient", function(data) {
		showBeat()
		var box = $('#' + data) 
		var clone = $(box).clone();
		clone.find('audio')[0].play();
		$(box).addClass("pressed")
		setTimeout(function() {
			$(box).removeClass("pressed")
		}, 500)
	})

	// SVG
	var width = 300,
	    height = 120;

   var svg = d3.select(".jumbotron").append("svg")
      .attr("width", width)
      .attr("height", height)
	  
   function showBeat() {
   	svg.append("circle")
   	  .attr("cx", 235)
   	  .attr("cy", 35)
   	  .attr("r", 10)
   	   .attr("stroke", '#'+(Math.random()*0xFFFFFF<<0).toString(16))
   	  .attr("stroke-width", 5)
   	  .attr("fill", '#'+(Math.random()*0xFFFFFF<<0).toString(16))
   	  .attr("opacity", .8)
   	  .transition().duration(750)
   	  .attr("opacity", 0.1)
   	    .attr("r", 30)
   	    .remove();
   }

   // added on later
   function keyBindTrigger(box) {
   	showBeat()
   	// console.log(box)
   	var clone = $(box).clone()
   	clone.find('audio')[0].play();
   	var currentThis = $(box);
   	$(box).addClass("pressed")
   	setTimeout(function() {
   		currentThis.removeClass("pressed")
   	}, 500)
   	socket.emit("beatToServer", this.id)
   }

   $(document).keypress(function(e){
   		if (e.which ===  113) {
   			keyBindTrigger($('#box1'));
   			console.log("q")
   		} else if (e.which == 119) {
   			keyBindTrigger($('#box2'));
   		} else if (e.which == 101) {
   			keyBindTrigger($('#box3'));
   		} else if (e.which == 99) {
   			keyBindTrigger($('#box4'));
   		} else if (e.which == 110) {
   			keyBindTrigger($('#box5'));
   		} else if (e.which == 105) {
   			keyBindTrigger($('#box6'));
   		} else if (e.which == 111) {
   			keyBindTrigger($('#box7'));
   		} else if (e.which == 112) {
   			keyBindTrigger($('#box8'));
   		} 
   	});


})
