angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
		$scope.countDown = null;
		$scope.scores = [];
		$scope.bestScore = null;
		$scope.name;
		$scope.zombieShow = false;
		$scope.highScoresList = [];

		// send high score button
		$scope.sendHighSchore = function () {
			console.log($scope.name);
			console.log($scope.bestScore);
			socket.emit("newScore", {name: $scope.name, score: $scope.bestScore})
		}

		// logic for buttons/timers
		var randomSeconds = function () {
			return Math.round(Math.random() * 3000) + 200;
		}
		function timerDirectiveStart() {
			$scope.$broadcast('timer-start');
			$scope.timerRunning = true;
			$scope.zombieShow = true;
			// sixtySecondTimer()
		}
		function sixtySecondTimer() {
			setTimeout(function() {
				timerDirectiveStart()
			}, 1000)
			$scope.countDown = 5;
			var timer = setInterval(function() {
				$scope.countDown --;
				$scope.$apply();
							console.log($scope.countDown);
				if ($scope.countDown <= 0) {
							console.log("time's up")
					clearInterval(timer)
					$scope.countDown = 0;
				}
			}, 1000);
		}

		$scope.startTimer = function (){
			setTimeout(function() {
				sixtySecondTimer();
			}, randomSeconds())
		}

		$scope.stopTimer = function () {
			$scope.zombieShow = false;
			$scope.$broadcast('timer-stop');
			$scope.timerRunning = false;
			if ($scope.countDown > 0) {
				var timer = setTimeout(function() {
					timerDirectiveStart();
				}, randomSeconds())
			} else {
				var sorted = $scope["scores"].sort(function (a,b) {
				   return a - b
				})
				if ($scope.bestScore === null) {
					$scope.bestScore = sorted[0]
				} else {
					if (sorted[0] < $scope.bestScore) {
						$scope.bestScore = sorted[0]
					}
				}
				console.log($scope.bestScore + " is your high score")
			}
		}
		$scope.$on('timer-stopped', function (event, data) {
			console.log('timer stopped - data = ', data)
			console.log('in milliseconds: ', data.millis)
			$scope.scores.push(data.millis);
			console.log($scope.scores)
		})
	}])
	.controller('highCtrl', ['$scope', 'socket', function ($scope, socket) {
		socket.emit("requestHighScores")
		socket.on("highScoresToClient", function (data) {
			$scope.showHighScores = true;
			$scope.highScoresList = data;
			console.log($scope.highScoresList)
		})
	}])