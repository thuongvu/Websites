var app = angular.module('app', ['LocalStorageModule']);

app.controller('mainCtrl', function ($scope, localStorageService) {

	$scope.list = []; //list is the array ng-model bound to the input field in the view
	$scope.storage = [];

	// if there is data from a previous session from the key "todo", set the data to $scope.storage
	if (localStorageService.get("todo")) {
		$scope.storage = localStorageService.get("todo");
	}

	$scope.clearList = function () { // clear data from localstorage
		localStorageService.clearAll();
		$scope.storage = [];
	}

	$scope.addItem = function () {
		// localStorageService.clearAll();
		$scope.storage.push($scope.list); // push the data from the input on $scope.list to $scope.storage array
		localStorageService.add("todo", $scope.storage); // add the key "todo" with the array $scope.storage to localstore
		$scope.list = []; // make $scope.list empty again for the view
	}

	$scope.removeItem = function (index) { // on the view, $scope.removeItem inputs the $index of the current iteration of ng-repeat.  here, we specify what we want it to do with the argument "index"
		var newArray = $scope.storage.slice(0, index); // in the $scope.storage array, slice from 0 to the index param, save it to newArray array
		var newArrayA = $scope.storage.slice(index+1, $scope.storage.length); // in the $scope.storage array, slice from the index + 1 more (as to not include the index), to the entire length of $scope.storage, save it to newArrayA array
		var newArrayB = newArray.concat(newArrayA); // concat newArrayA to newArray to form an array called newArrayB
		$scope.storage = newArrayB; // set $scope.storage to newArrayB, and voila, $scope.storage no longer contains that element
		localStorageService.clearAll(); // clear localstorage
		localStorageService.add("todo", $scope.storage); //add the values of $scope.storage to the key todo in localstorage
	}


})