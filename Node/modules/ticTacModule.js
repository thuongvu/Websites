var _ = require("underscore");
var room;
var userCount = 0;
var roomCount = 0;
var roomList = {};
var newgame = {};


function Game(roomNumber) {
	this.room = roomNumber;
	this.message;
	this.turnOver;
	this.spotsClaimed = [];
}


function renderPage(request, response) {
	response.render("ticTac/ticTac")
}

function ticTac_io(socket, io) {
	console.log(socket.id + " CONNECTED")
	userCount++;

	if (userCount % 2 === 1) {
		roomCount++;
		room = roomCount.toString();
		roomList[room] = {user1: socket.id}
		// roomList[room].user1 = socket.id
		newgame[room] = new Game(room);
		console.log("newgame is ")
		console.log(newgame)
	} else {
		room = roomCount.toString();
		roomList[room].user2 = socket.id;
	}
	socket.join(room);
	socket['room'] = room;
	console.log(socket.id + " joined room " + socket['room']);

	socket.emit("connection", {id: socket.id, room: room, roomList: roomList[room]})


	socket.on("emitToRoom", function (data) {
		console.log("client is emitting")
		console.log("data.room is " + data.room)

		socket.broadcast.to(data.room).emit('emitToClient', "emitting to clients in room" + data.room)
	})

	socket.on("emitClickToRoom", function (data) {
		// console.log(data.id + " clicked " + data.button + " in room " + data.room)
		// // socket.broadcast.to(data.room).emit('emitClickToClient', "validClick")
		// // socket.broadcast.to(data.room).emit('emitClickToClient', "validClick")
		// socket.in(data.room).emit('emitClickToClient', {player: data.id, buttonChange: data.button})
		// socket.in(data.room).broadcast.emit('emitClickToClient', {player: data.id, buttonChange: data.button})
		
		// newgame[data.room].message = data.button;
		// console.log(newgame)
		console.log(data)

		if (newgame[data.room].turnover != data.id) {
			newgame[data.room]["spotsClaimed"].push(data.button)

			console.log(data.id + " clicked " + data.button + " in room " + data.room)
			socket.in(data.room).emit('emitClickToClient', {player: data.id, buttonChange: data.button})
			socket.in(data.room).broadcast.emit('emitClickToClient', {player: data.id, buttonChange: data.button})
			newgame[data.room].turnover = data.id;
			console.log(newgame)
		
		} else {
			console.log("not your turn")
		}

		// if (newgame[data.room]["spotsClaimed"] != data.button) {

		// }





		for (var i = 0; i < newgame[data.room]["spotsClaimed"].length; i++) {
			if (newgame[data.room]["spotsClaimed"][i] != data.button) {



			}
		}


	})

	socket.on("disconnect", function () {
		userCount-=1;
		console.log(userCount + " number of users")
		if (userCount %2 === 0) {
			roomCount-=1;
			console.log("roomcount is " + roomCount)
		}
	})
}




exports.renderPage = renderPage;
exports.ticTac_io = ticTac_io;