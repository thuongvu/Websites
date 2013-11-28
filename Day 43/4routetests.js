var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/",
		{
			templateUrl: "sorting.html",
			controller: "viewCtrl", 
		})
	.when("/gryffindor",
		{
			templateUrl: "gryffindor.html",
			controller: "griffCtrl", 
		})	
	.when("/slytherin",
		{
			templateUrl: "gryffindor.html",
			controller: "slythCtrl", 
		})
	.when("/hufflepuff",
		{
			templateUrl: "gryffindor.html",
			controller: "huffCtrl", 
		})
	.when("/ravenclaw",
		{
			templateUrl: "gryffindor.html",
			controller: "ravCtrl", 
		})
	.when("/greathall",
		{
			templateUrl: "greathall.html",
			controller: "viewCtrl", 
		}				
	);
});


var viewCtrl = app.controller("viewCtrl", function ($scope, changeRoute){
	$scope.changeRoute = changeRoute;
});
app.factory('changeRoute', function ($route, $location) {
	return function change(house) {
		$location.path('/' + house)
	}
})
app.factory('sortService', function() {
	var houseArray = [];
	return houseArray;
})
app.directive('kickout', function () {
	return {
		restrict: "EA",
		template: '<div ng-show="!sameHouse"><h3>Hey!  This is the {{displayHouse}} common room. Go back to {{otherHouse}}.</h3></div>'
	}
})
app.directive('welcome', function () {
	return {
		restrict: "EA",
		template: '<div ng-show="sameHouse"><h1>Welcome to {{displayHouse}}</h1></div>'
	}
})

var griffCtrl = app.controller("griffCtrl", function ($scope, sortService, changeRoute) {
	$scope.changeRoute = changeRoute;
	$scope.houseArray = sortService;
	$scope.houseArray.push('Gryffindor')
	$scope.displayHouse = 'Gryffindor';
	$scope.sameHouse = true;
	$scope.yourHouse = $scope.houseArray[0];

	switch ($scope.houseArray[0])
	{
		case 'Gryffindor':
			$scope.sameHouse = true;
			break;
		case 'Slytherin':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Slytherin';
			break;
		case 'Hufflepuff':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Hufflepuff';
			break;	
		case 'Ravenclaw':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Ravenclaw';
			break;		
	}

})	
var slythCtrl = app.controller("slythCtrl", function ($scope, sortService, changeRoute) {
	$scope.changeRoute = changeRoute;
	$scope.houseArray = sortService;
	$scope.houseArray.push('Slytherin')
	$scope.displayHouse = 'Slytherin';
	$scope.sameHouse = true;
	$scope.yourHouse = $scope.houseArray[0];
	switch ($scope.houseArray[0])
	{
		case 'Slytherin':
			$scope.sameHouse = true;
			break;
		case 'Gryffindor':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Gryffindor';
			break;
		case 'Hufflepuff':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Hufflepuff';
			break;	
		case 'Ravenclaw':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Ravenclaw';
			break;		
	}

})	

var huffCtrl = app.controller("huffCtrl", function ($scope, sortService, changeRoute) {
	$scope.changeRoute = changeRoute;
	$scope.houseArray = sortService;
	$scope.houseArray.push('Hufflepuff');
	$scope.displayHouse = 'Hufflepuff';
	$scope.sameHouse = true;
	$scope.yourHouse = $scope.houseArray[0];
	switch ($scope.houseArray[0])
	{
		case 'Hufflepuff':
			$scope.sameHouse = true;
			break;
		case 'Slytherin':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Slytherin';
			break;
		case 'Gryffindor':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Gryffindor';
			break;	
		case 'Ravenclaw':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Ravenclaw';
			break;		
}
});

var ravCtrl = app.controller("ravCtrl", function ($scope, sortService, changeRoute) {
	$scope.changeRoute = changeRoute;
	$scope.houseArray = sortService;
	$scope.houseArray.push('Ravenclaw');
	$scope.displayHouse = 'Ravenclaw';
	$scope.sameHouse = true;
	$scope.yourHouse = $scope.houseArray[0];
	switch ($scope.houseArray[0])
	{
		case 'Ravenclaw':
			$scope.sameHouse = true;
			break;
		case 'Slytherin':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Slytherin';
			break;
		case 'Gryffindor':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Gryffindor';
			break;	
		case 'Hufflepuff':
			$scope.sameHouse = false;
			$scope.otherHouse = 'Hufflepuff';
			break;		
}
});




