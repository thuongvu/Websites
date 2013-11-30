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

app.controller('mainCtrl', function ($scope, yoda) {
	$scope.user = yoda.user;
	$scope.submit = function($scope) {
		yoda.speaks();
	}
})
