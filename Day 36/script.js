var app = angular.module('numbersApp', []);

app.factory("NumberGenerator", function () {
	var Numbers = [];
	for (var i = 1; i < 1001; i++) {
		Numbers.push({number: i});
	}
	return Numbers;
})


app.controller("numberCtrl", function ($scope, NumberGenerator) {
	$scope.numbers = NumberGenerator;
	$scope.divisible = function (number) {
		var div = [];
		for (var i = 1; i < 1001; i++) {
			if (i % number === 0) {
				div.push({number: i, group: "div"})
				$scope.numbers = div;
			}
		}
	}
	$scope.reset = function() {
		$scope.numbers = NumberGenerator;
	}
})


app.directive("number", function() {
	return {
		restrict: "E",
		scope: {
			num: "@",
			func: "&"
		},
		template: '<div class="button" ng-click="func({num: num})">{{num}}</div>'
	}
})