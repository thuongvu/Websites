angular.module('app', ['ngRoute', 'ngCookies', 'app.controllers', 'app.directives', 'app.services'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
		.when('/zombiebook/', {
			templateUrl: '/partials/zombiebook/main.ejs',
			controller: 'mainCtrl'
		})
		.when('/zombiebook/login', {
			templateUrl: '/partials/zombiebook/login.ejs',
			controller: 'mainCtrl'
		})
		.when('/zombiebook/test', {
			templateUrl: '/partials/zombiebook/test.ejs',
			controller: 'mainCtrl'
		})
		.when('/zombiebook/loggedin', {
			templateUrl: '/partials/zombiebook/loggedIn.ejs',
			controller: 'mainCtrl'
		})
		.when('/zombiebook/_=_', {
			templateUrl: '/partials/zombiebook/loggedIn.ejs',
			controller: 'mainCtrl'
		})

		$routeProvider.otherwise({redirectTo:'/zombiebook'});

		$locationProvider.html5Mode(true);

		$httpProvider.interceptors.push(function($q, $location) {
		    return {
		        'responseError': function(response) {
		            if(response.status === 401 || response.status === 403) {
		                $location.path('/login');
		                return $q.reject(response);
		            }
		            else {
		                return $q.reject(response);
		            }
		        }
		    }
		});

	})
