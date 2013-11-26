var app = angular.module('rtApp', []);

app.factory("inTheaters", function($http) {
	return {
		results: [],
		url: "",
		getResults: function(data){
			var that = this;
			angular.forEach(data.movies, function(movielist, index) {
				that.results.push(movielist);
				})
		},
		init: function(url) {
			var that = this;
			that.results.splice(0, that.results.length)
				return $http.jsonp(url).success(
					function(data){
						that.getResults(data);
					})
		}
	}
})

app.controller("mainCtrl", function($scope, $http, inTheaters){
	$scope.results = inTheaters.results;
	$scope.activeMovie;
	$scope.toggle = function (index) {
		 $scope.activeMovie = index;
	}
	$scope.showMe = function(index) {
		return $scope.activeMovie == index;
	}

	$scope.showInTheaters = function($scope) {
		inTheaters.init('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=cfgemr7rvkj9uvtpge95kc6d&callback=JSON_CALLBACK')
		console.log('showintheaters');
	};
	$scope.homeRental = function($scope) {
		inTheaters.init('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=cfgemr7rvkj9uvtpge95kc6d&callback=JSON_CALLBACK')
		console.log('homerental')
	};
	$scope.upcomingMovies = function($scope) {
		inTheaters.init('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=cfgemr7rvkj9uvtpge95kc6d&callback=JSON_CALLBACK')
		console.log('upcoming')
	};
	$scope.openingMovies = function($scope) {
		inTheaters.init('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=cfgemr7rvkj9uvtpge95kc6d&callback=JSON_CALLBACK')
		console.log('opening')
	};
	
});

app.directive("left", function() {
	return {
		restrict: "EA",
		require: ['^ngModel'],
		replace: true,
		scope: {
			ngModel: '=',
		},
		templateUrl: 'left_template.html'
	}
})

app.directive("center", function() {
	return {
		restrict: "EA",
		require: ['^ngModel'],
		replace: true,
		scope: {
			ngModel: '=',
			
		},
		templateUrl: 'center_template.html'
	}
})






