var app = angular.module('app', ['ui.bootstrap']);

app.factory("ParseService", function () {
	Parse.initialize("LouEismg4sEvnKcu8KPNv29Cpk07Z4NUOViKAlkj", "jyOp9Dzjt6O0dcHFskGbUX6K34VmGFIVLGTFMUhE");
	var Secret = Parse.Object.extend("Secret");

	var ParseService = {
		addSecret: function (messageInput) {
			var object = new Secret();
			object.save({message: messageInput});
		},
		getSecret: function(callback) {
			var query = new Parse.Query(Secret);
			query.skip(1).limit(1).descending("createdAt");
			query.find({
				success: function(results) {
					callback(results);
					console.log(results);
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			})
		}
	}
	return ParseService;
})

app.controller('mainCtrl', function ($scope, ParseService) {
	$scope.secretsList = [];
	$scope.getSecret = function () {
		ParseService.getSecret(function(results) {
			$scope.$apply(function() {
				$scope.secretsList = results;
			})
		})
	}
	$scope.addSecret = function () {
		ParseService.addSecret($scope.secretMessage);
		$scope.secretMessage = '';
		$scope.getSecret();
		$scope.showForm = !$scope.showForm;
	}
	// forgive me for manipulating the dom in the controller
	$scope.toolTip = "<h5>From <em>In the Mood For Love</em>: <br><br><br> Chow Mo-wan: In the old days, if someone had a secret they didn't want to share... you know what they did?<br><br>Ah Ping: Have no idea.<br><br>Chow Mo-wan: They went up a mountain, found a tree, carved a hole in it, and whispered the secret into the hole. Then they covered it with mud. And leave the secret there forever.<br><br>Ah Ping: What a pain! I'\d just go to get laid.<br><br>Chow Mo-wan: Not everyone'\s like you.</h5>"
});





