var app = angular.module('app', []);

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
		getIgFeed: function (lat, long) {
			var that = this; 
			$http({
				url: 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + long + '&client_id=7f3a0d9e6cca4689b5dadeaed96197dd&distance=5000&count=20&callback=JSON_CALLBACK',
				method: 'JSONP',
			}).success(function (data) {
				angular.forEach(data.data, function (photosList, index) {
					that.photos.push(photosList.images);
				}) 
			})

		}
	}
})


app.controller('mainCtrl', function ($scope, geo, $q, $timeout, ig) {
	geo.getLocation();
	$scope.showIgPhotos = function() {
		var defer = $q.defer();
		
		$timeout(function() {
			// set coordinates to be accessible, so we can input them as params
			$scope.coordinates = geo.coordinates;
			var latitude = $scope.coordinates[0];
			var longitude = $scope.coordinates[1];

			ig.photos = []; // clear the ig photos for the next oncoming array of photos
			ig.getIgFeed(latitude, longitude); // invoke the get call
			$scope.photos = ig.photos; // make the return accessible to the view
			defer.resolve();  // resolve

		}, 1000);
		return defer.promise;
	}
	$scope.showIgPhotos()

	setInterval(function() {
		$scope.showIgPhotos()
	}, 30000)


})




