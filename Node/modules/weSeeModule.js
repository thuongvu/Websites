var currentTimeData;
var urlData;

function renderPage (request, response) {
	response.render("weSee/weSee")
}

function weSee_io (socket, io) {
	socket.on("stateChange", function (data) {
		console.log("data.room is " + data.roomName)
		// this.broadcast.emit("stateBroadcast", data);
		socket.in(data.roomName).broadcast.emit("stateBroadcast", data);
	})

	socket.on("loadVideo", function (data) {
		console.log(data)
		console.log("data.room is " + data.roomName)
		// this.broadcast.emit("loadVideoBroadcast", data);
		// urlData = data;
		urlData = data.url;

		socket.in(data.roomName).broadcast.emit("loadVideoBroadcast", data)
	})

	socket.on('currentTime', function (data) {

		console.log("data.room is " + data.roomName)
		// this.broadcast.emit("currentTimeBroadcast", data);
		currentTimeData = data;

		// socket.in(data.roomName).emit("currentTimeBroadcast", data);	
		socket.in(data.roomName).broadcast.emit("currentTimeBroadcast", data);
		// socket.in(data.roomName).broadcast.emit("stateBroadcast", data);	
	})

	socket.on('connected', function (data) {
		console.log("data.room is " + data.roomName)
		// this.emit("askState", {currentTime: currentTimeData, url: urlData});
		socket.in(data.roomName).emit("askState", {currentTime: currentTimeData, url: urlData})
		currentTimeData = "";
		urlData = "";
	})

	socket.on('joinRoom', function (data) {
		var roomName = data;
		console.log("joined room " + roomName);
		socket.join(roomName);
		socket['room'] = roomName;
		socket.emit('joinRoomSuccess', {roomName: roomName})
	})

}

exports.renderPage = renderPage;
exports.weSee_io = weSee_io;