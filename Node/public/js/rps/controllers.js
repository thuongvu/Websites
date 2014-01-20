angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', '$location', 'Game', '$timeout', 'preGame', function ($scope, socket, $location, Game, $timeout, preGame) {
		console.log("in mainCtrl now")
		$scope.room = {};
		$scope.user = {};
		$scope.display = {};
		$scope.show = {};

		// $scope.roomie = "hello" // why doesnt this work?

		$scope.show = function(strategy) {
			$scope.show[strategy] = true;
		}

		$scope.check = function() {
			Game.returnData();
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
		setTimeout(function() {
			preGame.returnRoom(function(gameRoom) {
				console.log(gameRoom)
				Game.joinRoom(gameRoom, function() {
					console.log("joined a room emittttt done ")
				})
			})
		}, 500)
		
		$scope.joinRoom = function() {
			Game.joinRoom($scope.room.name,function(room) {
				// console.log("success return")
				console.log(room)
				// $scope.$apply($scope.display.room = room);
			})
			// var room = Game.returnRoom()
			// console.log(room)
			// console.log("that was room")
				// $scope.roomie = room.toString();
			// $location.path('/game/')
		}

		socket.on("chooseWait", function(data) {
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





