var _ = require("underscore");
var sanitizer = require("sanitizer");
var words = ['dog', 'chair', 'television', 'phone', 'honor', 'mountain', 'clock', 'sky', 'honk', 'chalk', 'story', 'book', 'throne', 'windmill', 'monk', 'sand', 'year', 'month', 'day', 'time', 'fish', 'pizza', 'baseball', 'football', 'basketball', 'party', 'hair', 'spine', 'head', 'nose', 'ear', 'beard', 'big', 'pig', 'small', 'hipster', 'trip', 'cookie', 'gym', 'syrup', 'carrot', 'spider', 'lung', 'flamingo', 'explore', 'music', 'conversation', 'tomato', 'police', 'island', 'faucet', 'level', 'evolution', 'trian', 'jump', 'vegetable'];
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
	var randNumber = Math.round(Math.random() * words.length)
	this.word = words[randNumber];
	this.inSession = 0;
}

function pictionary_io (socket, io) {

	socket.emit("ClientPlayerInfo", {id: socket.id})

	socket.on("newStroke", function (data) {
		var room = sanitizer.sanitize(data.strokes[0].room);
		var currentStrokes = sanitizer.sanitize(data.strokes)
		socket.in(room).broadcast.emit("strokesToDraw", {data: data});
		// if i wanna test emitting to self... hmm, try later
	});

	socket.on("reset", function (){
		db.drawSomethingCol.remove()
		socket.in(room).broadcast.emit("resetDrawing");
	})

	function correctWord(username, message, id, room, callback) {
		if (message === newGame[room].word) {
			var message = username + " got the correct word!"
			var username = 'Room';
			newGame[room].usersCorrect ++;
			console.log("correctWord")
			socket.in(room).broadcast.emit("messageToClient", {username: username, message: message, color: 'red'});
			socket.in(room).emit("messageToClient", {username: username, message: message, color: 'red'});
			callback(username, message, id, room)
		} else {
			socket.in(room).broadcast.emit("messageToClient", {username: username, message: message, color: '#fff'});
			socket.in(room).emit("messageToClient", {username: username, message: message, color: 'fff'});
		}
		
	}

	function allCorrect(username, message, id, room) {
		var totalMinusOne = newGame[room].userCount - 1;
		if (totalMinusOne === newGame[room].usersCorrect) {
			newGame[room].usersCorrect = 0;
			newGame[room].round++;
			if (newGame[room].round < 5) {
				console.log("newGame[room].round")
				console.log(newGame[room].round)
				// choose random number for word, set it, consolelogit
				var randNumber = Math.round(Math.random() * words.length)
				newGame[room].word = words[randNumber]
				console.log(newGame[room].word)
				// set new current drawer
				var randDrawer = Math.round(Math.random() * totalMinusOne)
				console.log("randDrawer");
				console.log(randDrawer);
				var currentDrawer = newGame[room].users[randDrawer].id;
				console.log("currentDrawer")
				console.log(currentDrawer)
				// emit
				socket.in(room).emit("startGame", {word: newGame[room].word, currentDrawer: currentDrawer, inSession: newGame[room].inSession});
				socket.in(room).broadcast.emit("startGame", {word: newGame[room].word, currentDrawer: currentDrawer, inSession: newGame[room].inSession});
			}
			
		}



	}

	socket.on("messageToServer", function(data) {
		var username = sanitizer.sanitize(data.username);
		var message = sanitizer.sanitize(data.message);
		var id = sanitizer.sanitize(data.id);
		var room = sanitizer.sanitize(data.room);

		correctWord(username, message, id, room, allCorrect);

		// socket.in(room).broadcast.emit("messageToClient", {username: username, message: message});
		// socket.in(room).emit("messageToClient", {username: username, message: message});
	})

	socket.on("requestStartGame", function(data) {
		var username = sanitizer.sanitize(data.username);
		var room = sanitizer.sanitize(data.room);
		var id = sanitizer.sanitize(data.id);
		// what to emit on startgame?
		// word, drawer, gameInSession
		newGame[room].currentDrawer = id;
		console.log("newGame[room].currentDrawer")
		console.log(newGame[room].currentDrawer)
		console.log("newGame[room].word")
		console.log(newGame[room].word)

		// in session
		newGame[room].inSession = 1;

		// round++
		newGame[room].round++;

		socket.in(room).emit("startGame", {word: newGame[room].word, currentDrawer: newGame[room].currentDrawer, inSession: newGame[room].inSession});
		// socket.in(room).broadcast.emit("startGame");
		socket.in(room).broadcast.emit("startGame", {word: newGame[room].word, currentDrawer: newGame[room].currentDrawer, inSession: newGame[room].inSession});
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
			console.log(newGame[room])
			var message = username + " has joined the room " + room;
			socket.in(room).broadcast.emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession});
			socket.in(room).emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession});
		} else {
			newUser = new User(id, username);
			newGame[room].userCount++;
			newGame[room].users.push(newUser);
			var message = username + " has joined the room " + room;
			socket.in(room).broadcast.emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession});
			socket.in(room).emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession});
		}

	})

	socket.on("disconnect", function() {
		console.log("socket.id " + socket.id + " disconnected" )

		function findAndDeleteUser(callback) {
			for (prop in newGame) {
				var currentRoom = prop;
				var length = newGame[prop].users.length;
				for (var i = 0; i < length; i++) {
					console.log(newGame[prop].users)
					if (newGame[prop].users[i].id === socket.id) {
						newGame[prop].users.splice(i, 1)
						length--
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
