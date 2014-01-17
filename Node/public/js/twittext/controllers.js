angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$window', '$http', '$cookieStore', 'Auth', function ($scope, $window, $http, $cookieStore, Auth) {

		// COOKIES
		$scope.username = Auth.username;
		$scope.role = Auth.role;
		$scope.hashtags = Auth.hashtags;
		console.log($scope.username)
		console.log($scope.role)
		console.log($scope.hashtags)


		$scope.showLogOut = false;

		$scope.loginOauth = function() {
		    $window.location.href = '/twittext/twitter/callback';
		}

		$scope.logout = function () {
			Auth.logout(function() {
				console.log("logged out");
			}, function() {
				$rootScope.error = "failed to logout"
			});
		}

		if (Auth.role > 0) {
			// $scope.hashtagsTest = ["ColbyFire", "AC360", "subpoenas", "Christie", "bridge", "AC360", "Benghazi", "AC360", "KendrickJohnson", "AC360", "AaronHernandez", "NFL", "AC360", "ICYMI", "SitRoom", "Sundance", "fireplaces", "TetsuoAndYouth", "TetsuoSeason", "TY"]
			// var hashtags = ["ColbyFire", "AC360", "subpoenas", "Christie", "bridge", "AC360", "Benghazi", "AC360", "KendrickJohnson", "AC360", "AaronHernandez", "NFL", "AC360", "ICYMI", "SitRoom", "Sundance", "fireplaces", "TetsuoAndYouth", "TetsuoSeason", "TY"]
			$scope.showLogOut = true;
			// $scope.hashtags = hashtags;
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
			}
			console.log($scope.hashtagArr)
		}


		


		
	}])


