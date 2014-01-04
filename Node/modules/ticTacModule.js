var _ = require("underscore");
var room;
var userCount = 0;
var roomCount = 0;
var newgame = {};
var roomList = {};

function Game(roomNumber) {
	this.room = roomNumber;
	this.turnover;
	this.spotsClaimed = [];
	this.user1Array = [];
	this.user2Array = [];
	this.reset = function () {
		this.room = roomNumber;
		this.spotsClaimed = [];
		this.user1Array = [];
		this.user2Array = [];
		this.turnover = "";
	}
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
		newgame[room] = new Game(room);
		newgame[room].user1 = {id: socket.id, array: []}
		newgame[room].users = 0;
		newgame[room].users +=1;
	} else {
		room = roomCount.toString();
		newgame[room].user2 = {id: socket.id, array: []}
		newgame[room].users +=1;
	}
	socket.join(room);
	socket['room'] = room;
	console.log(socket.id + " joined room " + socket['room']);

	socket.emit("connection", {id: socket.id, room: room})

	console.log("newgame[room].users is " + newgame[room].users)

	socket.on("connectionAccepted", function (data) {
		if (newgame[data.room].users < 2) {
			socket.in(room).emit('waiting', "Waiting for another player to join...")
		} else if (newgame[data.room].users === 2){
			socket.in(room).emit('waiting', "Another player has joined!  Begin!")
			socket.in(room).broadcast.emit('waiting', "Another player has joined!  Begin!")
		}
	})


	socket.on("emitClickToRoom", function (data) {
		
			if (_.contains(newgame[data.room]["spotsClaimed"], data.button)) {
				return false;
			} else {
				if (newgame[data.room].turnover != data.id) {
					newgame[data.room]["spotsClaimed"].push(data.button)

					console.log(data.id + " clicked " + data.button + " in room " + data.room)
					socket.in(data.room).emit('emitClickToClient', {player: data.id, buttonChange: data.button})
					socket.in(data.room).broadcast.emit('emitClickToClient', {player: data.id, buttonChange: data.button})
					newgame[data.room].turnover = data.id;

					if (data.id === newgame[data.room].user1.id) {
						newgame[data.room]["user1Array"].push(data.button);
					} else if (data.id === newgame[room].user2.id) {
						newgame[data.room]["user2Array"].push(data.button);
					}


					if (newgame[data.room]["spotsClaimed"].length === 9) {
						newgame[data.room].reset();
						socket.in(data.room).emit('announceWinner', "Draw! Click to play again.")
						socket.in(data.room).broadcast.emit('announceWinner', "Draw! Click to play again.")
					}
	// this looks terrible, i will need to find a way to make this work later.  why doesnt || work with this?  can i use multiple vars with _.contains? GOOGLE LATER

					var winnerPattern = ["button1", "button2", "button3"]
					var winnerPattern2 = ["button4", "button6", "button5"];
					var winnerPattern3 = ["button7", "button8", "button9"];
					var winnerPattern4 = ["button1", "button5", "button9"];
					var winnerPattern5 = ["button3", "button5", "button7"];
					var winnerPattern6 = ["button1", "button4", "button7"];
					var winnerPattern7 = ["button2", "button5", "button8"];
					var winnerPattern8 = ["button3", "button6", "button9"];

					function announceWinner() {
						socket.in(data.room).emit('announceWinner', "<b>You win!</b> :) Click to play again.")
						socket.in(data.room).broadcast.emit('announceWinner', "<b>You lost</b> :(  Click to play again.")
						newgame[data.room].reset();
						console.log(newgame[data.room])
					}

					if (_.every(winnerPattern, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 123")
						announceWinner();
					}
					if (_.every(winnerPattern2, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 456")
						announceWinner();
					}
					if (_.every(winnerPattern3, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 789")
						announceWinner();
					}
					if (_.every(winnerPattern4, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 159")
						announceWinner();
					}
					if (_.every(winnerPattern5, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern6, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern7, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern8, _.partial(_.contains, newgame[data.room]["user1Array"]))) {
						console.log("player1 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player2 wins, 123")
						announceWinner();
					}
					if (_.every(winnerPattern2, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player2 wins, 456")
						announceWinner();
					}
					if (_.every(winnerPattern3, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player3 wins, 789")
						announceWinner();
					}
					if (_.every(winnerPattern4, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player4 wins, 159")
						announceWinner();
					}
					if (_.every(winnerPattern5, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player5 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern6, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player5 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern7, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player5 wins, 375")
						announceWinner();
					}
					if (_.every(winnerPattern8, _.partial(_.contains, newgame[data.room]["user2Array"]))) {
						console.log("player5 wins, 375")
						announceWinner();
					}

					console.log(newgame)

				} else {
					console.log("not that player's turn")
				}
			}
	})

	socket.on("disconnect", function () {
		userCount-=1;
		if (userCount %2 === 0) {
			roomCount-=1;
		}
		newgame[room].users -=1
	})
}

exports.renderPage = renderPage;
exports.ticTac_io = ticTac_io;