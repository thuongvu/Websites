angular.module('app', ['ngRoute', 'app.controllers', 'app.directives', 'app.services', 'timer'])
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'mainView.html',
			controller: 'mainCtrl'
		})
		.when('/highscores', {
			templateUrl: 'highScores.html',
			controller: 'highCtrl'
		})
	})
