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
		var gameObj.inSession = 0;

		socket.on("ClientPlayerInfo", function(data) {
			gameObj.id = data.id
			console.log(gameObj.id)
		})

		socket.on("chatRoomMessage", function(data) {
			console.log(data)
		})

		// socket.on("messageToClient", function(data) {
		// 	console.log(data)
		// 	messagesObj.msg.username = data.username;
		// 	messagesObj.msg.message = data.message;
		// })

		return {
			joinRoom: function(room) {
				gameObj.room = room;
				$location.path('/game');
			},
			setUsername: function(username) {
				gameObj.username = username;
			},
			sendMessage: function(message) {
				if (gameObj.username && message) {
					socket.emit("messageToServer", {username: gameObj.username, message: message, id: gameObj.id})
				}
			},
			requestStartGame: function() {
				socket.emit("requestStartGame", {username: gameObj.username, id: gameObj.id})
			}
			gameObj: gameObj,
			messagesObj: messagesObj
		}
	})