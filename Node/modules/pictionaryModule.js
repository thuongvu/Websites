var _ = require("underscore");
var sanitizer = require("sanitizer");

function pictionary_io (socket, io) {

	socket.emit("ClientPlayerInfo", {id: socket.id})

	socket.on("newStroke", function (data) {
		currentStrokes = data.strokes
		socket.broadcast.emit("strokesToDraw", {data: data});
		// if i wanna test emitting to self... hmm, try later
	});

	socket.on("reset", function (){
		db.drawSomethingCol.remove()
		socket.broadcast.emit("resetDrawing");
	})

	socket.on("messageToServer", function(data) {
		var username = sanitizer.sanitize(data.username);
		var message = sanitizer.sanitize(data.message);
		var id = sanitizer.sanitize(data.id);
		socket.broadcast.emit("messageToClient", {username: username, message: message});
		socket.emit("messageToClient", {username: username, message: message});
	})

	socket.on("requestStartGame", function(data) {
		var username = sanitizer.sanitize(data.username);
		var message = sanitizer.sanitize(data.message);
		var id = sanitizer.sanitize(data.id);

		socket.emit("")
	})
}


exports.pictionary_io = pictionary_io;
