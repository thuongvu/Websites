// an object for generating math problems
var genMathProb = function() {
	// method of the object called RESET.  THIS refers to to whichever object calls the method at runtime. so that reset method can be called again and again
	this.reset = function() {
		// make an empty array called num
		this.num = [];
		// a for statement that pushes numbers 0-49 into the array called num, 
		for (i = 0; i < 50; i++) {
			this.num.push(i);
		}
		// new variables x & y assigned to a random value from the array
		this.xFirst = this.num[Math.floor(Math.random() * 50)];
		this.yFirst = this.num[Math.floor(Math.random() * 50)];

		if (this.xFirst > this.yFirst) {
			this.x = this.xFirst;
			this.y = this.yFirst;
		} else {
			this.x = this.yFirst;
			this.y = this.xFirst;
		}

		// new variable for user input
		this.userInput = '';
		// variable used to check whether the user input is the correct answer
		this.z = this.x - this.y;
		// 2 if statements: if variable x or y is less than 10, add spaces so the numbers are aligned when adding, write to html doc 
		// (aligned numbers really helped me as a kid when i was adding)
		// if variables x and y are greater than 10, just write to html doc
		if (this.x < 10) {
			$('#xGoesHere').html('<table><tr><tr>' + '&nbsp;&nbsp;' + this.x + '</tr></td></table>');
		} else {
			$('#xGoesHere').html('<table><tr><tr>' + this.x + '</tr></td></table>');
		}

		if (this.y < 10) {
			$('#yGoesHere').html('<table><tr><tr>' + '&nbsp;&nbsp;' + this.y + '</tr></td></table>');
		} else {
			$('#yGoesHere').html('<table><tr><tr>' + this.y + '</tr></td></table>');
		}
	};
};

// object called pokeContainer used to generate random pokemon images
var pokeContainer = function() {
	// method called pokeNew, so I can run this again and again
	this.pokeNew = function() {
		// empty array called pokemon
		this.pokemon = [];
		// for statement that pushes all 150 pictures into the array called pokemon
		for (i = 1; i <= 150; i++) {
			this.pokemon.push('images/' + i + '.png');
		}
		// variable called randPokemon is assigned the value of a randomly chosen picture from the array called pokemon
		this.randPokemon = this.pokemon[Math.floor(Math.random() * 150)];
	};
};

$(document).ready(function() {
	// newProblem is a new object...  when i make a new constructor, making a new class
	// newProblem will therefore have the properties and methods as genMathProb 
	var newProblem = new genMathProb();
	// set the value of counter to zero.  will be used later to count how many problems user gets correct
	var counter = 0;
	// poke is a  object.  a new class of pokeContainer
	var poke = new pokeContainer();
	// newProblem is the object.  I call the reset() method, a method inherited from the getMathProb object.
	// this runs reset(), which generates numbers to add and writes that to the html
	newProblem.reset();

	// when the user is within the xPlusY field, and presses enter, it will "click" the submit button.
	$('#xPlusY').keypress(function(e){
		if (e.which == 13) {
			$('#submit').click();
		};
	});

	// when the user clicks the id on the page labeled submit...
	$('#submit').click(function() {
		// the userInput variable is set to the value the user inputs in the #xPlusY field
		userInput = $('#xPlusY').val();
		// if the userInput (parsed, meaning, it is converted from string to number) is equal to the property z of newProblem,
		// (and z is the value of x + y), then do this...  (in english, if the user inputs the correct number, do this)
		if ( parseInt(userInput) === newProblem.z) {
			// display a message saying 'correct', fade it out in 1 second, reset the value of tine xPlusY field, run reset() on the newProblem object
			$('#message').html('Correct!').fadeIn();
			$('#message').delay(1000).fadeOut();
			$('#xPlusY').val('');
			newProblem.reset();
			// AND run the pokeNew() method on the poke object.  the method returns a randPokemon property (a random image)
			poke.pokeNew();
			$('#pokemonNames').append('<img src="/poke-math/' + poke.randPokemon + '"height="72"</>');
			// AND add 1 to the counter, to signify that the user has answered 1 more correct question, write it to HTML doc
			counter+=1;
			$('#counter').html("You've caught " + counter + " Pokemon!")

		} else { // else if the user inputs a wrong number, display a message saying 'Try again!', fade it out in 2 seconds, reset the value of the field
			$('#message').html('Try again!').fadeIn();
			$('#message').delay(2000).fadeOut();
			$('#xPlusY').val('');
		};
	});
});
