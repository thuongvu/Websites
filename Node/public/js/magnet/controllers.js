angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
		console.log("in mainCtrl")
		$scope.magnets = [];
		$scope.createMagnet = function() {
			var magnet = {
				id: new Date().getTime(),
				body: 'word',
				x: 0,
				y: 0,
				bgcolor: '#'+(Math.random()*0xFFFFFF<<0).toString(16)
			};
			$scope.magnets.push(magnet);
			console.log(magnet)
			socket.emit('createMagnet', magnet);
		};

		socket.on("magnetsOnLoad", function(data) {
			console.log(data)
			// add it to the $scope.notes array
			for (var i = 0; i < data.length; i++) {
				$scope.magnets.push(data[i])
			}
		})

	}])