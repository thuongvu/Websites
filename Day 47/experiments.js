var app = angular.module('app', []);

// app.factory('ig', function ($http) {
// 	return {
// 		photos: [],
// 		feedGet: function () {
// 			var that = this; 
// 			$http({
// 				url: 'https://api.instagram.com/v1/media/popular?client_id=7f3a0d9e6cca4689b5dadeaed96197dd&callback=JSON_CALLBACK',
// 				method: 'JSONP',
// 			}).success(function (data) {
// 				console.log(data.data);
// 				angular.forEach(data.data, function (photosList, index) {
// 					that.photos.push(photosList.images);
// 				}) 
// 				console.log(that.photos);
// 			})

// 		}
// 	}
// })

app.factory('geo', function () {
	return {
		coordinates: [],
		getLocation: function () {
			var that = this;
			navigator.geolocation.getCurrentPosition(function (position) {
			  // console.log(position.coords.latitude + ", " + position.coords.longitude);
			  var lat = position.coords.latitude;
			  var lng = position.coords.longitude;
			  that.coordinates.push(lat);
			  that.coordinates.push(lng);
			  console.log(that.coordinates);
			});
		}
	}
})


// app.factory('ig', function ($http, geo) {
// 	return {
// 		photos: [],
// 		feedGet: function () {
// 			var that = this; 
// 			$http({
// 				url: 'https://api.instagram.com/v1/media/search?lat=' + geo.coordinates[0] + '&lng=' + geo.coordinates[1] + '&client_id=7f3a0d9e6cca4689b5dadeaed96197dd&callback=JSON_CALLBACK',
// 				method: 'JSONP',
// 			}).success(function (data) {
// 				console.log(data.data);
// 				angular.forEach(data.data, function (photosList, index) {
// 					that.photos.push(photosList.images);
// 				}) 
// 				console.log(that.photos);
// 			})

// 		}
// 	}
// })


app.controller('mainCtrl', function ($scope, geo, $q, $timeout) {
	// ig.feedGet();
	// $scope.photos = ig.photos;
	geo.getLocation();

	
	$scope.findLocation = function() {
		var defer = $q.defer();
		$timeout(function() {
			$scope.coordinates = geo.coordinates;
			console.log();
			defer.resolve();

		}, 2000);
		return defer.promise;
	}
	$scope.findLocation();

})






/////////////////////////


var app = angular.module('app', []);

// app.factory('ig', function ($http) {
// 	return {
// 		photos: [],
// 		feedGet: function () {
// 			var that = this; 
// 			$http({
// 				url: 'https://api.instagram.com/v1/media/popular?client_id=7f3a0d9e6cca4689b5dadeaed96197dd&callback=JSON_CALLBACK',
// 				method: 'JSONP',
// 			}).success(function (data) {
// 				console.log(data.data);
// 				angular.forEach(data.data, function (photosList, index) {
// 					that.photos.push(photosList.images);
// 				}) 
// 				console.log(that.photos);
// 			})

// 		}
// 	}
// })

app.factory('geo', function () {
	return {
		coordinates: [],
		getLocation: function () {
			var that = this;
			navigator.geolocation.getCurrentPosition(function (position) {
			  that.coordinates.push(position.coords.latitude);
			  that.coordinates.push(position.coords.longitude);
			});
		}
	}
})


app.factory('ig', function ($http) {
	return {
		photos: [],
		feedGet: function (lat, long) {
			var that = this; 
			$http({
				url: 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + long + '&client_id=7f3a0d9e6cca4689b5dadeaed96197dd&distance=5000&callback=JSON_CALLBACK',
				method: 'JSONP',
			}).success(function (data) {
				console.log(data.data);
				angular.forEach(data.data, function (photosList, index) {
					that.photos.push(photosList.images);
				}) 
				console.log(that.photos);
			})

		}
	}
})


app.controller('mainCtrl', function ($scope, geo, $q, $timeout, ig) {
	geo.getLocation();
	$scope.findLocation = function() {
		var defer = $q.defer();
		
		$timeout(function() {
			$scope.coordinates = geo.coordinates;
			var latitude = $scope.coordinates[0];
			var longitude = $scope.coordinates[1];
			ig.photos = [];
			ig.feedGet(latitude, longitude);


			$scope.photos = ig.photos;
			defer.resolve();

		}, 1000);
		return defer.promise;
	}
	$scope.findLocation()
	// setInterval(function() {
	// 	$scope.findLocation()
	// }, 10000)



	var myArrayA = ["two", "three", "four", "five"];
	var myArrayB = ["one", "two", "three", "four"];
	var myArrayC = [];

var notInFirst = myArrayB.slice(0);
for (var i = 0, j; i < myArrayA.length; i++) {
	j = notInFirst.indexOf(myArrayA[i]);
	if (j > -1) notInFirst.splice(j,1);
}
console.log(notInFirst)


// for (var i = 0; i <myArrayA.length; i++) {
// 	for (var j = 0; j <myArrayB.length; j++) {
// 		if (myArrayA[i] === myArrayB[j]) {
// 			// console.log(myArrayB[j])
// 			console.log("hello")
// 		} else {
// 			var tempA = myArrayB.slice(0, i);
// 			var tempB = myArrayB.slice(j+1, myArrayB.length);
// 			// var tempC = tempA.concat(tempB)
// 			console.log(tempB);
// 		}
// 	}
	
// }

})




//////////////////////////////////////////

var app = angular.module('app', []);

// app.factory('ig', function ($http) {
// 	return {
// 		photos: [],
// 		feedGet: function () {
// 			var that = this; 
// 			$http({
// 				url: 'https://api.instagram.com/v1/media/popular?client_id=7f3a0d9e6cca4689b5dadeaed96197dd&callback=JSON_CALLBACK',
// 				method: 'JSONP',
// 			}).success(function (data) {
// 				console.log(data.data);
// 				angular.forEach(data.data, function (photosList, index) {
// 					that.photos.push(photosList.images);
// 				}) 
// 				console.log(that.photos);
// 			})

// 		}
// 	}
// })

app.factory('geo', function () {
	return {
		coordinates: [],
		getLocation: function () {
			var that = this;
			navigator.geolocation.getCurrentPosition(function (position) {
			  that.coordinates.push(position.coords.latitude);
			  that.coordinates.push(position.coords.longitude);
			});
		}
	}
})


app.factory('ig', function ($http) {
	return {
		photos: [],
		feedGet: function (lat, long) {
			var that = this; 
			$http({
				url: 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + long + '&client_id=7f3a0d9e6cca4689b5dadeaed96197dd&distance=5000&callback=JSON_CALLBACK',
				method: 'JSONP',
			}).success(function (data) {
				console.log(data.data);
				angular.forEach(data.data, function (photosList, index) {
					that.photos.push(photosList.images);
				}) 
				console.log(that.photos);

			})

		}
	}
})


app.controller('mainCtrl', function ($scope, geo, $q, $timeout, ig) {
	geo.getLocation();
	$scope.findLocation = function() {
		var defer = $q.defer();
		
		$timeout(function() {
			$scope.coordinates = geo.coordinates;
			var latitude = $scope.coordinates[0];
			var longitude = $scope.coordinates[1];
			ig.photos = [];
			ig.feedGet(latitude, longitude);

			

			$scope.photos = ig.photos;
			defer.resolve();

		}, 1000);
		return defer.promise;
	}
	$scope.findLocation()
	// setInterval(function() {
	// 	$scope.findLocation()
	// }, 10000)


var notInFirst = myArrayB.slice(0); // copy of the 2nd array
for (var i = 0, j; i < myArrayA.length; i++) {
	j = notInFirst.indexOf(myArrayA[i]); // j is a copy of the 2nd array. indexOf method goes through its copy of the 2nd array, and the search term is items from the first array.
	if (j > -1) notInFirst.splice(j,1); // whatever items it finds, it splices.  therefore we are left with items from the second array only
}
console.log(notInFirst)


	var myArrayA = ["two", "three", "four", "five"];
	var myArrayB = ["one", "two", "three", "four"];
	var myArrayC = [];





// for (var i = 0; i <myArrayA.length; i++) {
// 	for (var j = 0; j <myArrayB.length; j++) {
// 		if (myArrayA[i] === myArrayB[j]) {
// 			// console.log(myArrayB[j])
// 			console.log("hello")
// 		} else {
// 			var tempA = myArrayB.slice(0, i);
// 			var tempB = myArrayB.slice(j+1, myArrayB.length);
// 			// var tempC = tempA.concat(tempB)
// 			console.log(tempB);
// 		}
// 	}
	
// }

})




/////

// var notInFirst = myArrayB.slice(0); // copy of the 2nd array
// for (var i = 0, j; i < myArrayA.length; i++) {
// 	j = notInFirst.indexOf(myArrayA[i]); // j is a copy of the 2nd array. indexOf method goes through its copy of the 2nd array, and the search term is items from the first array.
// 	if (j > -1) notInFirst.splice(j,1); // whatever items it finds, it splices.  therefore we are left with items from the second array only
// }
// console.log(notInFirst)


	var myArrayA = ["two", "three", "four", "five"];
	var myArrayB = ["one", "two", "three", "four"];
	var myArrayC = [];





// for (var i = 0; i <myArrayA.length; i++) {
// 	for (var j = 0; j <myArrayB.length; j++) {
// 		if (myArrayA[i] === myArrayB[j]) {
// 			// console.log(myArrayB[j])
// 			console.log("hello")
// 		} else {
// 			var tempA = myArrayB.slice(0, i);
// 			var tempB = myArrayB.slice(j+1, myArrayB.length);
// 			// var tempC = tempA.concat(tempB)
// 			console.log(tempB);
// 		}
// 	}
	
// }
