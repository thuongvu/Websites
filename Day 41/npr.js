var app = angular.module('myApp', []);


var apiKey = 'MDEyNjcyNzE1MDEzODU0MTQxNDk3YzM1Yg001'
nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote&output=JSON'


app.controller('PlayerController', function ($scope, $http) {
	$scope.playing = false;
	$scope.audio = document.createElement('audio');
	$scope.audio.src = '';

	$scope.play = function(program) {
		if ($scope.playing) $scope.audio.pause();
		var url = program.audio[0].format.mp4.$text;
		$scope.audio.src = url;
		$scope.audio.play(); 
		$scope.playing = true;
	};
	$scope.stop = function() {
		$scope.audio.pause();
		$scope.playing = false;
	};
	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function() {
			$scope.stop();
		});
	});

	$http({
		method: 'JSONP',
		url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data) {
		$scope.programs = data.list.story;
		console.log(data.list.story);
		// angular.forEach(data.list.story, function(story, index){
		// 	console.log(story.audio[0].format.mp4.$text)
		// })
	}).error(function() {
		console.log("nooooooo")
	})

});

app.directive('nprLink', function() {
	return {
		restrict: 'EA',
		require: ['^ngModel'],
		replace: true,
		scope: {
			ngModel: '=',
			play: '&',
		},
		templateUrl: 'nprListItem.html',
		link: function(scope, ele, attr){
			scope.duration = scope.ngModel.audio[0].duration.$text;
		}
	}
})







