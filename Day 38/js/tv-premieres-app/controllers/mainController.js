app.controller("mainController", function($scope, $http){
	$scope.apiKey = "67e12670ded5c5a3644a1fb906f2051e";
	$scope.results = []; 
	$scope.filterText = null; 
	$scope.genreFilter = $scope.availableGenres; 
	$scope.availableGenres = []; 

	$scope.customOrder = function(tvshow) {
				return tvshow.episode.first_aired;
				console.log(tvshow.episode.first_aired);
	}
	$scope.orderFields = ["Air Date"];
	$scope.orderDirections = ["Descending", "Ascending"];
	$scope.orderField = "Air Date";
	$scope.orderReverse = false;
	
    $scope.init = function() {
    	var today = new Date();
    	var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
    	$http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
    		angular.forEach(data, function(value, index){ 
    			var date = value.date; 
    			angular.forEach(value.episodes, function(tvshow, index){ 
	    			tvshow.date = date; 
	   			if (tvshow.show.country == "United States") {
	   				$scope.results.push(tvshow);
	   			}
	    			angular.forEach(tvshow.show.genres, function(genre, index){ 
	    				var exists = false;
	    				angular.forEach($scope.availableGenres, function(avGenre, index){ 
	    					if (avGenre == genre) { 
	    						exists = true;	
	    					}
	    				});
	    					if (genre.length > 1 && exists === false) { 
	    						$scope.availableGenres.push(genre); 
	    					}
	    			})
	    			console.log(tvshow.episode.first_aired)
    			});	
    		});
    	}).error(function(error) { 
    });
 }
});

