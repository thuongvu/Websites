app.controller('MyController', function ($scope) {
	$scope.person = {name: ''};
	var updateClock = function () {
		$scope.clock = new Date();
	};
	var timer = setInterval(function() {
		$scope.$apply(updateClock);
	}, 1000);
	updateClock();
})
app.controller('MathController', function ($scope) {
	$scope.add = function(amount) {
		$scope.counter +=amount;
	};
	$scope.subtract = function (amount) {
		$scope.counter -=amount;
	}
	$scope.counter = 0;
})




////

	$scope.beers = [];
	$http({
		method: 'JSONP',
		url: 'http://api.openbeerdatabase.com/v1/beers.json?callback=JSON_CALLBACK'
	}).success(function(data){
		// console.log(data);
		angular.forEach(data.beers, function(beerdata, index){
			$scope.beers.push(beerdata);
		})
		
		console.log($scope.beers);
	}).error(function(){
		console.log("but that is impossible")
	})
	////