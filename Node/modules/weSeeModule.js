var currentTimeData;
var urlData;

function renderPage (request, response) {
	response.render("weSee/weSee")
}

function weSee_io (socket, io) {
	socket.on("stateChange", function (data) {
		socket.in(data.roomName).broadcast.emit("stateBroadcast", data);
	})

	socket.on("loadVideo", function (data) {
		urlData = data.url;
		socket.in(data.roomName).broadcast.emit("loadVideoBroadcast", data)
	})

	socket.on('currentTime', function (data) {
		currentTimeData = data;
		socket.in(data.roomName).broadcast.emit("currentTimeBroadcast", data);
	})

	socket.on('connected', function (data) {
		socket.in(data.roomName).emit("askState", {currentTime: currentTimeData, url: urlData})
		currentTimeData = "";
		urlData = "";
	})

	socket.on('joinRoom', function (data) {
		var roomName = data;
		socket.join(roomName);
		socket['room'] = roomName;
		socket.emit('joinRoomSuccess', {roomName: roomName})
	})

}

exports.renderPage = renderPage;
exports.weSee_io = weSee_io;