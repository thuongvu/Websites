/* "flipping" a coin*/
var headstails = Math.random();

function userSubmit() {
	if (headstails < 0.5) {
		var textInputted=document.getElementById('userChoice1').value;
		var choiceLost=document.getElementById('userChoice2').value;
		document.getElementById('result').innerHTML=
		'You should pick '+textInputted + '.  Were you hoping that it would be ' +choiceLost +'?';
	}
	else {
		var textInputted=document.getElementById('userChoice2').value;
		var choiceLost=document.getElementById('userChoice1').value;
		document.getElementById('result').innerHTML=
		'You should pick '+textInputted + '.  Were you hoping that it would be ' +choiceLost +'?';
	}
}; 

/* my brainstorm/blueprint
prompt --> variable for choice1 --> return
prompt --> variable for choice2 --> return

function then takes choice1, choice 2
math.random
choice1 < 0.5
choice2 > 0.5

if choice1, then console.log it - along with - are you disappointed it chose this?

if choice2, then console.log it - along with - are you disappointed it chose this?
 
another option here? */

