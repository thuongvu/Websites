angular.module('app', [ 'ngRoute', 'app.services', 'app.directives', 'app.controllers']) //'app.directives'
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/partials/rps/main.ejs',
			controller: 'preGameCtrl'
		})
		.when('/game/', {
			templateUrl: '/partials/rps/game.ejs',
			controller: 'mainCtrl'
		})
	})