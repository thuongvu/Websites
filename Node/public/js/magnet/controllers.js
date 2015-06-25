angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
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
			socket.emit('createMagnet', magnet);
		};

		socket.on("magnetsOnLoad", function(data) {
				for (var i = 0; i < data.length; i++) {
					$scope.magnets.push(data[i])
				}
			})
	}])