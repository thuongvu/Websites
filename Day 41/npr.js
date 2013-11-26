var app = angular.module('myApp', []);

var apiKey = 'MDEyNjcyNzE1MDEzODU0MTQxNDk3YzM1Yg001'
nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote&output=JSON'


app.factory('audio', function ($document){
	var audio = $document[0].createElement('audio');
	return audio;
})

app.factory('player', function (audio) {
	var player = {
		playing: false,
		current: null,
		ready: false,
		play: function(program) {
			if (player.playing) player.stop();
			var url = program.audio[0].format.mp4.$text;
			player.current = program;
			audio.src = url;
			audio.play();
			player.playing = true;
		},
		stop: function() {
			if (player.playing) 
			{
				audio.pause();
			}
		}
	};
	return player;
});

app.controller('PlayerController', function ($scope, $http, player, nprService) {
	$scope.player = player;
	nprService.programs(apiKey)
		.success(function(data, status) {
			$scope.programs = data.list.story;
		})

});

app.service('nprService', function ($http) {
	var doRequest = function(apiKey) {
		return $http({
			method: 'JSONP',
			url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
		})
	}
		return {
			 programs: function(apiKey) { return doRequest(apiKey); }
	}
})


app.directive('nprLink', function() {
	return {
		restrict: 'EA',
		require: ['^ngModel'],
		replace: true,
		scope: {
			ngModel: '=',
			player: '=',
		},
		templateUrl: 'nprListItem.html',
		link: function(scope, ele, attr){
			scope.duration = scope.ngModel.audio[0].duration.$text;
		}
	}
})




