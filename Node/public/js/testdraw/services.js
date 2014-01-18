angular.module('app.services', [])
	.factory('socket', function ($rootScope) {
	var serverBaseUrl = document.domain;
	var socket = io.connect(serverBaseUrl + '/testdrawsocket');

	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};

});