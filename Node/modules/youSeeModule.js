
function renderPage (request, response) {
	response.render("youSee/youSee")
}

function youSee_io (socket, io) {
	socket.on("stateChange", function (data) {
		console.log(data)
		this.broadcast.emit("stateBroadcast", data);
		// this.emit("stateBroadcast", data);
	})

	// loadVideo
	socket.on("loadVideo", function (data) {
		console.log(data)
		this.broadcast.emit("loadVideoBroadcast", data);
		// this.emit("loadVideoBroadcast", data);
	})

	socket.on('connect', function (data) {
		this.broadcast.emit("askState");
		// this.emit("askState");
	})

	socket.on('currentTime', function (data) {
		this.broadcast.emit("currentTimeBroadcast", data);
		// this.emit("currentTimeBroadcast", data);
	})


}
// socket.on("newUser", function (data) {
// 	participants.push({id: data.id, name: data.name});
// 	this.broadcast.emit("newConnection", {participants: participants});
// 	this.emit("newConnection", {participants: participants});
// });


exports.renderPage = renderPage;
exports.youSee_io = youSee_io;