var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/tictac');
var roomNumber;
var socketId;

$(document).ready(function() {

	$('#emitToRoom').click(function () {
		socket.emit("emitToRoom", {id: socketId, room: roomNumber, message: "Emitting from room " + roomNumber})
	})

	socket.on("connection", function (data) {
		console.log(data)
		roomNumber = data.room;
		socketId = data.id;
		console.log("roomNumber is " + roomNumber)
		console.log("socketId is " + socketId)
	})

	socket.on("emitToClient", function(data) {
		console.log(data)
	})


	$('.spot').click(function () {
		var id = this.id;
		console.log(id)
		socket.emit("emitClickToRoom", {id: socketId, room: roomNumber, button: id})
	})


	socket.on("emitClickToClient", function (data) {
		console.log(data);
		if (data.player === socketId) {
			console.log("It's MINE")
			$("#" + data.buttonChange).css("background-color", "blue")
		} else {
			$("#" + data.buttonChange).css("background-color", "green")
		}
	})



})