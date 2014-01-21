angular.module('app.services', [])
	.factory('socket', function ($rootScope) {
		var serverBaseUrl = document.domain;
		var socket = io.connect(serverBaseUrl + '/rps/game');
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
	.factory('Game', function (socket, $location) {
		var gameObj = {};
		
		socket.on("connection", function(data) {
			gameObj.id = data.id;
		})

		socket.on("playerNumber", function(data) {
			gameObj.playerNumber = data;
		})

		return {
			joinRoom: function(room) {
				gameObj.roomName = room;
				socket.emit("joinRoom", {id: gameObj.id, roomName: gameObj.roomName, playerNumber: gameObj.playerNumber})
			},
			choose: function(strategy) {
				if (gameObj.id && gameObj.roomName && strategy) {
					socket.emit("choose", {id: gameObj.id, roomName: gameObj.roomName, strategy: strategy, playerNumber: gameObj.playerNumber})
				}
			},
			returnRoom: function() {
				return gameRoom;
			}
		}
	})
	.factory('preGame', function ($location) {
		var gameRoomObj = {};
		return {
			joinRoom: function(room) {
				gameRoomObj.room = room;
				$location.path('/game')
			},
			gameRoomObj: gameRoomObj
		}
	})