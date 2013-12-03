var app = angular.module("app", []);

var plus = app.controller('plus', function ($scope) {
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.equals = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	$scope.setProblem = function (number) {
		$scope.firstNumber.push(Math.round(Math.random() * number));
		$scope.secondNumber.push(Math.round(Math.random() * number))
	}
	$scope.checkIndex = function (index) {
		if (index+1 === $scope.firstNumber.length) {
			return true;
		}
	}
	$scope.submitAnswer = function (answer) {
		var index = $scope.firstNumber.length - 1;

		if ($scope.answer === ($scope.firstNumber[index] + $scope.secondNumber[index])) {
			console.log("correct");
			$scope.answerNumbers.push($scope.answer);
		$scope.setProblem($scope.range);
		$scope.answer = '';
		}
	}

})


//////////////////////////////////////////

var app = angular.module("app", []);

var numberFactory = app.factory('numberFactory', function () {
	return {
		setProblem: function (number) {
			var that = this;
			that.firstNumber.push(Math.round(Math.random() * number));
			that.secondNumber.push(Math.round(Math.random() * number))
		},
		checkIndex: function (index) {
			var that = this;
			if (index+1 === that.firstNumber.length) {
				return true;
			}
		},
		submitAnswer: function (answer) {
			var that = this;
			var index = that.firstNumber.length - 1;
			var add = that.firstNumber[index] + that.secondNumber[index];

			if (that.answer === add) {
				console.log("correct");
				that.answerNumbers.push(that.answer);
				that.setProblem(that.range);
				that.answer = '';
			}
		}
	}
})

var plus = app.controller('plus', function ($scope, numberFactory) {
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	$scope.submitAnswer = numberFactory.submitAnswer;

	$scope.pokemonContainer = [];
	$scope.displayPokemon = [];
	for (var i = 1; i <= 150; i++) {
		$scope.pokemonContainer.push('images/' + i + '.png');
	}
	$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
	console.log($scope.displayPokemon);

})



///////////////////////////

var app = angular.module("app", ['ngRoute']);


var numberFactory = app.factory('numberFactory', function () {
	return {
		pokemonContainer: [],
		displayPokemon: [],
		initPokemon: function () {
			var that = this;
			for (var i = 1; i <= 150; i++) {
				that.pokemonContainer.push('images/' + i + '.png');
			}
		},
		setProblem: function (number) {
			var that = this;
			that.firstNumber.push(Math.round(Math.random() * number));
			that.secondNumber.push(Math.round(Math.random() * number))
		},
		checkIndex: function (index) {
			var that = this;
			if (index+1 === that.firstNumber.length) {
				return true;
			}
		},
		submitAnswer: function (answer) {
			var that = this;
			var index = that.firstNumber.length - 1;
			that.operator = that.firstNumber[index] + that.secondNumber[index];

			if (that.answer === that.operator) {
				that.answerNumbers.push(that.answer);
				that.setProblem(that.range);
				that.answer = '';
				that.displayPokemon.push(that.pokemonContainer[Math.floor(Math.random() * 150)])
			}
		}
	}
})

var plus = app.controller('plus', function ($scope, numberFactory) {
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	// $scope.submitAnswer = numberFactory.submitAnswer;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;


	$scope.submitAnswer = function (answer) {
		var index = $scope.firstNumber.length - 1;
		$scope.operator = $scope.firstNumber[index] + $scope.secondNumber[index];

		if ($scope.answer === $scope.operator) {
			$scope.answerNumbers.push($scope.answer);
			$scope.setProblem($scope.range);
			$scope.answer = '';
			$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
		}
	}

})


var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/add",
	{
		templateUrl: "add.html",
		controller: 'add',
	})
	.when("/subtract",
	{
		templateUrl: "add.html",
		controller: 'subtract',
	})
	.when("/multiply",
	{
		templateUrl: "add.html",
		controller: 'multiply',
	})
})

app.factory('changeRoute', function ($route, $location) {
	return function change(operator) {
		$location.path('/' + operator)
	}
})

var numberFactory = app.factory('numberFactory', function () {
	return {
		pokemonContainer: [],
		displayPokemon: [],
		initPokemon: function () {
			var that = this;
			for (var i = 1; i <= 150; i++) {
				that.pokemonContainer.push('images/' + i + '.png');
			}
		},
		setProblem: function (number) {

			var that = this;

			if (that.addSignShow) {
				console.log("adding time")
			}
			var x = Math.round(Math.random() * number);
			var y = Math.round(Math.random() * number);

			if (x > y) {
				that.firstNumber.push(x);
				that.secondNumber.push(y);
			} else {
				that.firstNumber.push(y);
				that.secondNumber.push(x);
			}
		},
		checkIndex: function (index) {
			var that = this;
			if (index+1 === that.firstNumber.length) {
				return true;
			}
		},
		submitAnswer: function (answer) {
			var that = this;
			var index = that.firstNumber.length - 1;
			that.operator = that.firstNumber[index] + that.secondNumber[index];

			if (that.answer === that.operator) {
				that.answerNumbers.push(that.answer);
				that.setProblem(that.range);
				that.answer = '';
				that.displayPokemon.push(that.pokemonContainer[Math.floor(Math.random() * 150)])
			}
		}
	}
})

var menu = app.controller('menu', function ($scope, changeRoute) {
	$scope.changeRoute = changeRoute;
});

var add = app.controller('add', function ($scope, numberFactory) {
	$scope.addSignShow = true;
	$scope.subtractSignShow = false;
	$scope.multiplySignShow = false;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = function (answer) {
		var index = $scope.firstNumber.length - 1;
		$scope.operator = $scope.firstNumber[index] + $scope.secondNumber[index];

		if ($scope.answer === $scope.operator) {
			$scope.answerNumbers.push($scope.answer);
			$scope.setProblem($scope.range);
			$scope.answer = '';
			$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
		}
	}

})

var subtract = app.controller('subtract', function ($scope, numberFactory) {
	$scope.addSignShow = false;
	$scope.subtractSignShow = true;
	$scope.multiplySignShow = false;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = function (answer) {
		var index = $scope.firstNumber.length - 1;
		$scope.operator = $scope.firstNumber[index] - $scope.secondNumber[index];

		if ($scope.answer === $scope.operator) {
			$scope.answerNumbers.push($scope.answer);
			$scope.setProblem($scope.range);
			$scope.answer = '';
			$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
		}
	}

})

var multiply = app.controller('multiply', function ($scope, numberFactory) {
	$scope.addSignShow = false;
	$scope.subtractSignShow = false;
	$scope.multiplySignShow = true;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = function (answer) {
		var index = $scope.firstNumber.length - 1;
		$scope.operator = $scope.firstNumber[index] * $scope.secondNumber[index];

		if ($scope.answer === $scope.operator) {
			$scope.answerNumbers.push($scope.answer);
			$scope.setProblem($scope.range);
			$scope.answer = '';
			$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
		}
	}

})

//////////////////

switch (that.operator) {
	case that.addSignShow:
		that.operator = that.firstNumber[index] + that.secondNumber[index];
		break;
	case that.subtractSignShow:
		that.operator = that.firstNumber[index] - that.secondNumber[index];
		break;
	case that.multiplySignShow:
		that.operator = that.firstNumber[index] * that.secondNumber[index];
		break;
	case that.divideSignShow:
		that.operator = that.firstNumber[index] / that.secondNumber[index];
		break;
}

////////////////////////////////////

var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/add",
	{
		templateUrl: "add.html",
		controller: 'add',
	})
	.when("/subtract",
	{
		templateUrl: "add.html",
		controller: 'subtract',
	})
	.when("/multiply",
	{
		templateUrl: "add.html",
		controller: 'multiply',
	})
	.when("/divide",
	{
		templateUrl: "add.html",
		controller: 'divide',
	})
})

app.factory('changeRoute', function ($route, $location) {
	return function change(operator) {
		$location.path('/' + operator)
	}
})

var numberFactory = app.factory('numberFactory', function () {
	return {
		pokemonContainer: [],
		displayPokemon: [],
		initPokemon: function () {
			var that = this;
			for (var i = 1; i <= 150; i++) {
				that.pokemonContainer.push('images/' + i + '.png');
			}
		},
		setProblem: function (number) {

			var that = this;

			if (that.divideSignShow) {
				var x = Math.round(Math.random() * number);
				var y = Math.round(Math.random() * number);
				var z = x * y;
				that.firstNumber.push(z);
				that.secondNumber.push(x);

			} else {
				var x = Math.round(Math.random() * number);
				var y = Math.round(Math.random() * number);

				if (x > y) {
					that.firstNumber.push(x);
					that.secondNumber.push(y);
				} else {
					that.firstNumber.push(y);
					that.secondNumber.push(x);
				}
			}
		},
		checkIndex: function (index) {
			var that = this;
			if (index+1 === that.firstNumber.length) {
				return true;
			}
		},
		submitAnswer: function (answer) {
			var that = this;
			var index = that.firstNumber.length - 1;
			that.operator = that.firstNumber[index] + that.secondNumber[index];

			if (that.addSignShow) {
				that.operator = that.firstNumber[index] + that.secondNumber[index];
			} else if (that.subtractSignShow) {
				that.operator = that.firstNumber[index] - that.secondNumber[index];
			} else if (that.multiplySignShow) {
				that.operator = that.firstNumber[index] * that.secondNumber[index];
			} else if (that.divideSignShow) {
				that.operator = that.firstNumber[index] / that.secondNumber[index];
			}

			if (that.answer === that.operator) {
				that.answerNumbers.push(that.answer);
				that.setProblem(that.range);
				that.answer = '';
				that.displayPokemon.push(that.pokemonContainer[Math.floor(Math.random() * 150)])

			}
		}
	}
})

var menu = app.controller('menu', function ($scope, changeRoute) {
	$scope.changeRoute = changeRoute;
});

var add = app.controller('add', function ($scope, numberFactory) {
	$scope.addSignShow = true;
	$scope.subtractSignShow = false;
	$scope.multiplySignShow = false;
	$scope.divideSignShow = false;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = numberFactory.submitAnswer
	// $scope.submitAnswer = function (answer) {
	// 	var index = $scope.firstNumber.length - 1;
	// 	$scope.operator = $scope.firstNumber[index] + $scope.secondNumber[index];

	// 	if ($scope.answer === $scope.operator) {
	// 		$scope.answerNumbers.push($scope.answer);
	// 		$scope.setProblem($scope.range);
	// 		$scope.answer = '';
	// 		$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
	// 	}
	// }

})

var subtract = app.controller('subtract', function ($scope, numberFactory) {
	$scope.addSignShow = false;
	$scope.subtractSignShow = true;
	$scope.multiplySignShow = false;
	$scope.divideSignShow = false;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = numberFactory.submitAnswer

	// $scope.submitAnswer = function (answer) {
	// 	var index = $scope.firstNumber.length - 1;
	// 	$scope.operator = $scope.firstNumber[index] - $scope.secondNumber[index];

	// 	if ($scope.answer === $scope.operator) {
	// 		$scope.answerNumbers.push($scope.answer);
	// 		$scope.setProblem($scope.range);
	// 		$scope.answer = '';
	// 		$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
	// 	}
	// }

})

var multiply = app.controller('multiply', function ($scope, numberFactory) {
	$scope.addSignShow = false;
	$scope.subtractSignShow = false;
	$scope.multiplySignShow = true;
	$scope.divideSignShow = false;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];
	
	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = numberFactory.submitAnswer

	// $scope.submitAnswer = function (answer) {
	// 	var index = $scope.firstNumber.length - 1;
	// 	$scope.operator = $scope.firstNumber[index] * $scope.secondNumber[index];

	// 	if ($scope.answer === $scope.operator) {
	// 		$scope.answerNumbers.push($scope.answer);
	// 		$scope.setProblem($scope.range);
	// 		$scope.answer = '';
	// 		$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
	// 	}
	// }

})

var divide = app.controller('divide', function ($scope, numberFactory) {
	$scope.addSignShow = false;
	$scope.subtractSignShow = false;
	$scope.multiplySignShow = false;
	$scope.divideSignShow = true;
	$scope.firstNumber = [];
	$scope.secondNumber = [];
	$scope.range = 10;
	$scope.answerNumbers = [];

	$scope.setProblem = numberFactory.setProblem;
	$scope.checkIndex = numberFactory.checkIndex;
	numberFactory.initPokemon();
	$scope.pokemonContainer = numberFactory.pokemonContainer;
	$scope.displayPokemon = numberFactory.displayPokemon;

	$scope.submitAnswer = numberFactory.submitAnswer

	// $scope.submitAnswer = function (answer) {
	// 	var index = $scope.firstNumber.length - 1;
	// 	$scope.operator = $scope.firstNumber[index] / $scope.secondNumber[index];

	// 	if ($scope.answer === $scope.operator) {
	// 		$scope.answerNumbers.push($scope.answer);
	// 		$scope.setProblem($scope.range);
	// 		$scope.answer = '';
	// 		$scope.displayPokemon.push($scope.pokemonContainer[Math.floor(Math.random() * 150)])
	// 	}
	// }

})




