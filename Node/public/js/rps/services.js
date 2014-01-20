angular.module('app.services', [])
	.factory('socket', function ($rootScope) {
		var serverBaseUrl = document.domain;
		var socket = io.connect(serverBaseUrl + '/rps');
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
	.factory('Game', function (socket) {
		var gameRoom; 
		var gameId;
		socket.on("connection", function(data) {
			console.log("SAY HELLO TO MY LIL FRIEND " + data.id)
			gameId = data.id;
		})
		
		return {
			joinRoom: function(room) {
				gameRoom = room;
				console.log(room + " from service")
				console.log(gameId + " from service")
				socket.emit("joinRoom", {id: gameId, roomName: room})
			},
			returnData: function() {
				console.log("from returnData function from Game service")
				console.log(gameId)
				console.log(gameRoom)
			},
			choose: function(strategy) {
				console.log("strategy from the Game service says strategy is... ")
				console.log(strategy)
				socket.emit("choose", {id: gameId, roomName: gameRoom, strategy: strategy})
			}
			// ,
			// DataRoom,
			// DataId,
		}
	});