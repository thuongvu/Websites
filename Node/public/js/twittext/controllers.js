angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$window', '$http', '$cookieStore', 'Auth', function ($scope, $window, $http, $cookieStore, Auth) {

		// COOKIES
		$scope.username = Auth.username;
		$scope.role = Auth.role;
		$scope.hashtags = Auth.hashtags;

		// VIEW
		$scope.showLogOut = false;

		// LOGIN
		$scope.loginOauth = function() {
		    $window.location.href = '/twittext/twitter/callback';
		}

		// LOGOUT uses Auth service
		$scope.logout = function () {
			Auth.logout(function() {
				console.log("logged out");
			}, function() {
				$rootScope.error = "failed to logout"
			});
		}

		// LOGIC FOR SHOWING TWEETS
		if (Auth.role > 0) {
			$scope.showLogOut = true;
			$scope.hashtagContainer = {};
			$scope.hashtagArr = [];

			for (var i = 0; i < $scope.hashtags.length; i++) {
				var item = $scope.hashtags[i];
				if ($scope.hashtagContainer[item] == null) {
					$scope.hashtagContainer[item] = 1;
				} else {
					$scope.hashtagContainer[item]++;
				}
			}
			for (key in $scope.hashtagContainer) {
				var tempObj = {};
				tempObj["key"] = key;
				tempObj["value"] = $scope.hashtagContainer[key]
				$scope.hashtagArr.push(tempObj)
				console.log("$scope.hashtags")
				console.log($scope.hashtags)
			}
		}
	}])


