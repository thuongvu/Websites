var sanitizer = require('sanitizer');
var newGame = {};
function Game(roomNumber) {
	this.room = roomNumber;
	this.user1;
	this.user2;
	this.user1Strategy;
	this.user2Strategy;
	this.userCount = 0;
}

function rps_io (socket, io) {
	socket.emit("connection", {id: socket.id})
	socket.on("checking", function(data) {
		console.log(data)
	})

	socket.on("joinRoom", function(data) {
		var roomName = sanitizer.sanitize(data.roomName);
		console.log(data.id + " is joining room " + data.roomName)
		var room = data["roomName"];
		socket.join(room)

		if (!(newGame[room])) {
			// create a new room if it doesnt exist and assign user1 to object
			newGame[room] = new Game(room);
			newGame[room].user1 = data.id;
			console.log(newGame)
			// broadcast to user that they are waiting for a new player
			socket.in(roomName).emit('status', "Waiting for another player...")
			socket.in(roomName).emit('playerNumber', "1")
			// raise usercount
			newGame[room].userCount ++;
			console.log(newGame[room].room + " 's usercount is " + newGame[room].userCount)
		} else {
			// assign user2 to that specific room's object
			newGame[room].user2 = data.id;
			console.log(newGame)
			// broadcast this to both players
			socket.in(roomName).broadcast.emit('status', "Another player has joined!  Start!")
			socket.in(roomName).emit('status', "There are two players in the room!  Start!")
			socket.in(roomName).emit('playerNumber', "2")
			// raise usercount
			newGame[room].userCount ++;
			console.log(newGame[room].room + " 's usercount is " + newGame[room].userCount)
		}
	})

	socket.on("choose", function(data) {
		var id = data.id;
		var roomName = data.roomName;
		var strategy = data.strategy;
		var playerNumber = data.playerNumber;
		console.log(id);
		console.log(roomName);
		console.log(strategy);
		console.log("playerNumber");
		console.log(playerNumber);

		if (newGame[roomName].user1 === id) {
			newGame[roomName].user1Strategy = strategy;
			console.log(newGame[roomName]);
			socket.in(roomName).emit('status', "Waiting for other player")
			socket.in(roomName).broadcast.emit('status', "The other player is waiting... Choose!")
		} else if (newGame[roomName].user2 === id) {
			newGame[roomName].user2Strategy = strategy;
			console.log(newGame[roomName]);
			socket.in(roomName).emit('status', "Waiting for other player")
			socket.in(roomName).broadcast.emit('status', "The other player is waiting... Choose!")
		}

		if (newGame[roomName].user1Strategy && newGame[roomName].user2Strategy) {
			console.log("they've both chosen strategies now")
			// logic to decide what displays
			if (playerNumber === '1') {
				console.log("if playernumber is 1, display user2's strategy")
				console.log(newGame[roomName].user2Strategy)
				socket.in(roomName).emit('otherPlayerDisplay', newGame[roomName].user2Strategy)
				socket.in(roomName).broadcast.emit('otherPlayerDisplay', newGame[roomName].user1Strategy)
			} else if (playerNumber === '2') {
				console.log("if playernumber is 2, display user1's strategy")
				console.log(newGame[roomName].user1Strategy)
				socket.in(roomName).emit('otherPlayerDisplay', newGame[roomName].user1Strategy)
				socket.in(roomName).broadcast.emit('otherPlayerDisplay', newGame[roomName].user2Strategy)
			}

			function deleteStrats() {
				console.log("user strategies BEFORE")
				console.log(newGame[roomName].user1Strategy)
				console.log(newGame[roomName].user2Strategy)
				newGame[roomName].user1Strategy = '';
				newGame[roomName].user2Strategy = '';
				console.log("user strategies AFTER")
				console.log(newGame[roomName].user1Strategy)
				console.log(newGame[roomName].user2Strategy)
			}

			// logic to decide who wins
			if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'rock')) {
				socket.in(roomName).emit('status', "TIE - You both chose rock!")
				socket.in(roomName).broadcast.emit('status', "TIE - You both chose rock!")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'scissors')) {
				socket.in(roomName).emit('status', "ROCK beats SCISSORS")
				socket.in(roomName).broadcast.emit('status', "ROCK beats SCISSORS")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'paper')) {
				socket.in(roomName).emit('status', "PAPER beats ROCK")
				socket.in(roomName).broadcast.emit('status', "PAPER beats ROCK")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'rock')) {
				socket.in(roomName).emit('status', "ROCK beats SCISSORS")
				socket.in(roomName).broadcast.emit('status', "ROCK beats SCISSORS")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'scissors')) {
				socket.in(roomName).emit('status', "TIE - You both chose scissors!")
				socket.in(roomName).broadcast.emit('status', "TIE - You both chose scissors!")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'paper')) {
				socket.in(roomName).emit('status', "SCISSORS beats PAPER")
				socket.in(roomName).broadcast.emit('status', "SCISSORS beats PAPER")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'rock')) {
				socket.in(roomName).emit('status', "PAPER beats ROCK")
				socket.in(roomName).broadcast.emit('status', "PAPER beats ROCK")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'scissors')) {
				socket.in(roomName).emit('status', "SCISSORS beats PAPER")
				socket.in(roomName).broadcast.emit('status', "SCISSORS beats PAPER")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'paper')) {
				socket.in(roomName).emit('status', "TIE -- You both chose paper!")
				socket.in(roomName).broadcast.emit('status', "TIE -- You both chose paper!")
				deleteStrats()
			} 
		}  
	})

	socket.on("disconnect", function() {
		for (prop in newGame) {
			// declaring function
			function findAndDeleteUser(callback) {
				if (newGame[prop].user1 === socket.id) {
					var specificRoom = prop; // find the room name that user left
					delete newGame[specificRoom].user1; // delete the user
					newGame[specificRoom].userCount --; // usercount--
					newGame[specificRoom].user1 = newGame[specificRoom].user2; //user2 is now user1 
					delete newGame[specificRoom].user2
					socket.in(specificRoom).broadcast.emit('bothChosen', "Your opponent has disconnected!") // alert other user
					callback(specificRoom) // callback

				} else if (newGame[prop].user2 === socket.id) {
					var specificRoom = prop; // trying to find the room name that person left
					delete newGame[specificRoom].user2 // delete user
					newGame[specificRoom].userCount--; // usercount--
					socket.in(specificRoom).broadcast.emit('bothChosen', "Your opponent has disconnected!") // alert other user
					callback(specificRoom) //callback
				}	
			}
			// invoking function: do function ^, as callback, if no users in room, delete room
			findAndDeleteUser(function(specificRoom) {
				if (newGame[specificRoom].userCount === 0) {
					delete newGame[specificRoom]
				}
			})
		}
	})

}

exports.rps_io = rps_io;