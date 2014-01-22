angular.module('app.directives', [])
	.directive('status', function(socket) {
		var ctrller = function($scope) {
			socket.on("status", function(data) {
				console.log("status from directive")
				$scope.status = data;
			})
		};
		return {
			restrict: 'EA',
			controller: ctrller,
			scope: {
			// 	// statusfrom: '='
			},
			template: '<p> {{status}} </p>'
		}
	})