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
		var gameRoom; 
		var gameId;
		var playerNumber;
		socket.on("connection", function(data) {
			gameId = data.id;
			console.log("gameId is " + gameId)
		})

		socket.on("playerNumber", function(data) {
			playerNumber = data;
		})

		
		return {
			joinRoom: function(room, callback) {
				gameRoom = room;
				socket.emit("joinRoom", {id: gameId, roomName: room, playerNumber: playerNumber})
				console.log("emitting joining this room")
				// $location.path('/game/')
				// return gameRoom;
				callback(gameRoom)
			},
			returnData: function() {
				console.log("from returnData function from Game service")
				console.log(gameId)
				console.log(gameRoom)
			},
			choose: function(strategy) {
				if (gameId && gameRoom && strategy) {
					socket.emit("choose", {id: gameId, roomName: gameRoom, strategy: strategy, playerNumber: playerNumber})
				}
			},
			returnRoom: function() {
				return gameRoom;
			}
		}
	})
	.factory('preGame', function ($location) {
		var gameRoom;
		return {
			joinRoom: function(room) {
				gameRoom = room;
				$location.path('/game')
			},
			returnRoom: function (callback) {
				callback(gameRoom)
			}
		}
	})