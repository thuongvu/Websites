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
	console.log(socket.id + " connected")
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
			socket.in(roomName).emit('waitForNewPlayer', "waiting for another player")
			// raise usercount
			newGame[room].userCount ++;
			console.log(newGame[room].room + " 's usercount is " + newGame[room].userCount)
		} else {
			// assign user2 to that specific room's object
			newGame[room].user2 = data.id;
			console.log(newGame)
			// broadcast this to both players
			socket.in(roomName).broadcast.emit('waitForNewPlayer', "new player has joined!  begin!  choose!")
			socket.in(roomName).emit('waitForNewPlayer', "two players in this room!  begin!  choose!")
			// raise usercount
			newGame[room].userCount ++;
			console.log(newGame[room].room + " 's usercount is " + newGame[room].userCount)
		}
	})

	socket.on("choose", function(data) {
		var id = data.id;
		var roomName = data.roomName;
		var strategy = data.strategy;
		console.log(id);
		console.log(roomName);
		console.log(strategy);

		if (newGame[roomName].user1 === id) {
			newGame[roomName].user1Strategy = strategy;
			console.log(newGame[roomName]);
			socket.in(roomName).emit('chooseWait', "waiting for the user other")
			socket.in(roomName).broadcast.emit('chooseWait', "the other player is waiting for you")
		} else if (newGame[roomName].user2 === id) {
			newGame[roomName].user2Strategy = strategy;
			console.log(newGame[roomName]);
			socket.in(roomName).emit('chooseWait', "waiting for the user other")
			socket.in(roomName).broadcast.emit('chooseWait', "the other player is waiting for you")
		}

		if (newGame[roomName].user1Strategy && newGame[roomName].user2Strategy) {
			console.log("they've both chosen strategies now")
			if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("tie bc rock === rock")
				socket.in(roomName).emit('bothChosen', "tie bc rock === rock")
				socket.in(roomName).broadcast.emit('bothChosen', "tie bc rock === rock")
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("player 1 wins, bc rock > scissors")
				socket.in(roomName).emit('bothChosen', "player 1 wins, bc rock > scissors")
				socket.in(roomName).broadcast.emit('bothChosen', "player 1 wins, bc rock > scissors")
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("player 2 wins, bc rock < paper")
				socket.in(roomName).emit('bothChosen', "player 2 wins, bc rock < paper")
				socket.in(roomName).broadcast.emit('bothChosen', "player 2 wins, bc rock < paper")
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("player 2 wins, bc scissors < rock")
				socket.in(roomName).emit('bothChosen', "player 2 wins, bc scissors < rock")
				socket.in(roomName).broadcast.emit('bothChosen', "player 2 wins, bc scissors < rock")
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("tie, bc scissors === scissors")
				socket.in(roomName).emit('bothChosen', "bc scissors === scissors")
				socket.in(roomName).broadcast.emit('bothChosen', "bc scissors === scissors")
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("player 1 wins, bc scissors < paper")
				socket.in(roomName).emit('bothChosen', "player 1 wins, bc scissors < paper")
				socket.in(roomName).broadcast.emit('bothChosen', "player 1 wins, bc scissors < paper")
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("player 1 wins, bc paper > rock")
				socket.in(roomName).emit('bothChosen', "player 1 wins, bc paper > rock")
				socket.in(roomName).broadcast.emit('bothChosen', "player 1 wins, bc paper > rock")
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("player 2 wins, bc paper < scissors")
				socket.in(roomName).emit('bothChosen', "player 2 wins, bc paper < scissors")
				socket.in(roomName).broadcast.emit('bothChosen', "player 2 wins, bc paper < scissors")
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("tie, bc paper === paper")
				socket.in(roomName).emit('bothChosen', "tie, bc paper === paper")
				socket.in(roomName).broadcast.emit('bothChosen', "tie, bc paper === paper")
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