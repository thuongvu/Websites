angular.module('app.services', [])
	.factory('socket', function ($rootScope) {
		var serverBaseUrl = document.domain;
		var socket = io.connect(serverBaseUrl + '/pictionary/game');
		return {
			on: function (eventName, callback) {
				socket.on(eventName, function () {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function() {
						if(callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		};
	})
	.factory('PreGame', function ($location) {
		var gameRoomObj = {};
		return {
			joinRoom: function(room) {
				gameRoomObj = room;
				$location.path('/game');
			},
			gameRoomObj: gameRoomObj
		}
	})
	.factory('Game', function (socket, $location) {
		var gameObj = {};
		var messagesObj = {};
		gameObj.inSession = 0;

		socket.on("ClientPlayerInfo", function(data) {
			gameObj.id = data.id
			console.log(gameObj.id)
		})

		// socket.on("chatRoomMessage", function(data) {
		// 	console.log(data)
		// })

		socket.on("startGame", function(data) {
			gameObj.word = data.word;
			gameObj.inSession = data.inSession;
			// if (gameObj.id === data.currentDrawer) {
			// 	console.log("i am the current drawer")
			// 	gameObj.showDraw = true;
			// 	gameObj.showGuess = true;
			// } else {
			// 	console.log("i am the guessing!")
			// 	gameObj.showDraw = false;
			// 	gameObj.showGuess = true;
			// }
		})

		// socket.on("messageToClient", function(data) {
		// 	console.log(data)
		// 	messagesObj.msg.username = data.username;
		// 	messagesObj.msg.message = data.message;
		// })


		// temp vars for testing
		// username, room
		gameObj.room = "test";
		var number = Math.round(Math.random() * 100)
		gameObj.username = 'player' + number;


		return {
			joinRoom: function(room) {
				// gameObj.room = room;      // disabling for the sake of making it "test"
				// $location.path('/game');
				if (gameObj.id && gameObj.username && gameObj.room) {
					socket.emit("joinRoom", {id: gameObj.id, username: gameObj.username, room: gameObj.room})
				}
			},
			setUsername: function(username) {
				gameObj.username = username;
			},
			sendMessage: function(message) {
				if (gameObj.username && message) {
					socket.emit("messageToServer", {username: gameObj.username, message: message, id: gameObj.id, room: gameObj.room})
				}
			},
			requestStartGame: function(inSession) {
				if (inSession === 0) {
					socket.emit("requestStartGame", {username: gameObj.username, id: gameObj.id, room: gameObj.room})
				} else {
					console.log("game is in session")
				}
			},
			resetDrawing: function() {
				socket.emit("reset", {username: gameObj.username, id: gameObj.id, room: gameObj.room})
			},
			gameObj: gameObj,
			messagesObj: messagesObj
		}
	})