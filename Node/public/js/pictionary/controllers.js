angular.module('app.controllers', [])
	.controller('preGameCtrl', ['$scope', 'PreGame', function ($scope, PreGame) {
		console.log('in preGameCtrl')
		$scope.room = {};
		// $scope.joinRoom = function (room) {
		// 	PreGame.joinRoom($scope.room.name)
		// }



	}])
	.controller('mainCtrl', ['$scope', 'socket', 'Game', '$timeout', function ($scope, socket, Game, $timeout) {
		console.log('in mainCtrl')
		$scope.status = {};
		$scope.inSession;
		$scope.gameObj = Game.gameObj;
		// $scope.$watch('Game.gameObj', function(newVal, oldVal) {
		// 	// $scope.gameObj = Game.gameObj;
		// 	console.log(newVal)
		// 	console.log(oldVal)
		// 	console.log("$scope.gameObj from ctrller")
		// 	// console.log($scope.gameObj)
		// })
		// assign user
		$scope.user = {}; // just temporarily for the sake of assigning it here, want to move it to the other ctrller on the other page on PreGame
		$scope.setUsername = function() {
			Game.setUsername($scope.user.name)
		}
		// chatroom logic
		$scope.chatroom = {};
		$scope.chatroom.receivedMessages = [{"username": 'blah', message: "hello world yo", color: '#000'}];
		$scope.chatroom.message;
		$scope.sendMessage = function() {
			Game.sendMessage($scope.chatroom.message)
			$scope.chatroom.message = '';
		}
		// more chatroom logic
		// $scope.color = {};
		socket.on("messageToClient", function(data) {
			console.log(data)
			// $scope.color.current = data.color;
			var username = data.username;
			var message = data.message;
			$scope.inSession = data.inSession;

			$scope.chatroom.receivedMessages.unshift({"username": username, "message" : message})
			if (data.currentDrawer) {
				console.log($scope.gameObj.id)
				if ($scope.gameObj.id === data.currentDrawer) {
					console.log("i am the current drawer")
					$scope.showDraw = true;
					$scope.showGuess = false;
					$scope.currentWord = 'Draw: ' + data.word;
				} else {
					console.log("i am the guessing!")
					$scope.showDraw = false;
					$scope.showGuess = true;
					$scope.currentWord = 'Guess the word!';
				}
			}
			
		})
		// request startgame
		$scope.requestStartGame = function () {
			Game.requestStartGame($scope.inSession)
		}
		// joinroom
		$scope.joinRoom = function() {
			Game.joinRoom();
		}
		$timeout(function() {
			$scope.joinRoom()
		}, 500)
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


		socket.on("startGame", function(data) {
			console.log(data)
				if ($scope.gameObj.id === data.currentDrawer) {
					console.log("i am the current drawer")
					$scope.showDraw = true;
					$scope.showGuess = false;
					$scope.currentWord = 'Draw: ' + data.word;
					
					
				} else {
					console.log("i am the guessing!")
					$scope.showDraw = false;
					$scope.showGuess = true;
					$scope.currentWord = 'Guess the word!';
				}
			})



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