angular.module('app', ['ngRoute', 'app.controllers', 'app.directives', 'app.services', 'timer'])
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/partials/timedd/mainView.ejs',
			controller: 'mainCtrl'
		})
		.when('/highscores', {
			templateUrl: '/partials/timedd/highScores.ejs',
			controller: 'highCtrl'
		})
	})
