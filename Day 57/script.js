var app = angular.module("app", ['ngDragDrop', 'd3']);

app.directive('d3bars', function (d3) {
	return {
		restrict: 'EA',
		scope: {
			data: '='
		},
		link: function (scope, iElement, iAttrs) {
			var width = 300,
				 height = 300,
				 radius = Math.min(width, height) / 2;
			var svg = d3.select(iElement[0])
			 	 .append("svg")
			 	 .attr("width", 300)
			 	 .attr("height", 300)
			 	 .append("g")
			 	 .attr("transform", "translate(" + width / 2 + "," + height / 2 +")");
			var color = d3.scale.ordinal()
				.range(["#B20000", "#00B233", "#FF1919", "#00FF48", "#FF0000"])

		scope.$watch('data', updatePie, true);
		 function updatePie() {
		 	svg.selectAll("*").remove();
		 	var dataArray = [];
		 	function logAElements(element) {
		 		var float = parseInt(element.price)
		 		var name = element.name;
		 		var obj = {};
		 		obj.name = name;
		 		obj.price = float;
		 		dataArray.push(obj);
		 	}
		 	scope.data.forEach(logAElements);
		 	console.log(dataArray);
		 
			var arc = d3.svg.arc()
				 .outerRadius(radius - 10)
				 .innerRadius(0)	

			var pie = d3.layout.pie()
				 .sort(null)
				 .value(function (d) {
				 	return d.price;
				 })

		 	var g = svg.selectAll(".arc")
		 	 	 .data(pie(dataArray))
		 	 	 .enter()
		 	 	 .append("g")
		 	 	 .attr("class", "arc")

		 	g.append("path")
		 		.attr("d", arc)
		 		.attr("fill", function (d,i) {
		 			return color(i);
		 		})
		 	g.append("text")
		 		.attr("transform", function(d) {
		 			return "translate(" + arc.centroid(d) + ")"
		 			})
		 		.attr("dy", ".5em")
		 		.style("text-anchor", "middle")
		 		.text(function (d) {
		 			return d.name; // cannot figure out how to access name prop
		 		})
		 }
			
		},
	}
})

app.controller("mainCtrl", function ($scope) {
	$scope.list = [];
	$scope.tempList = [];
	$scope.totalArray = [];
	$scope.totalAmount = 0;

	$scope.add = function () {
		$scope.tempList.push($scope.item);
		console.log($scope.tempList)
		$scope.item = null;
		
	}

	$scope.remove = function (index, array) {
		array.splice(index, 1);
		console.log(array);
	}

	$scope.total = function() {
		$scope.totalArray = [];
		$scope.totalAmount = 0;

		angular.forEach($scope.list, function (newitem) {
			$scope.totalArray.push(parseFloat(newitem.price));
			// console.log("$scope.totalArray is " + $scope.totalArray);
		})

		for (var j = 0; j < $scope.totalArray.length; j++) {
			$scope.totalAmount += $scope.totalArray[j];
		}

		// console.log("$scope.totalAmount is 	" +$scope.totalAmount);
	}

	$scope.dropSuccessHandler = function($event, index, array) {
		array.splice(index, 1);
	}

	$scope.onDrop = function ($event, $data, array) {
		array.push($data);
	}

	$scope.$watch("list", $scope.total, true);

})