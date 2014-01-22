angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
		$scope.colors = {};
		$scope.colorContainer = [];
		$scope.colors.current;
		$scope.colors.count;
		$scope.playShow = false;

		$scope.add = function(success,error) {
			$scope.colorContainer.unshift($scope.colors.toAdd);
			$http.post('/lights', {color : $scope.colors.toAdd}).success(function(data) {
				$scope.colors.count = data + " colors in total.";
			})
			$scope.playShow = true;
		}

		$scope.play = function() {
			for (var i = 0; i < $scope.colorContainer.length; i++) {

				$timeout(function(x) {
					return function() {
						var current = x;
						$scope.colors.current = x;
					}
				} ($scope.colorContainer[i]), 4000 * i)
			}
		}

		for (var i = 0; i < colorOnLoad.length; i++ ){
			$scope.colorContainer.unshift(colorOnLoad[i].color)
		}
		$scope.play();

	}])