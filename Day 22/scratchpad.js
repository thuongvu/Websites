// 10:43pm
var fruits = []
// make guessingGame object
guessingGame = function(min, max) {
    this.initialValue(min, max);
    // invokes initialValue on its instance.  
}
// prototype of this object, so later we may instantiate instantiate
guessingGame.prototype = {
	minNumber: 1,
	maxNumber: 10,
	secretNumber: null,

	initialValue: function(min, max) {
		// making these vars accessible
		this.minNumber = min;
		this.maxNumber = max;
		this.generateRandomNumber(); // invokes generateRandomNumber with 
		// because generaterandom number DID not get called, 
		//there was certainly a problem with that before
		// just because there's a function here, DOES NOT mean it gets called. 
		// it is simply declared here, invoked elsewhere.  
	},

	generateRandomNumber: function() {
		this.secretNumber = Math.floor(0 + (Math.random() * 10));
	},

	guess: function(guess) {// this argument is a local variable
		if (guess < this.secretNumber) {
			console.log(guess + " is too low.")
			console.log(this.secretNumber)
			fruits.push(guess);



		if ( Math.abs((fruits[fruits.length-1] - this.secretNumber)) < Math.abs((fruits[fruits.length-2] - this.secretNumber)) ) {
				console.log("You are getting closer!");
				} else  {
				console.log("You are getting farther!");
				};
			
			return false;
		} else if ( guess > this.secretNumber) {
			console.log(guess + " is too high.")
			console.log(this.secretNumber);
			fruits.push(guess);

		if ( Math.abs((fruits[fruits.length-1] - this.secretNumber)) < Math.abs((fruits[fruits.length-2] - this.secretNumber)) ) {
				console.log("You are getting closer!");
				} else  {
				console.log("You are getting farther!");
				};

			return false;
		} else {
			console.log(guess + " is correct!");
			console.log(this.secretNumber);

			return true;
		}
	},

};

// instantiate guessingGame
var game = new guessingGame();
// this is for the do while statement
var guessResult = false;

// do while, allow player to guess multiple times
do {
	var guessANumber = prompt("Guess a number yo");
	guessResult = game.guess(guessANumber);
	// the user input at prompt will be the argument 
	//for the instantiated game object's guest property.  we are passing an argument
	// within the method of this object's 
} while (guessResult === false);





/////////////////
// 11:47 pm
$(document).ready(function(){
var fruits = []
// make guessingGame object
guessingGame = function(min, max) {
    this.initialValue(min, max);
    // invokes initialValue on its instance.  
}
// prototype of this object, so later we may instantiate instantiate
guessingGame.prototype = {
	minNumber: 1,
	maxNumber: 10,
	secretNumber: null,

	initialValue: function(min, max) {
		// making these vars accessible
		this.minNumber = min;
		this.maxNumber = max;
		this.generateRandomNumber(); // invokes generateRandomNumber with 
		// because generaterandom number DID not get called, 
		//there was certainly a problem with that before
		// just because there's a function here, DOES NOT mean it gets called. 
		// it is simply declared here, invoked elsewhere.  
	},

	generateRandomNumber: function() {
		this.secretNumber = Math.floor(0 + (Math.random() * 10));
	},

	guess: function(guess) {// this argument is a local variable
		if (guess < this.secretNumber) {
			console.log(guess + " is too low.")
			console.log(this.secretNumber)
			fruits.push(guess);


		if (fruits.length > 2) {
		if ( Math.abs((fruits[fruits.length-1] - this.secretNumber)) < Math.abs((fruits[fruits.length-2] - this.secretNumber)) ) {
				console.log("You are getting closer!");
				$('body').css({'background-color': 'red' })
				} else  {
				console.log("You are getting farther!");
				$('body').css({'background-color': 'blue' })
				};
		};
			
			return false;
		} else if ( guess > this.secretNumber) {
			console.log(guess + " is too high.")
			console.log(this.secretNumber);
			fruits.push(guess);

		if (fruits.length > 2) {
		if ( Math.abs((fruits[fruits.length-1] - this.secretNumber)) < Math.abs((fruits[fruits.length-2] - this.secretNumber)) ) {
				console.log("You are getting closer!");
				$('body').css({'background-color': 'red' })
				} else  {
				console.log("You are getting farther!");
				$('body').css({'background-color': 'blue' })
				};
		};

			return false;
		} else {
			console.log(guess + " is correct!");
			console.log(this.secretNumber);

			return true;
		}
	},

};

// instantiate guessingGame
var game = new guessingGame();
// this is for the do while statement
var guessResult = false;

// do while, allow player to guess multiple times
do {
	var guessANumber = prompt("Guess a number yo");
	guessResult = game.guess(guessANumber);
	// the user input at prompt will be the argument 
	//for the instantiated game object's guest property.  we are passing an argument
	// within the method of this object's 
} while (guessResult === false);






})




// 12:27am
$(document).ready(function(){
var fruits = []
// make guessingGame object
guessingGame = function(min, max) {
    this.initialValue(min, max);
    // invokes initialValue on its instance.  
}
// prototype of this object, so later we may instantiate instantiate
guessingGame.prototype = {
	minNumber: 1,
	maxNumber: 10,
	secretNumber: null,

	initialValue: function(min, max) {
		// making these vars accessible
		this.minNumber = min;
		this.maxNumber = max;
		this.generateRandomNumber(); // invokes generateRandomNumber with 
		// because generaterandom number DID not get called, 
		//there was certainly a problem with that before
		// just because there's a function here, DOES NOT mean it gets called. 
		// it is simply declared here, invoked elsewhere.  
	},

	generateRandomNumber: function() {
		this.secretNumber = Math.floor(0 + (Math.random() * 10));
	},

	guess: function(guess) {// this argument is a local variable
		if (guess < this.secretNumber) {
			console.log(guess + " is too low.")
			console.log(this.secretNumber)
			$('#message').html("Guess again!")
			fruits.push(guess);


		if (fruits.length > 2) {
		if ( Math.abs((fruits[fruits.length-1] - this.secretNumber)) < Math.abs((fruits[fruits.length-2] - this.secretNumber)) ) {
				console.log("You are getting closer!");
			/*	$('body').css({'background-color': 'red' }) */
				$('body').removeClass('yellow', 'swing');
				$('body').removeClass('blue', 'swing');
				$('body').addClass('red', 'swing');

				$('#message').html("WARMER")
				} else  {
				console.log("You are getting farther!");
			/* 	$('body').css({'background-color': 'blue' }) */
				$('body').removeClass('yellow', 'swing');
				$('body').removeClass('red', 'swing');
				$('body').addClass('blue', 'swing');
				$('#message').html("COOLER")
				};
		};
			
			return false;
		} else if ( guess > this.secretNumber) {
			console.log(guess + " is too high.")
			$('#message').html("Guess again!")
			console.log(this.secretNumber);
			fruits.push(guess);

		if (fruits.length > 2) {
		if ( Math.abs((fruits[fruits.length-1] - this.secretNumber)) < Math.abs((fruits[fruits.length-2] - this.secretNumber)) ) {
				console.log("You are getting closer!");
			/*	$('body').css({'background-color': 'red' }) */
				$('body').removeClass('yellow', 'swing');
				$('body').removeClass('blue', 'swing');
				$('body').addClass('red', 'swing');

				$('#message').html("WARMER")
				} else  {
				console.log("You are getting farther!");
			/* 	$('body').css({'background-color': 'blue' }) */
				$('body').removeClass('yellow', 'swing');
				$('body').removeClass('red', 'swing');
				$('body').addClass('blue', 'swing');
				$('#message').html("COOLER")
				};
		};

			return false;
		} else {
			$('body').removeClass('red', 'swing');
			$('body').removeClass('blue', 'swing');
			$('body').addClass('yellow', 'swing');
			$('#message').html("<h1>YAYYYY You guessed the correct number!</h1>")
			console.log(guess + " is correct!");
			console.log(this.secretNumber);

			return true;
		}
	},

};

// instantiate guessingGame
var game = new guessingGame();
// this is for the do while statement
var guessResult = false;

// do while, allow player to guess multiple times
/*
do {
	var guessANumber = prompt("Guess a number yo");
	guessResult = game.guess(guessANumber);
	// the user input at prompt will be the argument 
	//for the instantiated game object's guest property.  we are passing an argument
	// within the method of this object's 
} while (guessResult === false); */

$('#submit').click(function() {
	var guessANumber = $('#insertNum').val();
		guessResult = game.guess(guessANumber);
		$('#insertNum').val("");
});
$('#insertNum').keypress(function(e){
	if (e.which == 13) {
		$('#submit').click();
	};
});



})






