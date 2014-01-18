angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		$scope.displayWords;
		$scope.goals = [];
		$scope.data = data;
		for (var j = 0; j < $scope.data.length; j++) {
			$scope.goals.push($scope.data[j].message)
		}

		for (var i = 0; i < $scope.goals.length; i++) {
		   $timeout(function(x) {
		     	return function() {
		     		var words = x;
		     		$scope.displayWords = words;
		   	};
		   } ($scope.goals[i]), 1000*i);
		}
		
		function loop(x) {
			// if (x >=10)
			// 	return;

			setTimeout(function() {
				for (var i = 0; i < $scope.goals.length; i++) {
				   $timeout(function(x) {
				     	return function() {
				     		var words = x;
				     		$scope.displayWords = words;
				   	};
				   } ($scope.goals[i]), 1000*i);
				}
				console.log(x)
				loop(x + 1)
			}, 1000 * $scope.goals.length)
			
		}
		loop(0)

		$scope.send = function() {
			$http.post('/thisyear', { 'message': $scope.message}).success(function(data) {
				$scope.message = '';
				$scope.goals = [];
				for (var k = 0; k < data.data.length; k++) {
						$scope.goals.push(data.data[k].message)
					} 
			})
		}



	}])


