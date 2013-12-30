var _ = require("underscore");

function drawSomething_io (socket, io) {
	socket.on("newStroke", function (data) {
		console.log(data)
		this.broadcast.emit("strokesToDraw", {data: data});
		// this.emit("strokesToDraw", {data: data});
	});
}
exports.drawSomething_io = drawSomething_io;