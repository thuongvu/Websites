angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', function ($scope) {
		$scope.paths = {};
		angular.extend($scope, {
		    center: {
		        lat: 51.505,
		        lng: -0.09,
		        zoom: 10
		    },
		    markers: {
              mainMarker: {
                  lat: 51,
                  lng: 0,
                  focus: true,
                  message: "Hey, drag me if you want",
                  title: "Marker",
                  draggable: true
              }
          },
          // paths: {
          // 	c: {
          // 		color: '#008000',
          // 		weight: 4,
          // 		latlngs: [{lat: 51.505, lng: -0.09}],
          // 		radius: 5000,
          // 		type: 'circle'
          // 	}
          // },
         // paths: {
         //  	  p1: {
         //  	    color: 'red',
         //  	    weight: 8,
         //  	    latlngs: [
         //  	        { lat: 51.50, lng: -0.082 },
         //  	        { lat: 48.83, lng: 2.37 },
         //  	        { lat: 41.91, lng: 12.48 }
         //  	    ],
         //  	}
         // },
         paths: {
          	  p1: {
          	    color: 'red',
          	    weight: 8,
          	    latlngs: [
          	        { lat: 51.50, lng: -0.082 },
          	        { lat: 48.83, lng: 2.37 },
          	        { lat: 41.91, lng: 12.48 }
          	    ],
          	}
         },

		});

		

	}]);