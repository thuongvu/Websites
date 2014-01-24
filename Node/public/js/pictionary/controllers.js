angular.module('app.controllers', [])
	.controller('preGameCtrl', ['$scope', 'PreGame', 'socket', function ($scope, PreGame, socket) {
		console.log('in preGameCtrl')
		$scope.preGame = {};
		$scope.joinRoom = function (obj) {
			if (($scope.preGame.name != "room") || ($scope.preGame.name != "Room")) {
				PreGame.joinRoom($scope.preGame)
			}
		}
		socket.on("roomsList", function(data) {
			$scope.roomsList = data.roomsList;
			
		})
		$scope.draw = {};
		$scope.draw.color = '#000';
		$scope.draw.size = 5;
		$scope.draw.opacity = 0.7;

	}])
	.controller('mainCtrl', ['$scope', 'socket', 'Game', '$timeout', 'PreGame', function ($scope, socket, Game, $timeout, PreGame) {
		console.log('in mainCtrl')
		$scope.preGameObj = PreGame.preGameObj;
		$scope.gameRoom = $scope.preGameObj.room;
		$scope.counter = 0;
		$scope.correct = false;

		$scope.joinRoom = function() {
			Game.joinRoom($scope.preGameObj)
		}
		$timeout(function() {
			$scope.joinRoom();
		}, 500)
		

		$scope.draw = {};
		$scope.draw.color = '#000';
		$scope.draw.size = 5;
		$scope.draw.opacity = 0.7;

		$scope.usersInRoom = [];
		$scope.status = {};
		$scope.inSession;
		$scope.hideInSession = false;
		$scope.gameObj = Game.gameObj;

		$scope.user = {}; // just temporarily for the sake of assigning it here, want to move it to the other ctrller on the other page on PreGame
		$scope.setUsername = function() {
			Game.setUsername($scope.user.name)
		}
		// chatroom logic
		$scope.chatroom = {};
		$scope.chatroom.receivedMessages = [];
		$scope.chatroom.message;
		$scope.sendMessage = function() {
			Game.sendMessage($scope.chatroom.message)
			$scope.chatroom.message = '';
		}

		socket.on("messageToClient", function(data) {
			console.log(data)
			var username = data.username;
			var message = data.message;
			$scope.inSession = data.inSession;
			

			$scope.chatroom.receivedMessages.unshift({"username": username, "message" : message})
			if (data.currentDrawer) {
				if ($scope.gameObj.id === data.currentDrawer) {
					console.log("i am the current drawer")
					$scope.showDraw = true;
					$scope.showGuess = false;
					$scope.currentWord = 'Draw: ' + data.word;
					$scope.round = "Round " + data.round;
				} else {
					console.log("i am the guessing!")
					$scope.showDraw = false;
					$scope.showGuess = true;
					$scope.currentWord = 'Guess the word!';
					$scope.round = "Round " + data.round;
				}
			}
			
			if (data.userJoined) {
				var userJoined = data.userJoined;
				if (typeof userJoined === "string") {
					$scope.usersInRoom.push({name: data.userJoined});
				} else {
					for (var j = 0; j < data.userJoined.length; j++) {
						$scope.usersInRoom.push({name: data.userJoined[j]});
					}
				}
			}
			if (data.userLeft) {
				for (var i = 0; i < $scope.usersInRoom.length; i++) {
					if (data.userLeft === $scope.usersInRoom[i].name) {
						$scope.usersInRoom.splice(i,1)
					}
				}
			}
			if (data.currentDrawer) {
				if ((data.currentDrawer != $scope.gameObj.id) && (data.inSession === 1)) {
					console.log("i am the guessing!")
					$scope.showDraw = false;
					$scope.showGuess = true;
					$scope.currentWord = 'Guess the word!';
					$scope.round = "Round " + data.round;
				}
			}
			if (data.inSession === 1) {
				$scope.hideInSession = true;
				$scope.round = "Round " + data.round;
			} else if (data.inSession === 0) {
				$scope.hideInSession = false;
				$scope.round = "Round " + data.round;
				$scope.currentWord = ''
			} else {
				$scope.hideInSession = false;
				$scope.round = "Round " + data.round;
				$scope.currentWord = ''
			}
			if (data.round === 0) {
				$scope.hideInSession = false;
				$scope.showDraw = false;
				$scope.hideInSession = false;
			}
		})
		// request startgame
		$scope.requestStartGame = function () {
			Game.requestStartGame($scope.inSession)
		}

		socket.on("startGame", function(data) {
				if ($scope.gameObj.id === data.currentDrawer) {
					console.log("i am the current drawer")
					$scope.showDraw = true;
					$scope.showGuess = false;
					$scope.currentWord = 'Draw: ' + data.word;
					$scope.round = "Round " + data.round;
					$scope.hideInSession = true;
				} else {
					console.log("i am the guessing!")
					$scope.showDraw = false;
					$scope.showGuess = true;
					$scope.currentWord = 'Guess the word!';
					$scope.round = "Round " + data.round;
					$scope.hideInSession = true;
				}
				$scope.allCorrect = data.allCorrect;
				function allCorrectValid() {
					if ($scope.allCorrect === true) {
						console.log("everyone has it correct!")
						console.log($scope.allCorrect);
					}
				}
				$scope.$watch('allCorrect', allCorrectValid, true)

			})

		$scope.resetDrawing = function() {
			Game.resetDrawing()
		}
		$scope.brushOrEraser = function (option) {
			if (option === 'brush') {
				if ($scope.draw.pastColor) {
					$scope.draw.color = $scope.draw.pastColor;
				}
			} else if (option === 'eraser') {
				$scope.draw.pastColor = $scope.draw.color;
				$scope.draw.color = '#fff';
			}
		}

	}])