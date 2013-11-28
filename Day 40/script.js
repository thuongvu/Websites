var app = angular.module("starsApp", []);

app.controller("starsCtrl", function ($scope) {
	$scope.starsContainer = [];
	for (var i = 0; i < 84; i++) {
		$scope.starsContainer.push(i);
	};

	$scope.randomNumber = Math.floor(Math.random() * 20);

	$scope.counter = 0;
	$scope.count = function() {
		$scope.counter++;
	}
	$scope.starState = true;
	$scope.$watch(function() {
		if ($scope.counter == $scope.randomNumber) {
			$scope.messageState = true;
			$scope.starState = false;
		}
	});
})
app.directive("star", function(){
	return {
		restrict: "E",
		template: '<span class="star" ng-click="count()">' + '<img src="blueStar.jpg" width="100" /></span>',
		link: function(scope, element) {
			element.bind("click", function() {
				element.addClass('opacity1')
			});

		},
		controller: function($scope) {
			$scope.toggle = function() {
				console.log("toggled")
				$scope.messageState = !$scope.messageState;
			}
			$scope.messageState = false;

		}
	}
})