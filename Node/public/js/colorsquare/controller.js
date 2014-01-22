angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		$scope.colors = {};
		$scope.colorContainer = [];
		$scope.colors.current;
		// setTimeout(function() {
		// 	$scope.colors.two = $scope.colors.three;
		// 	// $scope.colors.three = $scope.colors.two;
		// 	console.log("it happened")
		// }, 5000)
		// for (var i = 0; i < colorOnLoad.length; i++ ){
		// 	$scope.colorContainer.unshift(colorOnLoad[i].color)
		// 	console.log(colorOnLoad[i].color)
		// }
		// $scope.play();

		$scope.add = function() {
			$scope.colorContainer.unshift($scope.colors.toAdd);
			console.log("$scope.colorContainer");
			console.log($scope.colorContainer);
			$http.post('/lightshow', {color : $scope.colors.toAdd}).success(function() {
				console.log("post success")
			})
		}

		$scope.play = function() {
			for (var i = 0; i < $scope.colorContainer.length; i++) {
				// $scope.colors.current = $scope.colorContainer[i];

				$timeout(function(x) {
					return function() {
						var current = x;
						$scope.colors.current = x;
						console.log("shit should happen now");
						console.log($scope.colors.current);
					}
				} ($scope.colorContainer[i]), 2000 * i)
			}
		}

		for (var i = 0; i < colorOnLoad.length; i++ ){
			$scope.colorContainer.unshift(colorOnLoad[i].color)
			console.log(colorOnLoad[i].color)
		}
		$scope.play();

	}])