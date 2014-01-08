var app = angular.module('app', []);

app.factory('socket', function ($rootScope) {
	var serverBaseUrl = document.domain;
	var socket = io.connect(serverBaseUrl + '/collabtypewriter');
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


app.controller('MainCtrl', function ($scope, socket) {
	$scope.data = {};
	$scope.data2 = {};
	$scope.data3 = {};
	$scope.data4 = {};
	$scope.data.note = "Every keystroke that";
	$scope.data2.note = "you type is updated";
	$scope.data3.note = "instantly with anyone";
	$scope.data4.note = "on this website.";

	$scope.updateNote = function (note) {
		socket.emit('updateNote', note)
	}
	socket.on('onNoteUpdated', function (data) {
		$scope.data.note = data;
	})

	$scope.updateNoteTwo = function (note) {
		socket.emit('updateNoteTwo', note)
	}
	socket.on('onNoteUpdatedTwo', function (data) {
		$scope.data2.note = data;
	})

	$scope.updateNoteThree = function (note) {
		socket.emit('updateNoteThree', note)
	}
	socket.on('onNoteUpdatedThree', function (data) {
		$scope.data3.note = data;
	})

	$scope.updateNotefour = function (note) {
		socket.emit('updateNoteFour', note)
	}
	socket.on('onNoteUpdatedFour', function (data) {
		$scope.data4.note = data;
	})

})