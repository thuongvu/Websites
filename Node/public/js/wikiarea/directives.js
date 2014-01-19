angular.module('app.directives', [])
	.directive('map', function (leaflet) {
		return {
			restrict: 'EA',
			// scope: {
			// 	data: '='
			// },
			controller: function ($scope) {
			},
			link: function (scope, iElement, iAttrs) {

				iElement.html('<div width="600" height="300" id="map"></div>');
						var map = L.map('map').setView([0, 0], 2);

					   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					   }).addTo(map);
			}

		}
	})