angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$window', '$http', '$timeout', function ($scope, $window, $http, $timeout) {

		$scope.showLogOut = false;

		$scope.loginOauth = function() {
		    $window.location.href = '/twittype/twitter/callback';
		}
		
		$scope.logout = function (success, error) {
			$http.post('/twittype/logout').success(function() {
				console.log("logged out")
			})
		}

		if (tweets.length > 1) {
			$scope.showLogOut = true;
			var tweetsList;
			function display (x) {
				$scope.tweetsDisplay = x;
			}
			$scope.tweetsDisplay = {};
			$scope.tweetsDisplay.words = []

			for (var i = 0; i < tweets.length; i++) {
				tweetsList+= tweets[i]
			}
			var split = tweetsList.split(" ");

			for (var i = 0; i < split.length; i++) {
			   $timeout(function(x) {
			     	return function() {
			     		var words = x;
			     		$scope.tweetsDisplay.words = words;
			   	};
			   } (split[i]), 100*i);
			}
		}
		
	}])