app.factory("ShowService",function($http){
	return { // return this to whatever is asking for this to be injected
		availableGenres:[],
		filterText:null,
		availableGenres:[],
		results:[],
		url:"",

		getURL:function(){
		var that = this ;
		//API Key
		var apiKey = "67e12670ded5c5a3644a1fb906f2051e";
		//API requires a start date
		var today = new Date();
		//API Number of Days
		var numberOfDays = 30;
		//Create the date string and ensure leading zeros if required
		var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
		//set the Call URL
		that.url = 'http://api.trakt.tv/calendar/premieres.json/' + apiKey + '/' + apiDate + '/' + numberOfDays + '/?callback=JSON_CALLBACK';
		},

		getResults:function(data){
			var that = this ;
			//As we are getting our data from an external source, we need to format the data so we can use it to our desired effect
			//For each day, get all the episodes
			angular.forEach(data, function(value, index){
			//The API stores the full date separately from each episode. Save it so we can use it later
				var date = value.date;
				//For each episodes add it to the results array
				angular.forEach(value.episodes, function(tvshow, index){
					//Create a date string from the timestamp so we can filter on it based on user text input
					tvshow.date = date; //Attach the full date to each episode
					that.results.push(tvshow);
					angular.forEach(tvshow.show.genres, function(genre, index){
						//Only add to the availableGenres array if it doesn't already exist
						var exists = false;
						angular.forEach(that.availableGenres, function(avGenre, index){
							if (avGenre == genre) {
							exists = true;
							}
						});
						if (exists === false) {
						that.availableGenres.push(genre);
						}
					});
				});
			});
		},
		init:function(callback){
			var that = this;
			//Set the URL Endpoint
			that.getURL();
			if (that.url !== "") {
				return $http.jsonp(that.url).success(
					function(data){
						that.getResults(data);
						if(callback)callback.apply(null,[].slice.call(arguments))
				})
			}
			else return null;
		}
	}
});

app.controller("mainController", function($scope, $http, ShowService){

$scope.originalResult = null;
$scope.filterText = null;
$scope.genreFilter = null;
$scope.orderFields = ["Air Date", "Rating"];
$scope.orderDirections = ["Descending", "Ascending"];
$scope.orderField = "Air Date"; //Default order field
$scope.orderReverse = false;

//Initialize View Data
$scope.init = function() {
		ShowService.init()
	};
$scope.results = ShowService.results;
$scope.availableGenres = ShowService.availableGenres;


//
$scope.setGenreFilter = function(genre) {
$scope.genreFilter = genre;
};

//custom filter
$scope.customOrder = function(tvshow) {
switch ($scope.orderField) {
case "Air Date":
return tvshow.episode.first_aired;
break;
case "Rating":
return tvshow.episode.ratings.percentage;
break;
}
};

});

app.filter('isGenre', function() {
return function(input, genre) {
if (typeof genre == 'undefined' || genre == null) {
return input;
} else {
var out = [];
for (var a = 0; a < input.length; a++){
for (var b = 0; b < input[a].show.genres.length; b++){
if(input[a].show.genres[b] == genre) {
out.push(input[a]);
}
}
}
return out;
}
};
});