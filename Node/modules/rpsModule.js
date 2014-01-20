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
		console.log(data.id + " is joining room " + data.roomName)
		var room = data["roomName"];
		socket.join(room)

		if (!(newGame[room])) {
			newGame[room] = new Game(room);
			newGame[room].user1 = data.id;
			console.log(newGame)
		} else {
			newGame[room].user2 = data.id;
			console.log(newGame)
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
		} else if (newGame[roomName].user2 === id) {
			newGame[roomName].user2Strategy = strategy;
			console.log(newGame[roomName]);
		}

		if (newGame[roomName].user1Strategy && newGame[roomName].user2Strategy) {
			console.log("they've both chosen strategies now")
			if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("tie bc rock === rock")
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("player 1 wins, bc rock > scissors")
			} else if ((newGame[roomName].user1Strategy === 'rock') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("player 2 wins, bc rock < paper")
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("player 2 wins, bc scissors < rock")
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("tie, bc scissors === scissors")
			} else if ((newGame[roomName].user1Strategy === 'scissors') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("player 1 wins, bc scissors < paper")
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'rock')) {
				console.log("player 1 wins, bc paper > rock")
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'scissors')) {
				console.log("player 2 wins, bc paper < scissors")
			} else if ((newGame[roomName].user1Strategy === 'paper') && (newGame[roomName].user2Strategy === 'paper')) {
				console.log("tie, bc paper === paper")
			} 
		}  

		// socket.in(data.roomName).emit('waiting', "Another player has joined!  Begin!")
		// socket.in(data.roomName).broadcast.emit('waiting', "Another player has joined!  Begin!")

	})

}

exports.rps_io = rps_io;