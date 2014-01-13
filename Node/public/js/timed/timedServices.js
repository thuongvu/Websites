angular.module('app.services', [])
	.service('hello', function () {
		return {
			hello:function() {
				console.log("hello world")
			}
	}
})
	.factory('socket', function ($rootScope) {
		var serverBaseUrl = document.domain;
		var socket = io.connect(serverBaseUrl + '/timedd');
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