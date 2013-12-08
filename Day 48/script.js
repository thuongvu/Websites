var app = angular.module("app", ['ngRoute']);

//routes
	app.config(function($routeProvider){
		$routeProvider
		.when("/",
		{
			templateUrl: "add.html",
			controller: 'add',
		})
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
		.when("/difficulty",
		{
			templateUrl: "difficulty.html",
			controller: 'difficulty',
		})
	})
//changeRoute service
	app.factory('changeRoute', function ($route, $location) {
		return function change(operator) {
			$location.path('/' + operator)
		}
	})
//numberFactory service
	var numberFactory = app.factory('numberFactory', function () {
		return {
			range: 10,
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
					var x = Math.round(Math.random() * number) + 1;
					var y = Math.round(Math.random() * number) + 1;
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
				if (that.addSignShow) {
					that.operator = that.firstNumber[index] + that.secondNumber[index];
				} else if (that.subtractSignShow) {
					that.operator = that.firstNumber[index] - that.secondNumber[index];
				} else if (that.multiplySignShow) {
					that.operator = that.firstNumber[index] * that.secondNumber[index];
				} else if (that.divideSignShow) {
					that.operator = that.firstNumber[index] / that.secondNumber[index];
				};
				if (that.answer === that.operator) {
					that.answerNumbers.push(that.answer);
					that.setProblem(that.range);
					that.answer = '';
					that.displayPokemon.push(that.pokemonContainer[Math.floor(Math.random() * 150)])
				}
			}
		}
})
// menu controller
	var menu = app.controller('menu', function ($scope, changeRoute) {
		$scope.changeRoute = changeRoute;
	});
// difficulty controller
	var difficulty = app.controller('difficulty', function ($scope, numberFactory) {
		$scope.range = numberFactory.range;
		$scope.storeRange = function (range) {
			numberFactory.range = range;
		}
	})
// add controller
	var add = app.controller('add', function ($scope, numberFactory) {
		// display operator + use in submitAnswer
		$scope.addSignShow = true;
		$scope.subtractSignShow = false;
		$scope.multiplySignShow = false;
		$scope.divideSignShow = false;
		//arrays for controller
		$scope.firstNumber = [];
		$scope.secondNumber = [];
		$scope.answerNumbers = [];
		//methods
		$scope.range = numberFactory.range;
		$scope.setProblem = numberFactory.setProblem;
		$scope.checkIndex = numberFactory.checkIndex;
		$scope.submitAnswer = numberFactory.submitAnswer;
		//pokemon
		numberFactory.initPokemon();
		$scope.pokemonContainer = numberFactory.pokemonContainer;
		$scope.displayPokemon = numberFactory.displayPokemon;
	})
//subtract controller
	var subtract = app.controller('subtract', function ($scope, numberFactory) {
		// display operator + use in submitAnswer
		$scope.addSignShow = false;
		$scope.subtractSignShow = true;
		$scope.multiplySignShow = false;
		$scope.divideSignShow = false;
		//arrays for controller
		$scope.firstNumber = [];
		$scope.secondNumber = [];
		$scope.answerNumbers = [];
		//methods
		$scope.range = numberFactory.range;
		$scope.setProblem = numberFactory.setProblem;
		$scope.checkIndex = numberFactory.checkIndex;
		$scope.submitAnswer = numberFactory.submitAnswer;
		//pokemon
		numberFactory.initPokemon();
		$scope.pokemonContainer = numberFactory.pokemonContainer;
		$scope.displayPokemon = numberFactory.displayPokemon;
	})
//multiply controller
	var multiply = app.controller('multiply', function ($scope, numberFactory) {
		// display operator + use in submitAnswer
		$scope.addSignShow = false;
		$scope.subtractSignShow = false;
		$scope.multiplySignShow = true;
		$scope.divideSignShow = false;
		// arrays for controller
		$scope.firstNumber = [];
		$scope.secondNumber = [];
		$scope.answerNumbers = [];
		//methods
		$scope.range = numberFactory.range;
		$scope.setProblem = numberFactory.setProblem;
		$scope.checkIndex = numberFactory.checkIndex;
		$scope.submitAnswer = numberFactory.submitAnswer;
		//pokemon
		numberFactory.initPokemon();
		$scope.pokemonContainer = numberFactory.pokemonContainer;
		$scope.displayPokemon = numberFactory.displayPokemon;
	})
//divide controller
	var divide = app.controller('divide', function ($scope, numberFactory) {
		// display operator + use in submitAnswer
		$scope.addSignShow = false;
		$scope.subtractSignShow = false;
		$scope.multiplySignShow = false;
		$scope.divideSignShow = true;
		// arrays for controller
		$scope.firstNumber = [];
		$scope.secondNumber = [];
		$scope.answerNumbers = [];
		//methods
		$scope.range = numberFactory.range;
		$scope.setProblem = numberFactory.setProblem;
		$scope.checkIndex = numberFactory.checkIndex;
		$scope.submitAnswer = numberFactory.submitAnswer;
		// pokemon
		numberFactory.initPokemon();
		$scope.pokemonContainer = numberFactory.pokemonContainer;
		$scope.displayPokemon = numberFactory.displayPokemon;
	})
