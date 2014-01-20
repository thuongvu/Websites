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
		return {
			joinRoom: function(room, id) {
				gameRoom = room;
				gameId = id;
				console.log(room + " from service")
				console.log(id + " from service")
				socket.emit("joinRoom", {id: id, roomName: room})
			},
			returnData: function() {
				console.log("from returnData function")
				console.log(gameId)
				console.log(gameRoom)
			},
			choose: function(strategy) {
				console.log("strategy in choose function of Game")
				console.log(strategy)
				socket.emit("choose", {id: gameId, roomName: gameRoom, strategy: strategy})
			}
			// ,
			// DataRoom,
			// DataId,
		}
	});