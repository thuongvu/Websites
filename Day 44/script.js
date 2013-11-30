var app = angular.module('app', []);

app.controller('mainCtrl', function ($scope, $timeout) {
	$scope.showIncorrect = false;
	$scope.showCorrect = false;
	$scope.showTurkey = false;
	$scope.showPumpkin = false;
	$scope.showCorn = false;
	$scope.showMashed = false;
	$scope.showMore = false;

	$scope.dinner = {
		"turkey": 0,
		"pumpkin": 0,
		"corn": 0,
		"mashed": 0,
	}
	$scope.addFood = function () {
		if ($scope.dinner.turkey === 1 ) {
			$scope.showTurkey = true;
		} else {
			$scope.showTurkey = false;
		}
		if ($scope.dinner.pumpkin === 1 ) {
			$scope.showPumpkin = true;
		} else {
			$scope.showPumpkin = false;
		}
		if ($scope.dinner.corn === 1 ) {
			$scope.showCorn = true;
		} else {
			$scope.showCorn = false;
		}
		if ($scope.dinner.mashed === 1 ) {
			$scope.showMashed = true;
		} else {
			$scope.showMashed = false;
		}
	}

	$scope.$watchCollection('dinner', $scope.addFood);

	$scope.preference = {
		"turkey": Math.round(Math.random() * 1),
		"pumpkin": Math.round(Math.random() * 1),
		"corn": Math.round(Math.random() * 1),
		"mashed": Math.round(Math.random() * 1),
	};

	$scope.cooked = {};

	$scope.reset = function () {
		$scope.dinner = {
			"turkey": 0,
			"pumpkin": 0,
			"corn": 0,
			"mashed": 0,
		};
		$scope.cooked = {
			"turkey": 0,
			"pumpkin": 0,
			"corn": 0,
			"mashed": 0,
		};
	}

	$scope.update = function (dinner) {
		$scope.cooked = angular.copy(dinner);
		if ((($scope.preference.turkey === 1) && ($scope.cooked.turkey === 1)) || (($scope.preference.pumpkin === 1) && ($scope.cooked.pumpkin === 1)) || (($scope.preference.corn === 1) && ($scope.cooked.corn === 1)) || (($scope.preference.mashed === 1) && ($scope.cooked.mashed === 1))) {
			$scope.showMore = true;
			$timeout(function() {
			    $scope.showMore = false;
			  }, 2500);
		} 
		if ($scope.cooked.turkey ==! $scope.preference.turkey || $scope.cooked.pumpkin ==! $scope.preference.pumpkin || $scope.cooked.corn ==! $scope.preference.corn || $scope.cooked.mashed ==! $scope.preference.mashed )  {
			$scope.showIncorrect = true;
			$timeout(function() {
			    $scope.showIncorrect = false;
			  }, 2500);
			$scope.reset();
		}
		if ($scope.cooked.turkey === $scope.preference.turkey && $scope.cooked.pumpkin === $scope.preference.pumpkin && $scope.cooked.corn === $scope.preference.corn && $scope.cooked.mashed === $scope.preference.mashed) {
			$scope.showMore = false;
			 $scope.showIncorrect = false;
			$scope.showCorrect = true;
		}  

	}

})