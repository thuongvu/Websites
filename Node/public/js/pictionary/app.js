angular.module('app', [ 'ngRoute', 'app.services', 'app.directives', 'app.controllers', 'd3'])
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/partials/pictionary/main.ejs',
			controller: 'preGameCtrl'
		})
		.when('/game', {
			templateUrl: '/partials/pictionary/game.ejs',
			controller: 'mainCtrl'
		})
	})