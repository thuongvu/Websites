angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', '$location', 'Game', '$timeout', 'preGame', function ($scope, socket, $location, Game, $timeout, preGame) {
		console.log("in mainCtrl now")
		$scope.gameRoomObj = preGame.gameRoomObj;
		$scope.display = {};
		$scope.show = {};

		setTimeout(function() {
				Game.joinRoom(preGame.gameRoomObj.room)
		}, 500)

		$scope.show = function(strategy) {
			$scope.show[strategy] = true;
		}

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

		socket.on("otherPlayerDisplay", function(data) {
			console.log(data)
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

			$timeout(function() {
				$scope.display.otherPlayerChoice = "";
				$scope.show.paper = false;
				$scope.show.scissors = false;
				$scope.show.rock = false;
				$scope.show.otherRock = false;
				$scope.show.otherPaper = false;
				$scope.show.otherScissors = false;
				$scope.display.status = "Choose another to play again!"
			}, 3000)
		})

	}])
	.controller('preGameCtrl', ['$scope', 'preGame', function ($scope, preGame) {
		console.log("in test ctrl")
		$scope.room = {};
		$scope.joinRoom = function() {
			var room = $scope.room.name
			preGame.joinRoom(room)
		}
	}])





