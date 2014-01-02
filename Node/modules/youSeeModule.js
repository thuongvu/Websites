
function renderPage (request, response) {
	response.render("youSee/youSee")
}
var currentTimeData;
var urlData;
function youSee_io (socket, io) {
	socket.on("stateChange", function (data) {
		// console.log(data)
		this.broadcast.emit("stateBroadcast", data);
		// this.emit("stateBroadcast", data);
	})

	// loadVideo
	socket.on("loadVideo", function (data) {
		// console.log(data)
		this.broadcast.emit("loadVideoBroadcast", data);
		// this.emit("loadVideoBroadcast", data);
		urlData = data;
	})

	socket.on('currentTime', function (data) {
		this.broadcast.emit("currentTimeBroadcast", data);
		// this.emit("currentTimeBroadcast", data);
		currentTimeData = data;
	})

	socket.on('connected', function () {
		this.emit("askState", {currentTime: currentTimeData, url: urlData})
		// currentTimeData = "";
		// urlData = "";

		// }
		// this.emit("askState");
	})




}
// socket.on("newUser", function (data) {
// 	participants.push({id: data.id, name: data.name});
// 	this.broadcast.emit("newConnection", {participants: participants});
// 	this.emit("newConnection", {participants: participants});
// });


exports.renderPage = renderPage;
exports.youSee_io = youSee_io;