var _ = require("underscore");
var sanitizer = require("sanitizer");
var words = ['dog', 'chair', 'television', 'phone', 'honor', 'mountain', 'clock', 'sky', 'honk', 'chalk', 'story', 'book', 'throne', 'windmill', 'monk', 'sand', 'year', 'month', 'day', 'time', 'fish', 'pizza', 'basebal', 'football', 'basketball', 'party', 'hair', 'spine', 'head', 'nose', 'ear', 'beard', 'big', 'pig', 'small', 'hipster', 'trip', 'cookie', 'gym', 'syrup', 'carrot', 'spider', 'lung', 'flamingo', 'explore', 'music', 'conversation', 'tomato', 'police', 'island', 'faucet', 'level', 'evolution', 'trian', 'jump', 'vegetable'];
var newGame = {};
var newUser = {};
function User(id, username) {
	this.id = id;
	this.username = username;
	this.currentDrawer = 0;
	this.nextDrawer = 0;
}
function Game(room) {
	this.room = room;
	this.users = [];
	this.round = 0;
	this.userCount = 0;
	this.usersCorrect = 0;
	this.currentDrawer = '';
	this.nextDrawer = '';
	this.timeLeft = 10;
	this.word = words[3];
}

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

		socket.emit("startGame");
		socket.broadcast.emit("startGame");
	})

	socket.on("joinRoom", function(data) {
		var username = sanitizer.sanitize(data.username);
		var room = sanitizer.sanitize(data.room);
		var id = sanitizer.sanitize(data.id);

		console.log("username: " + username + " id " + id + " room " + room);
		socket.join(room);

		if (!(newGame[room])) {
			newGame[room] = new Game(room);
			newUser = new User(id, username);
			newGame[room].userCount++;
			newGame[room].users.push(newUser);

			// console.log("newUser")
			// console.log(newUser)
			// console.log("newGame")
			// console.log(newGame)

			var message = username + " has joined the room " + room;
			socket.broadcast.emit("messageToClient", {username: "Room", message: message});
			socket.emit("messageToClient", {username: "Room", message: message});
		} else {
			newUser = new User(id, username);
			newGame[room].userCount++;
			newGame[room].users.push(newUser);

			// console.log("newUser")
			// console.log(newUser)
			// console.log("newGame")
			// console.log(newGame)

			var message = username + " has joined the room " + room;
			socket.broadcast.emit("messageToClient", {username: "Room", message: message});
			socket.emit("messageToClient", {username: "Room", message: message});
		}

	})

	socket.on("disconnect", function() {
		console.log("socket.id " + socket.id + " disconnected" )

		function findAndDeleteUser(callback) {
			for (prop in newGame) {
				var currentRoom = prop;
				var length = newGame[prop].users.length;
				for (var i = 0; i < length; i++) {
					if (newGame[prop].users[i].id === socket.id) {
						newGame[prop].users.splice(i, 1)
						newGame[prop].userCount--;
						callback(currentRoom)
					}
				}
			}
		}

		findAndDeleteUser(function(currentRoom) {
			if (newGame[currentRoom].userCount === 0) {
				delete newGame[currentRoom]
			}
		})
		




	})
}


exports.pictionary_io = pictionary_io;
