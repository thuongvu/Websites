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
	.factory('PreGame', function ($location, socket) {
		var preGameObj = {};
		socket.on("ClientPlayerInfo", function(data) {
			preGameObj.id = data.id
			console.log(preGameObj.id)
			console.log(data.roomsList)
		})

		return {
			joinRoom: function(obj) {
				preGameObj.room = obj.room;
				preGameObj.username = obj.username;
				$location.path('/game');
			},
			preGameObj: preGameObj
		}
	})
	.factory('Game', function (socket, $location) {
		var gameObj = {};
		var messagesObj = {};
		gameObj.inSession = 0;

		// socket.on("ClientPlayerInfo", function(data) {
		// 	gameObj.id = data.id
		// 	console.log(gameObj.id)
		// })

		socket.on("startGame", function(data) {
			gameObj.word = data.word;
			gameObj.inSession = data.inSession;
		})

		// gameObj.room = "test"; // disabling for sake of testing joiing manually
		var number = Math.round(Math.random() * 100)
		gameObj.username = 'player' + number;


		return {
			joinRoom: function(obj) {
				console.log(obj)
				gameObj.room = obj.room;
				gameObj.username = obj.username;
				gameObj.id = obj.id;

				console.log("gameObj.room");
				console.log("gameObj.username")
				console.log("gameObj.id")
				console.log(gameObj.room);	
				console.log(gameObj.username)
				console.log(gameObj.id)
				console.log("joinRoom in service")
				// gameObj.room = room;      // disabling for the sake of making it "test"
				// $location.path('/game');
				if (gameObj.id && gameObj.username && gameObj.room) {
					socket.emit("joinRoom", {id: gameObj.id, username: gameObj.username, room: gameObj.room})
				}
			},
			setUsername: function(username) {
				gameObj.username = username;
			},
			sendMessage: function(message, lost) {
				// if (gameObj.username && message && lost) {
				// 	console.log(lost)
				// 	socket.emit("messageToServer", {username: gameObj.username, message: message, id: gameObj.id, room: gameObj.room, lost: true})
				// } else
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