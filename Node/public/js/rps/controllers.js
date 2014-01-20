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
			// emitting to server from Game service
			Game.choose(strategy)
		}
	
		$scope.joinRoom = function() {
			Game.joinRoom($scope.room.name)
			$location.path('/game/')
		}

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

		socket.on("otherPlayerDisplay", function(data) {
			console.log(data)
			$scope.display.otherPlayerChoice = "the other player chose " + data;
			if (data === 'rock') {
				$scope.show.otherRock = true;
				$scope.show.otherPaper = false;
				$scope.show.otherScissors = false;
			} else if (data === 'paper') {
				$scope.show.otherRock = false;
				$scope.show.otherPaper = true;
				$scope.show.otherScissors = false;
			} else if (data === 'scissors') {
				$scope.show.otherRock = false;
				$scope.show.otherPaper = false;
				$scope.show.otherScissors = true;
			}
		})

	}])