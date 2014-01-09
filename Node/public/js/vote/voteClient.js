var app = angular.module('app', ['d3']);

app.factory('socket', function ($rootScope) {
	var serverBaseUrl = document.domain;
	var socket = io.connect(serverBaseUrl + '/vote');
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});

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
			var width = 960,
				 height = 300,
				 padding = 20;

			var svg = d3.select(iElement[0])
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("class", "chart")
				// .append("g");

			var x = d3.scale.ordinal()
				// .domain([0,5])
				.domain(graphData.map(function (d) {
					return d.hex
				}))
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
					// .attr("x", function (d, i) {
					// 	return i * 20
					// })
					.attr("x", function (d) {
						return x(d.hex)
					})
					.attr("y", function (d) {
						return y(d.amount);
					})
					.attr("height", function (d) {
						return height - y(d.amount)
					})
					.attr("width", 20)
					// .attr("width", function (d) {
					// 	return (width / d.hex)
					// })
					.attr("width", x.rangeBand())
					.attr("fill", function (d) {
						return d.hex;
					})

			scope.$watch('data', updateGraph, true);

			function updateGraph() {
				var graphData = scope.data
				y.domain([0, d3.max(graphData, function (d) {
					return d.amount
				})])

				var rect = chart.selectAll("rect")
					.data(graphData);

				rect.transition()
					.duration(500)
					.attr("x", function (d, i) {
						return i * 20
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


app.controller('MainCtrl', function ($scope, socket) {
	$scope.colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"]
	$scope.data = {};
	$scope.data.colors = [];

	for (var i = 0; i < $scope.colors.length; i++) {
		var singleColor = $scope["colors"][i];
		var obj = {}
		obj["hex"] = singleColor;
		obj["amount"] = 5;
		
		$scope["data"]["colors"].push(obj)
	}
	$scope.data.colors[0].amount = 10;
	console.log($scope.data)

	$scope.vote = function (index) {
		$scope.data.colors[index].amount++
		// socket.emit("newVote", $scope.data.colors)
		console.log($scope.data)
		socket.emit("newVote", $scope.data)
	}

	socket.on("connect", function () {
		console.log("connected")
	})

	socket.on("connectedUser", function (data) {
		console.log("connected user WOOP")
		$scope.data = data[0];
		console.log($scope.data)
	})

	socket.on("updatedVotes", function (data) {
		console.log("this data is coming from socket.io")
		// console.log(data)
		// $scope.data = {};
		// $scope.data.colors = data;
		// console.log($scope.data.colors)
		$scope.data = data;
		console.log($scope.data.colors)
	})

})