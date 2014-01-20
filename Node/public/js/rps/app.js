angular.module('app', [ 'ngRoute', 'app.services', 'app.controllers']) //'app.directives'
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/partials/rps/main.ejs',
			controller: 'mainCtrl'
		})
		.when('/game/', {
			templateUrl: '/partials/rps/game.ejs',
			controller: 'mainCtrl'
		})
	})