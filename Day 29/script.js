$(document).ready(function(){


// question constructor
function Question(theQuestion, theChoices, theCorrectAnswer) {
	this.question = theQuestion;
	this.choices = theChoices;
	this.correctAnswer = theCorrectAnswer;
	this.userAnswer = "";
}

// all instances of the question object will inherit these methods
Question.prototype.getCorrectAnswer = function() {
	return this.correctAnswer;
};
Question.prototype.getUserAnswer = function() {
	//return this.userAnswer;

	this.userAnswer.forEach(function (theChoice) {
		
	});	

}
Question.prototype.displayQuestion = function() {
	var questionToDisplay = "<div class='question'>" + this.question + "</div><ul>"; 
	
	choiceCounter = 0;

	this.choices.forEach(function (eachChoice) {
		questionToDisplay += '<li><input type="radio" name="choice" value="' + choiceCounter + '">' + eachChoice + '</li>';
		choiceCounter++;
	});
	questionToDisplay += "</ul>";
	console.log(questionToDisplay);
	$('#display').append(questionToDisplay);
};

// first children object of Question object
function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer) {
	// calling the Question constructor so it can inherit from Question
	Question.call(this, theQuestion, theChoices, theCorrectAnswer);
};


function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
   	childObject.prototype = copyOfParent;
}
// ITS BECAUSE I DIDNT FUCKING INVOKE IT HOORAY
inheritPrototype(MultipleChoiceQuestion, Question);

// initializing Question's and adding them to an array

var allQuestions = [
new MultipleChoiceQuestion("What is the capitol of California?", ["Boise", "Seattle", "Sacramento", "San Francisco"], 3)
]

allQuestions.forEach(function (eachQuestion) {
	eachQuestion.displayQuestion();
})

});
