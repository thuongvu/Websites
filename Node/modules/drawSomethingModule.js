var _ = require("underscore");

function drawSomething_io (socket, io) {
	socket.on("newStroke", function (data) {
		this.broadcast.emit("strokes", {drawStrokeObj});
	});
}