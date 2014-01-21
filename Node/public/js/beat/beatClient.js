var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/beat');

$(document).ready(function() {

	$('.play').click(function() {
		var clone = $(this).clone()
		clone.find('audio')[0].play();
		console.log(this.id)
		var currentThis = $(this);
		$(this).addClass("red")
		setTimeout(function() {
			currentThis.removeClass("red")
			console.log(this)
		}, 500)
		console.log(this)
		socket.emit("beatToServer", this.id)
	})

	$('.play').css("height", ($(window).height() / 10))

	$('#buttonTest').click(function() {
		var box = '#box6';
		var clone = $(box).clone();
		clone.find('audio')[0].play();
		console.log(this.id)
		var currentThis = $(this);
		$(this).addClass("red")
		setTimeout(function() {
			currentThis.removeClass("red")
			console.log(this)
		}, 500)
		console.log(this)
	})

	socket.on("beatToClient", function(data) {
		console.log(data)
		var box = $('#' + data) 
		var clone = $(box).clone();
		clone.find('audio')[0].play();

		$(box).addClass("red")
		setTimeout(function() {
			$(box).removeClass("red")
		}, 500)
	})


})
