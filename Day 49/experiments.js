var app = angular.module('app', ['ngResource']);



app.factory("ParseService", function ($resource) {
	Parse.initialize("LouEismg4sEvnKcu8KPNv29Cpk07Z4NUOViKAlkj", "jyOp9Dzjt6O0dcHFskGbUX6K34VmGFIVLGTFMUhE");
	var Secret = Parse.Object.extend("Secret");

	var ParseService = {
		addSecret: function (messageInput) {
			var object = new Secret();
			object.save({message: messageInput});
		},
		getSecret: function(callback) {
			var query = new Parse.Query(Secret);
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
})

app.controller("mainCtrl", function ($scope, ParseService) {
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
	}

}





