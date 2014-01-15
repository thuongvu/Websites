angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
		console.log("mainController up")
		$scope.loginOauth = function(success) {
		    $window.location.href = '/zombiebook/facebook/callback',
		    success = function() {
		    	console.log("lol this really worked?")
		    }
		};
		$scope.logout = function (success, error) {
			$http.post('/zombiebook/logout').success(function() {
				console.log("logged out")
			})
		}

		// var friends = <%- JSON.stringify(friends) %>
		console.log(friends + " is friends")

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
			// $scope.friendRole["friend"] =  $scope.roles[i];
			// $scope.list.push($scope.friendRole[friend])
		}
		console.log($scope.list)
		}

	}])
