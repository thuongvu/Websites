angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
		$scope.countDown = null;
		$scope.scores = [];
		$scope.bestScore = null;
		$scope.name;
		$scope.zombieShow = false;
		$scope.highScoresList = [];

		socket.on("highScoresToClient", function (data) {
			console.log(data)
		})

		// send high score button
		$scope.sendHighSchore = function () {
			socket.emit("newScore", {name: $scope.name, score: $scope.bestScore})
			$scope.name = " ";
			console.log($scope.name)
			console.log($scope.bestScore)
		}

		// logic for buttons/timers
		var randomSeconds = function () {
			return Math.round(Math.random() * 1500) + 200;
		}
		function timerDirectiveStart() {
			$scope.timerRunning = true;
			$scope.zombieShow = true;
			$scope.$broadcast('timer-start');
		}
		function sixtySecondTimer() {
			// setTimeout(function() {
				timerDirectiveStart()
			// }, 1000)
			$scope.countDown = 10;
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
				$scope.zombieShow = true;
				sixtySecondTimer();
			}, 300)
		}

		$scope.stopTimer = function () {
			$scope.zombieShow = false;
			$scope.$broadcast('timer-stop');
			$scope.timerRunning = false;

			if ($scope.countDown > 2) {
				var timer = setTimeout(function() {
					timerDirectiveStart();
				}, randomSeconds())
			} else {
				clearInterval(timer)
				// sort data --> bestscore, etc
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
			}
		}
		$scope.$on('timer-stopped', function (event, data) {
			$scope.scores.push(data.millis);
		})
	}])
	.controller('highCtrl', ['$scope', 'socket', function ($scope, socket) {
		socket.emit("requestHighScores")
		socket.on("highScoresToClient", function (data) {
			$scope.showHighScores = true;
			$scope.highScoresList = data;
		})
	}])