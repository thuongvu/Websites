angular.module('app.directives', [])
	.directive('magnet', function(socket) {
		var linker = function(scope, element, attrs) {
			element.css('left', '10px');
			element.css('top', '50px');
			element.draggable({
				stop: function(event, ui) {
					scope.magnetdir.x = ui.position.left;
					scope.magnetdir.y = ui.position.top;
					socket.emit('moveMagnet', {
						id: scope.magnetdir.id,
						body: scope.magnetdir.body,
						x: ui.position.left,
						y: ui.position.top,
						bgcolor: scope.magnetdir.bgcolor
					})
				}
			});
			socket.on('magnetMovedByOther', function(data) {
				if (data.id == scope.magnetdir.id) {
					element.animate({
						left: data.x,
						top: data.y
					})
				}
			})
		};
		var ctrller = function($scope) {
			function update(magnetdir) {
				socket.emit('updateMagnet', magnetdir)
			}
			$scope.$watch('magnetdir', update, true)
		};
		return {
			restrict: 'EA',
			link: linker,
			controller: ctrller,
			scope: {
				magnetdir: '='
			}
		};

	})