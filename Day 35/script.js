var app = angular.module('superApp', [])

app.directive("enter", function() {
	return function($scope, element, attrs) {
		element.bind("mouseenter", function() {
			element.addClass(attrs.enter)
		})
	}
})

app.controller("superCtrl", function($scope) {
	$scope.superpowers = [];

	$scope.makeFly = function() {
		$scope.superpowers.push("fly");
		$scope.superpower = $scope.superpowers.join(" ");
	}
	$scope.makeSize = function() {
		$scope.superpowers.push("size");
		$scope.superpower = $scope.superpowers.join(" ");
	}
	$scope.makeSpeed = function() {
		$scope.superpowers.push("speed");
		$scope.superpower = $scope.superpowers.join(" ");
	}
})