angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
		$scope.room = {};
		$scope.user = {};
		$scope.choose = function(strategy) {
			console.log(strategy)
			socket.emit("choose", {id: $scope.user.id, roomName: $scope.room.name, strategy: strategy})
		}
		$scope.joinRoom = function() {
			console.log($scope.room.name)
			socket.emit("joinRoom", {id: $scope.user.id, roomName: $scope.room.name})
		}
		socket.on("connection", function (data) {
			console.log(data.id)
			$scope.user.id = data.id
			console.log($scope.user)
		})

	}])