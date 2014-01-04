var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/tictac');
var roomNumber;
var socketId;

$(document).ready(function() {

	socket.on("connection", function (data) {
		roomNumber = data.room;
		socketId = data.id;
		socket.emit("connectionAccepted", {id: socketId, room: roomNumber})
	})

	socket.on("disco", function() {
		socket.emit("discoData", {roomNumber: roomNumber})
	})

	$('.spot').click(function () {
		var id = this.id;
		socket.emit("emitClickToRoom", {id: socketId, room: roomNumber, button: id})
	})

	socket.on("emitClickToClient", function (data) {
		if (data.player === socketId) {
			console.log("It's MINE")
			$("#" + data.buttonChange).css("background-color", "#0DDEFF")
		} else {
			$("#" + data.buttonChange).css("background-color", "#FF8727")
		}
	})

	socket.on("announceWinner", function (data) {
		$('#announce').html(data);
		$(".spot").css("background-color", "#BFBDB6")
	})

	socket.on("waiting", function (data) {
		$('#waitPlay').html(data);
	})



})