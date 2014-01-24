var _ = require("underscore");
var sanitizer = require("sanitizer");
var words = ['dog', 'chair', 'television', 'phone', 'honor', 'mountain', 'clock', 'sky', 'honk', 'chalk', 'story', 'book', 'throne', 'windmill', 'monk', 'sand', 'year', 'month', 'day', 'time', 'fish', 'pizza', 'baseball', 'football', 'basketball', 'party', 'hair', 'spine', 'head', 'nose', 'ear', 'beard', 'big', 'pig', 'small', 'hipster', 'trip', 'cookie', 'gym', 'syrup', 'carrot', 'spider', 'lung', 'flamingo', 'explore', 'music', 'conversation', 'tomato', 'police', 'island', 'faucet', 'level', 'evolution', 'train', 'jump', 'vegetable'];
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

	socket.on("reset", function (data){
		var room = sanitizer.sanitize(data.room);
		socket.in(room).broadcast.emit("resetDrawing");
		socket.in(room).emit("resetDrawing");
	})

	function correctWord(username, message, id, room, callback) {
		if (message === newGame[room].word) {
			var message = username + " got the correct word!"
			var username = 'Room';
			newGame[room].usersCorrect ++;
			console.log("correctWord")
			socket.in(room).broadcast.emit("messageToClient", {username: username, message: message, color: '#FF0000'});
			socket.in(room).emit("messageToClient", {username: username, message: message, color: '#FF0000'});
			callback(username, message, id, room)
		} else {
			socket.in(room).broadcast.emit("messageToClient", {username: username, message: message, color: '#000'});
			socket.in(room).emit("messageToClient", {username: username, message: message, color: '#000'});
		}
		
	}

	function allCorrect(username, message, id, room) {
		var totalMinusOne = newGame[room].userCount - 1;
		if (totalMinusOne === newGame[room].usersCorrect) {
			newGame[room].usersCorrect = 0;
			newGame[room].round++;
			if (newGame[room].round < 3) {
				// choose random number for word, set it, consolelogit
				var randNumber = Math.round(Math.random() * words.length)
				newGame[room].word = words[randNumber]
				// set new current drawer
				var randDrawer = Math.round(Math.random() * totalMinusOne)
				var currentDrawer = newGame[room].users[randDrawer].id;
				// emit delete svg
				socket.in(room).broadcast.emit("resetDrawing");
				socket.in(room).emit("resetDrawing");
				// emit
				socket.in(room).emit("startGame", {word: newGame[room].word, currentDrawer: currentDrawer, inSession: newGame[room].inSession, round: newGame[room].round, room: newGame[room].room});
				socket.in(room).broadcast.emit("startGame", {word: newGame[room].word, currentDrawer: currentDrawer, inSession: newGame[room].inSession, round: newGame[room].round, room: newGame[room].room});
			} else if (newGame[room].round <= 3){
				newGame[room].inSession = 0;
				var message = "Yay!  You've played for 5 rounds!"
				newGame[room].round = 0;
				socket.in(room).broadcast.emit("messageToClient", {username: "Room", message: message, color: '#FF0000', inSession: newGame[room].inSession, round: newGame[room].round, room: newGame[room].room});
				socket.in(room).emit("messageToClient", {username: "Room", message: message, color: '#FF0000', inSession: newGame[room].inSession, round: newGame[room].round, room: newGame[room].room});
				// just added this, a reset whenever the rounds finish
				socket.in(room).broadcast.emit("resetDrawing");
				socket.in(room).emit("resetDrawing");
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
		newGame[room].currentDrawer = id;
		// console.log("newGame[room].currentDrawer")
		// console.log(newGame[room].currentDrawer)
		// console.log("newGame[room].word")
		// console.log(newGame[room].word)

		// in session
		newGame[room].inSession = 1;

		// round++
		newGame[room].round++;

		socket.in(room).emit("startGame", {word: newGame[room].word, currentDrawer: newGame[room].currentDrawer, inSession: newGame[room].inSession, round: newGame[room].round});
		// socket.in(room).broadcast.emit("startGame");
		socket.in(room).broadcast.emit("startGame", {word: newGame[room].word, currentDrawer: newGame[room].currentDrawer, inSession: newGame[room].inSession, round: newGame[room].round});
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
			// console.log(newGame[room])
			var message = username + " has joined the room " + room;
			socket.in(room).broadcast.emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession, color: '#FF0000', userJoined: username, round: newGame[room].round});
			socket.in(room).emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession, color: '#FF0000', userJoined: username, round: newGame[room].round});
		} else {
			newUser = new User(id, username);
			newGame[room].userCount++;
			newGame[room].users.push(newUser);
			var message = username + " has joined the room " + room;
			socket.in(room).broadcast.emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession, color: '#FF0000', userJoined: username, round: newGame[room].round});
			
			
			sendUserList(room, function(usersArray) {
				socket.in(room).emit("messageToClient", {username: "Room", message: message, inSession: newGame[room].inSession, color: '#FF0000', userJoined: usersArray, currentDrawer: newGame[room].currentDrawer, round: newGame[room].round});
			})

		}

	})

	function sendUserList(room, callback) {
		var usersArray = [];
		for (var j = 0; j < newGame[room].users.length; j++) {
			usersArray.push(newGame[room].users[j].username)
		}
		callback(usersArray, room)
	}




	socket.on("disconnect", function() {
		console.log("socket.id " + socket.id + " disconnected" )

		function findAndDeleteUser(callback) {
			for (prop in newGame) {
				var currentRoom = prop;
				var length = newGame[prop].users.length;
				for (var i = 0; i < length; i++) {
					if (newGame[prop].users[i].id === socket.id) {
						var username = newGame[prop].users[i].username;
						var idUser = newGame[prop].users[i].id;
						// deleting from server logic
						newGame[prop].users.splice(i, 1)
						length--
						newGame[prop].userCount--;
						// if the person who left was the drawer
						// if (newGame[currentRoom].users[i].id === newGame[currentRoom].currentDrawer) {

						// }
						// emitting to room logic
						var message = username + " has left the room " + currentRoom;
						socket.in(currentRoom).broadcast.emit("messageToClient", {username: "Room", message: message, inSession: newGame[currentRoom].inSession, color: '#FF0000', userLeft: username});
						// our lovely callback
						callback(currentRoom, idUser)
					}
				}
			}
		}

		findAndDeleteUser(function(currentRoom, idUser) {
			// console.log("newGame[currentRoom]")
			// console.log(newGame[currentRoom])
			if (newGame[currentRoom].userCount === 0) {
				delete newGame[currentRoom]
			} else if (idUser === newGame[currentRoom].currentDrawer) {
				console.log("the drawer left bro!")
				// var totalMinusOne = newGame[currentRoom].userCount - 1
				// var randDrawerNumber = Math.round(Math.random * totalMinusOne);
				// newGame[currentRoom].currentDrawer = newGame[currentRoom].users[randDrawerNumber].id;
				// var username = newGame[currentRoom].users[randDrawerNumber].username;

				var totalMinusOne = newGame[currentRoom].userCount - 1;
				var randDrawer = Math.round(Math.random() * totalMinusOne)
				var currentDrawer = newGame[currentRoom].users[randDrawer].id;
				var currentDrawerUsername = newGame[currentRoom].users[randDrawer].username;
				newGame[currentRoom].currentDrawer = currentDrawer;

				var message = "The new person who will be drawing is " + currentDrawerUsername;
				socket.in(currentRoom).broadcast.emit("messageToClient", {username: "Room", message: message, inSession: newGame[currentRoom].inSession, color: '#FF0000', currentDrawer: currentDrawer, round: newGame[currentRoom].round, word: newGame[currentRoom].word });
			}	
		})
		
		


	})
}


exports.pictionary_io = pictionary_io;
