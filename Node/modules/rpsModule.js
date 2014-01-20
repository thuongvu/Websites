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
		var roomName = data.roomName;
		console.log(data.id + " is joining room " + data.roomName)
		var room = data["roomName"];
		socket.join(room)

		if (!(newGame[room])) {
			// create a new room if it doesnt exist and assign user1 to object
			newGame[room] = new Game(room);
			newGame[room].user1 = data.id;
			console.log(newGame)
			// broadcast to user that they are waiting for a new player
			socket.in(roomName).emit('waitForNewPlayer', "Waiting for another player...")
			socket.in(roomName).emit('playerNumber', "1")
			// raise usercount
			newGame[room].userCount ++;
			console.log(newGame[room].room + " 's usercount is " + newGame[room].userCount)
		} else {
			// assign user2 to that specific room's object
			newGame[room].user2 = data.id;
			console.log(newGame)
			// broadcast this to both players
			socket.in(roomName).broadcast.emit('waitForNewPlayer', "Another player has joined!  Start!")
			socket.in(roomName).emit('waitForNewPlayer', "There are two players in the room!  Start!")
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
			socket.in(roomName).emit('chooseWait', "Waiting for other player")
			socket.in(roomName).broadcast.emit('chooseWait', "The other player is waiting... Choose!")
		} else if (newGame[roomName].user2 === id) {
			newGame[roomName].user2Strategy = strategy;
			console.log(newGame[roomName]);
			socket.in(roomName).emit('chooseWait', "Waiting for other player")
			socket.in(roomName).broadcast.emit('chooseWait', "The other player is waiting... Choose!")
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
				console.log("tie bc rock === rock")
				socket.in(roomName).emit('bothChosen', "TIE - You both chose rock!")
				socket.in(roomName).broadcast.emit('bothChosen', "TIE - You both chose rock!")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("player 1 wins, bc rock > scissors")
				socket.in(roomName).emit('bothChosen', "ROCK beats SCISSORS")
				socket.in(roomName).broadcast.emit('bothChosen', "ROCK beats SCISSORS")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("player 2 wins, bc rock < paper")
				socket.in(roomName).emit('bothChosen', "PAPER beats ROCK")
				socket.in(roomName).broadcast.emit('bothChosen', "PAPER beats ROCK")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("player 2 wins, bc scissors < rock")
				socket.in(roomName).emit('bothChosen', "ROCK beats SCISSORS")
				socket.in(roomName).broadcast.emit('bothChosen', "ROCK beats SCISSORS")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("tie, bc scissors === scissors")
				socket.in(roomName).emit('bothChosen', "TIE - You both chose scissors!")
				socket.in(roomName).broadcast.emit('bothChosen', "bc scissors === scissors")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("player 1 wins, bc scissors < paper")
				socket.in(roomName).emit('bothChosen', "PAPER beats SCISSORS")
				socket.in(roomName).broadcast.emit('bothChosen', "PAPER beats SCISSORS")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("player 1 wins, bc paper > rock")
				socket.in(roomName).emit('bothChosen', "PAPER beats ROCK")
				socket.in(roomName).broadcast.emit('bothChosen', "PAPER beats ROCK")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("player 2 wins, bc paper < scissors")
				socket.in(roomName).emit('bothChosen', "SCISSORS beats PAPER")
				socket.in(roomName).broadcast.emit('bothChosen', "SCISSORS beats PAPER")
				deleteStrats()
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("tie, bc paper === paper")
				socket.in(roomName).emit('bothChosen', "TIE -- You both chose paper!")
				socket.in(roomName).broadcast.emit('bothChosen', "TIE -- You both chose paper!")
				deleteStrats()
			} 
		}  


		


	})

	socket.on("disconnect", function() {
		console.log(socket.id + " is leaving") 
		for (prop in newGame) {
			function findAndDeleteUser(callback) {
				if (newGame[prop].user1 === socket.id) {
					// trying to find the room name that person left
					console.log(prop)
					var specificRoom = prop;
					console.log("newGame[specificRoom] before deleting user")
					console.log(newGame[specificRoom])
					delete newGame[specificRoom].user1
					console.log("newGame[specificRoom] after deleting user")
					console.log(newGame[specificRoom])
					// take 1 from usercount
					newGame[specificRoom].userCount --;
					console.log("newGame[specificRoom].userCount");
					console.log(newGame[specificRoom].userCount);
					callback(specificRoom)
				} else if (newGame[prop].user2 === socket.id) {
					// trying to find the room name that person left
					console.log(prop)
					var specificRoom = prop;
					console.log("newGame[specificRoom] before deleting user")
					console.log(newGame[specificRoom])
					delete newGame[specificRoom].user2
					console.log("newGame[specificRoom] after deleting user")
					console.log(newGame[specificRoom])
					// take 1 from usercount
					newGame[specificRoom].userCount --;
					console.log("newGame[specificRoom].userCount");
					console.log(newGame[specificRoom].userCount);
					callback(specificRoom)
				}
				
			}
			findAndDeleteUser(function(specificRoom) {
				console.log(specificRoom)
				console.log("newGame before deleting ROOM")
				console.log(newGame)
				if (newGame[specificRoom].userCount === 0) {
					delete newGame[specificRoom]
					console.log("newGame after deleting room")
					console.log(newGame)
				}
			})


		}
	})

}

exports.rps_io = rps_io;