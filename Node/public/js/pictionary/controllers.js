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
		$scope.gameObj = Game.gameObj;
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
		socket.on("messageToClient", function(data) {
			console.log(data)
			var username = data.username;
			var message = data.message;
			$scope.chatroom.receivedMessages.unshift({"username": username, "message" : message})
		})
		// request startgame
		$scope.requestStartGame = function () {
			Game.requestStartGame()
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
		$scope.showDraw = true;
		$scope.showGuess = Game.gameObj.showGuess;




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