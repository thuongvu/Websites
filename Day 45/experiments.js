var app = angular.module('app', []);


app.factory("yoda", function ($http) {
	return {
		user: {},
		speaks: function () {
			var that = this;
			$http({
				url: 'https://yoda.p.mashape.com/yoda?',
				method: 'GET',
				headers: {"X-Mashape-Authorization": "OFnRuWJsY2TwdrEtByGzVfB4y7q37hJm"},
				params: {"sentence": that.user.input},
		}).success(function (data) {
				console.log(data);
				that.user.output = data;
			})
		}

	}
})

// $http
app.controller('mainCtrl', function ($scope, yoda) {
	$scope.user = yoda.user;
	// $scope.user.input = yoda.user.input;
	// yoda.user.input = $scope.user.input;
	// $scope.user.input = '';
	// $scope.user.output = yoda.user.output;
	$scope.submit = function($scope) {
		yoda.speaks();
	}
	// $scope.submit = function() {
	// 	$http({
	// 		url: 'https://yoda.p.mashape.com/yoda?',
	// 		method: 'GET',
	// 		headers: {"X-Mashape-Authorization": "OFnRuWJsY2TwdrEtByGzVfB4y7q37hJm"},
	// 		params: {"sentence": $scope.user.input},
	// 	}).success(function (data) {
	// 		console.log(data);
	// 		$scope.user.output = data;
	// 	})

	// }

})

// sentence=
// $http({
// 	method: 'GET',
// 	 url: 'www.google.com/someapi',
// 	  headers: {
// 	  		'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
// 	  	}
// });




<!DOCTYPE html>
<html>
<head>
	<title>Yoda-Speak</title>
		<link rel="stylesheet" href="style.css">
	 <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.1/angular.min.js"></script>
	<script type="text/javascript" src="script.js"></script>	
	<!-- <script src="/js/gAnalytics.js"></script> -->
</head>
<body ng-app="app" ng-controller="mainCtrl">
	<div id="wrapper">
	<div id="center">
		<h1>Yoda-speak</h1>
		<h4>How would Jedi Master Yoda say it?  Find out below!</h4>
	</div>
	<div id="left">
		<img src="yoda.png">
	</div>
	<div id="right">
	<textarea rows="4" cols="50" ng-model="user.input"></textarea>
	<button ng-click="submit()">You say this, how would, yoda, hmm?</button>
	<!-- <pre>user.input is: {{user.input}}</pre> -->
	<pre><!-- user.output is:  -->{{user.output}}</pre>
	</div>
	</div>
</body>
</html>