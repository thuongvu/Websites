angular.module('app.controllers', [])
	.controller('preGameCtrl', ['$scope', 'PreGame', 'socket', function ($scope, PreGame, socket) {
		console.log('in preGameCtrl')
		$scope.preGame = {};
		$scope.joinRoom = function (obj) {
			if (($scope.preGame.name != "room") || ($scope.preGame.name != "Room")) {
				PreGame.joinRoom($scope.preGame)
			}
		}

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
		// $scope.gameRoom = Game.gameObj.room;

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
			// $scope.gameRoom.room = data.room;
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
			// if (data.correct) {
			// 	if (data.true === correct) {
			// 		$scope.correct = true;
			// 	}
			// }
			
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

			
				// function loop(x) {
				// 	if ((x > 10) && ($scope.correct === false)) {
				// 		Game.sendMessage("incorrect word", "lost")
				// 		return;
				// 	} else if ($scope.correct) {
				// 		return;
				// 	}
				// 	setTimeout(function() {
				// 		console.log(x)
				// 		loop(x+1)
				// 	}, 1000)
				// }
				// loop(0)



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




		// $scope.$watch('Game.gameObj', function(newVal, oldVal) {
		// 	// $scope.gameObj = Game.gameObj;
		// 	console.log(newVal)
		// 	console.log(oldVal)
		// 	console.log("$scope.gameObj from ctrller")
		// 	// console.log($scope.gameObj)
		// })
		// assign user


		// show which: draw/guess
		// $scope.showDraw = Game.gameObj.showDraw;
		// // $scope.showDraw = true;
		// $scope.showGuess = Game.gameObj.showGuess;

		// function showDraw() {
		// 	console.log("showDraw invoked")
		// 	console.log($scope.gameObj)
		// 	$scope.showDraw = Game.gameObj.showDraw;
		// 	$scope.showGuess = Game.gameObj.showGuess;
		// 	// console.log($scope.showDraw)
		// 	// console.log($scope.showGuess)
		// }

		// $scope.$watch('showDraw', showDraw, true)
		// $scope.$watch('showGuess', showDraw, true)


		// $scope.showDraw = $scope.gameObj.showDraw;
		// $scope.showGuess = $scope.gameObj.showGuess;	
		// ------------ trying to get messages as a service BLAH--------------
		// $scope.receivedMessagesFromGame = {};
		// $scope.receivedMessagesFromGame.msg = {};
		// function addMessage (){
		// 	console.log("adding message")
		// 	console.log("receivedMessagesFromGame")
		// 	console.log($scope.receivedMessagesFromGame)
		// 	var message = $scope.receivedMessagesFromGame.msg.message;
		// 	var username = $scope.receivedMessagesFromGame.msg.username;
		// 	$scope.chatroom.receivedMessages.unshift({"username": username, "message": message})
		// 	var currentMessage = '';
		// }

		// $scope.receivedMessagesFromGame = Game.messagesObj;
		// $scope.$watch('receivedMessagesFromGame', addMessage, true)
	
	}])