var app = angular.module("App", ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when("/",
	{
		templateUrl: "mainTemplate.html",
		controller: "AppCtrl"
	})
	.when("/choice/:name",
	{
		templateUrl: "nameTemplate.html",
		controller: "AppCtrl"
	})
	.when("/choice/:name",
	{
		templateUrl: "nameTemplate.html",
		controller: "AppCtrl"
	})
	.when("/choice/:name/red",
	{
		templateUrl: "red.html",
		controller: "AppCtrl"
	})
	.when("/choice/:name/blue",
	{
		templateUrl: "blue.html",
		controller: "AppCtrl"
	})

})
app.controller("AppCtrl", function ($scope, $routeParams) {
	$scope.model = {
		name: $routeParams.name
	}
	$scope.getLocation = function () {
		navigator.geolocation.getCurrentPosition(function(position) {
	});
	}
})

app.directive("map", function () {
	return {
		restrict: "E",
		link: function (scope, element) {
			navigator.geolocation.getCurrentPosition(function(position) {
	 		var latitude = position.coords.latitude;
	 		var longitude = position.coords.longitude;
	 		var link = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false"
			element.html('<img src="' +link+ '">')
			});
		}
	}
})





