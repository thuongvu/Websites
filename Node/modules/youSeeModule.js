var currentTimeData;
var urlData;

function renderPage (request, response) {
	response.render("youSee/youSee")
}

function youSee_io (socket, io) {
	socket.on("stateChange", function (data) {
		this.broadcast.emit("stateBroadcast", data);
	})

	socket.on("loadVideo", function (data) {
		this.broadcast.emit("loadVideoBroadcast", data);
		urlData = data;
	})

	socket.on('currentTime', function (data) {
		this.broadcast.emit("currentTimeBroadcast", data);
		currentTimeData = data;
	})

	socket.on('connected', function () {
		this.emit("askState", {currentTime: currentTimeData, url: urlData})
		currentTimeData = "";
		urlData = "";
	})
}

exports.renderPage = renderPage;
exports.youSee_io = youSee_io;