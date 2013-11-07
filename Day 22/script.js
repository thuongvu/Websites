$(document).ready(function(){
	var numbers = []
	guessingGame = function(min, max) {
	    this.initialValue(min, max);
	}
	guessingGame.prototype = {
		minNumber: 1,
		maxNumber: 10,
		secretNumber: null,

		initialValue: function() {
			this.generateRandomNumber(); 
		},

		generateRandomNumber: function() {
			this.secretNumber = Math.floor(0 + (Math.random() * 10));
		},

		guess: function(guess) {
			if (guess < this.secretNumber) {
				$('#message').html("Guess again!")
				numbers.push(guess);


			if (numbers.length > 2) {
			if ( Math.abs((numbers[numbers.length-1] - this.secretNumber)) < Math.abs((numbers[numbers.length-2] - this.secretNumber)) ) {
					$('body').removeClass('yellow', 'swing');
					$('body').removeClass('blue', 'swing');
					$('body').addClass('red', 'swing');
					$('#message').html("WARMER")
					} else  {
					$('body').removeClass('yellow', 'swing');
					$('body').removeClass('red', 'swing');
					$('body').addClass('blue', 'swing');
					$('#message').html("COOLER")
					};
			};
				
				return false;
			} else if ( guess > this.secretNumber) {
				$('#message').html("Guess again!")
				numbers.push(guess);

			if (numbers.length > 2) {
			if ( Math.abs((numbers[numbers.length-1] - this.secretNumber)) < Math.abs((numbers[numbers.length-2] - this.secretNumber)) ) {
					$('body').removeClass('yellow', 'swing');
					$('body').removeClass('blue', 'swing');
					$('body').addClass('red', 'swing');
					$('#message').html("WARMER")
					} else  {
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
				return true;
			}
		},
	};

	var game = new guessingGame();
	var guessResult = false;

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




