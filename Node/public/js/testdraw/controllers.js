angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', 'd3', function ($scope, socket, d3) {
		$scope.data = [];
		$scope.room = {};
		$scope.room.name;
		$scope.joinRoom = function() {
			socket.emit("joinRoom", $scope.room.name)
			console.log("joined room" + $scope.room.name)
		}
		socket.on("joinRoomSuccess", function(data) {
			console.log(data)
			console.log("joined room")
		})
	}])