angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', '$location', 'Game', function ($scope, socket, $location, Game) {
		$scope.room = {};
		$scope.user = {};
		$scope.display = {};
		$scope.show = {};
		$scope.show = function(strategy) {
			$scope.show[strategy] = true;
		}

		$scope.check = function() {
			Game.returnData();
			// console.log("data.room")
			// console.log(data.room)
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
			console.log("strategy")
			console.log(strategy)
			console.log("$scope.room.name")
			console.log($scope.room.name)
			console.log("$scope.user.id")
			console.log($scope.user.id)
			Game.choose(strategy)
			// socket.emit("choose", {id: $scope.user.id, roomName: $scope.room.name, strategy: strategy})
		}
		// $scope.joinRoom = function() {
		// 	// console.log($scope.room.name)
		// 	console.log("$scope.user.id")
		// 	console.log($scope.user.id)
		// 	socket.emit("joinRoom", {id: $scope.user.id, roomName: $scope.room.name})
		// 	$location.path('/game/');
		// }
		$scope.joinRoom = function() {
			Game.joinRoom($scope.room.name, $scope.user.id)
			$location.path('/game/')
			// $scope.user.id = data.id;
			// $scope.room.name = data.room;
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