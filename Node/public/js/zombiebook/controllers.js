angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
		// oauth login
		$scope.loginOauth = function() {
		    $window.location.href = '/zombiebook/facebook/callback',
		}
		// };
		// logout
		$scope.logout = function (success, error) {
			$http.post('/zombiebook/logout').success(function() {
				console.log("logged out")
			})
		}
		// logic to see friends on the homepage
		if (friends.length > 3) {
			$scope.friendRole = {};
			$scope.tempObj = {};
			$scope.list = [];
			$scope.roles = ["First one to die", "Minion", "Zombie in hiding", "Scapegoat", "Humanitarian", "The one who gets bitten", "Bait", "The hero", "Scavenger", "Zombie Killer"];
			$scope.friends = friends;
			for (var i = 0; i < $scope.friends.length; i++) {
				var friend = $scope.friends[i];
				var role = $scope.roles[i];
				$scope.tempObj = {name: friend, role: role}
				$scope.list.push($scope.tempObj);
			}
		}
		
	}])
