angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', '$window', '$http', '$timeout', function ($scope, $window, $http, $timeout) {
		// oauth login
		console.log("twittype controller")
		$scope.showLogOut = false;
		$scope.loginOauth = function() {
		    $window.location.href = '/twittype/twitter/callback';
		}
		// };
		// logout

		$scope.askTweets = function (success, error) {
			$http.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rainloft&count=2').success(function(data) {
				console.log(data)
			})
		}


		$scope.logout = function (success, error) {
			$http.post('/twittype/logout').success(function() {
				console.log("logged out")
			})
		}

		if (tweets.length > 1) {
			$scope.showLogOut = true;

			// var tweets = ["Day 91 - What would your FB friends do in a zombie…te that picks 10 random... http://t.co/YAFetPoMWe", "@erinrinnn I want that Britney photo on my wall.", "Day 90 - Remember the 90s?  I made a guestbook tod…ook a lot longer than I... http://t.co/QQd3opJlqf", "Crying For No Reason (MORRI$ REMIX) by Katy B http://t.co/EKIqByqBQn on #SoundCloud", "Day 89 - I remade a game from Day 13, but this tim…A user can submit their... http://t.co/TGax4CeKy7", "Day 88 - Today I tag-teamed a project with Tyler. …lurbs about programming... http://t.co/je1J1Cze6C", "Day 87 - I got authentication down!  I’ve been wan… Today, thanks for this... http://t.co/uQR0aqbOZq", "Day 86 - I updated my youtube video syncing websit…s, 2. be able to load a... http://t.co/yFWm4cb5d8", "Day 85 - On today’s simple website, you can click …o “vote” on it, and its... http://t.co/ElvJG22Gn2", "@bertolomew2 the bike shop on pardall leaves them lying around for people to use for free?", "Day 84 - Angular kicked my ass today.  I’m a bit r…ra practice.  I haven’t... http://t.co/3zUqeiLNHv", "RT @Ch4BrianFantana: I won't be happy unless Apple replaces Siri's voice with Morgan Freeman's.", "A game that helps you learn javascript?? When I ge…play this! http://t.co/twT6puNuyz @JenniferDewalt", "Day 83 - My page allows you to see what other peop…tagram.  You can move a... http://t.co/bppDpCwhNc", "Day 81 - The moment someone posts a #selfie on ins… to my webserver. Then,... http://t.co/IrDNCVmVzk", "My website makes a request every time someone post…my limit in 5 mins.  Oops. http://t.co/wfhSWf5Ul0", "Day 81 - Today’s website features a visualization …ur mic.  It transforms,... http://t.co/CpKezqWZ6J", "Day 80 - I made a realtime, multiplayer tic-tac-to…e of the hardest things... http://t.co/juCgYH8pHV", "Day 79 - My website plots tweets on a map, in real… I thought it would be.... http://t.co/4expuGa6Lm", "Day 78 - I made a website that syncs a youtube vid…re watching!   Link And... http://t.co/qjVRDcCinT"]

			var tweetsList;
			function display (x) {
				$scope.tweetsDisplay = x;
			}
			$scope.tweetsDisplay = {};
			$scope.tweetsDisplay.words = []

			for (var i = 0; i < tweets.length; i++) {
				tweetsList+= tweets[i]
			}
			var split = tweetsList.split(" ");


			for (var i = 0; i < split.length; i++) {
			   $timeout(function(x) {
			     	return function() {
			     		var words = x;
			     		$scope.tweetsDisplay.words = words;
			     		// console.log($scope.tweetsDisplay.words)
			     		// display(x)
			   	};
			   } (split[i]), 100*i);
			}




		}
		
	}])