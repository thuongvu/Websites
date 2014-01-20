angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
		$scope.room = {};
		$scope.user = {};
		$scope.display = {};
		$scope.show = {};
		$scope.show = function(strategy) {
			$scope.show[strategy] = true;

		}
		// $scope.show.paper = true;
		$scope.choose = function(strategy) {
			// logic for showing which strategy image
			var strategies = ["paper", "scissors", "rock"];
			for (var i = 0; i < strategies.length; i++) {
				if (strategy === strategies[i]) {
					$scope.show[strategy] = true;
				}  else {
					$scope.show[strategies[i]] = false;
				}
			} 
			
			// logic for emitting strategy to server
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

		socket.on("chooseWait", function(data) {
			console.log(data)
			$scope.display.status = data;
		})

		socket.on("bothChosen", function(data) {
			console.log(data)
			$scope.display.status = data;
		})

		socket.on("waitForNewPlayer", function(data) {
			console.log(data)
			$scope.display.status = data;
		})

	}])