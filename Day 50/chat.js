var app = angular.module('app', []);

app.factory('parseService', function() {
	Parse.initialize("dnKjVU31cDHmmf5Pmt9VCgOciZ7WYJ1Ju5uJeqWG", "Ab89OfBTWs9sxOjmcMXtNxcpQ8MZnvkaRGwb8BPI");
	var Chat = Parse.Object.extend("Chat");

	var parseService = {
		addChatMessage: function(nameInput, messageInput) {
			var object = new Chat();
			object.set({name: nameInput, message: messageInput})
			object.save();
		},
		getChatMessage: function(callback) {
			var query = new Parse.Query(Chat);
			query.limit(9).descending("createdAt");
			query.find({
				success: function (results) {
					callback(results);
				},
				error: function (error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			})
		}
	}	
	return parseService;
});

app.controller('mainCtrl', function ($scope, parseService) {
	$scope.messageList = [];
	$scope.setName = function () {
		$scope.showState = !$scope.showState;
	}
	$scope.addChatMessage = function () {
		parseService.addChatMessage($scope.name, $scope.message);
		$scope.message = '';
		$scope.getChatMessage();
	};
	$scope.getChatMessage = function () {
		parseService.getChatMessage(function(results) {
			$scope.$apply(function() {
				var tempArray = results;
				$scope.messageList = tempArray.reverse();
			})
		})
	};
	$scope.getChatMessage()
	setInterval(function() {
		$scope.getChatMessage();
	}, 3000)
	

})