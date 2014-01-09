var app = angular.module('app', ['d3']);

// app.factory('socket', function ($rootScope) {
// 	var serverBaseUrl = document.domain;
// 	var socket = io.connect(serverBaseUrl + '/vote');
// 	return {
// 		on: function (eventName, callback) {
// 			socket.on(eventName, function () {
// 				var args = arguments;
// 				$rootScope.$apply(function() {
// 					callback.apply(socket, args);
// 				});
// 			});
// 		},
// 		emit: function (eventName, data, callback) {
// 			socket.emit(eventName, data, function () {
// 				var args = arguments;
// 				$rootScope.$apply(function() {
// 					if(callback) {
// 						callback.apply(socket, args);
// 					}
// 				});
// 			});
// 		}
// 	};
// });

app.directive('graph', function (d3) {
	return {
		restrict: 'EA',
		scope: {
			data: '='
		},
		controller: function ($scope) {
			// console.log("WHAT")
			// $scope.$watch('data', updateGraph, true);

			// function updateGraph() {
			// 	console.log("graph has been updated")
			// }

		},
		link: function (scope, iElement, iAttrs) {
			var graphData = scope.data
			var width = 300,
				 height = 300,
				 padding = 20;

			var svg = d3.select(iElement[0])
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("class", "chart")
				// .append("g");

			var x = d3.scale.ordinal()
				.domain([0,5])
				.rangeRoundBands([0, width], .1);

			 var y = d3.scale.linear()
				.range([height, 0])
				.domain([0, d3.max(graphData, function (d) {
					return d.amount
				})])

			var chart = d3.select(".chart")
				.attr("width", width - padding)
				.attr("height", height - padding)
				.append("g")

			chart.selectAll("rect")
				.data(graphData)
				.enter().append("rect")
					.attr("x", function (d, i) {
						return i * 30
					})
					.attr("y", function (d) {
						return y(d.amount);
					})
					.attr("height", function (d) {
						return height - y(d.amount)
					})
					.attr("width", 20)
					.attr("fill", function (d) {
						return d.hex;
					})

			scope.$watch('data', updateGraph, true);

			function updateGraph() {
				y.domain([0, d3.max(graphData, function (d) {
					return d.amount
				})])

				var rect = chart.selectAll("rect")
					.data(graphData);

				rect.transition()
					.duration(500)
					.attr("x", function (d, i) {
						return i * 30
					})
					.attr("y", function (d) {
						return y(d.amount);
					})
					.attr("height", function (d) {
						return height - y(d.amount)
					})
					.attr("width", 20)
					.attr("fill", function (d) {
						return d.hex;
					})
			}

		}
	}
})


app.controller('MainCtrl', function ($scope) {
	$scope.colors = ['#B21212', '#FFFC19', '#FF0000', '#1485CC', '#0971B2']
	$scope.data = {};
	// $scope.data.colors = {};
	$scope.data.colors = [];

	// for (var i = 0; i < $scope.colors.length; i++) {
	// 	var singleColor = $scope["colors"][i];
	//  	$scope["data"]["colors"][singleColor] = 5;
	// }
	// console.log($scope.data)

	for (var i = 0; i < $scope.colors.length; i++) {
		var singleColor = $scope["colors"][i];
		var obj = {}
		// obj[singleColor] = 5;
		obj["hex"] = singleColor;
		obj["amount"] = 5;
		
		$scope["data"]["colors"].push(obj)

		// $scope["data"]["colors"][singleColor] = 5;
	}
	// console.log($scope.data)
	$scope.data.colors[0].amount = 10;

	$scope.vote = function (index) {
		// $scope["data"]["colors"][color]++;
		// console.log(index)
		$scope.data.colors[index].amount++
		// console.log($scope.data.colors[index])
		
		// console.log($scope.data.colors)
	}
	// console.log($scope.data.colors)
})