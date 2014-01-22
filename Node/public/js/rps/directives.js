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
	// .directive('choose', function(Game) {
	// 	var ctrller = function($scope) {
	// 		$scope.choose = function(strategy) {
	// 			console.log(strategy)
	// 			console.log("from a directive")
	// 			// logic for showing which strategy image
	// 			var strategies = ["paper", "scissors", "rock"];
	// 			for (var i = 0; i < strategies.length; i++) {
	// 				if (strategy === strategies[i]) {
	// 					$scope.show[strategy] = true;
	// 				}  else {
	// 					$scope.show[strategies[i]] = false;
	// 				}
	// 			} 
	// 			// emitting to server from Game service
	// 			Game.choose(strategy)
	// 		}
	// 	};
	// 	return {
	// 		restrict: 'EA',
	// 		controller: ctrller,
	// 		scope: {
	// 		// 	// statusfrom: '='
	// 		},
	// 		template: '<button ng-click="choose()"'
	// 	}
	// })