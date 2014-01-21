var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/beat');

$(document).ready(function() {

	$('.play').css("height", ($(window).height() / 10))

	$('.play').click(function() {
		var clone = $(this).clone()
		clone.find('audio')[0].play();
		var currentThis = $(this);
		$(this).addClass("red")
		setTimeout(function() {
			currentThis.removeClass("red")
		}, 500)
		showBeat()
		socket.emit("beatToServer", this.id)
	})

	$('#buttonTest').click(function() {
		var box = '#box6';
		var clone = $(box).clone();
		clone.find('audio')[0].play();
		var currentThis = $(this);
		$(this).addClass("red")
		setTimeout(function() {
			currentThis.removeClass("red")
		}, 500)
	})

	socket.on("beatToClient", function(data) {
		showBeat()
		console.log(data + " from another user")
		var box = $('#' + data) 
		var clone = $(box).clone();
		clone.find('audio')[0].play();
		$(box).addClass("red")
		setTimeout(function() {
			$(box).removeClass("red")
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
	   

})
