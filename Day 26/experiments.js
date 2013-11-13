// 3:09 PM--------------------------------------------------------------------------------------------//
$(document).ready(function() {
	$('#plus').click(function() {
		
		// to count how many times it's been clicked
		var $this = $(this);
		var clickCounter = $this.data('clickCounter') || 0;
		clickCounter += 1;
		$this.data('clickCounter', clickCounter);
		console.log("Plus has been clicked " + clickCounter + " times");

		// if plus has been clicked less than or equal to one time
		if (clickCounter <= 1) {
			var screenValX = $('#screen').html();
			console.log('screenValX is: ' + screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (clickCounter >= 2) {
			var screenValY = $('#screen').html();
			console.log('screenValY is: ' + screenValY);	
			$('#screen').html('');	
		};
	})
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};

// -------------------------------------------- 4:37PM -------------------------------------------------------------------- //

function plusFunc() {
		this.name = "hello";
		this.X = $('#screen').text();
	/*	$('#plus').click(function() {
		
		// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		console.log("Plus has been clicked " + this.clickCounter + " times");

		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.screenValX = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (this.clickCounter >= 2) {
			this.screenValY = $('#screen').html();
			console.log('screenValY is: ' + this.screenValY);	
			$('#screen').html('');	
		};
	}) */
};


$(document).ready(function() {
	/* make buttons on page
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};
	*/
	// new instance of plusfunc 
	var runPlus = new plusFunc();
	var varX = $('#screen').html();
	$('#plus').click(function() {
		alert($('#screen').html()[0]);
		console.log($('#screen').html()[0]);
		});
	
	$("#button1").click(function() {
		$('#screen').text(1);
	});
	

	$('#equals').click(function(){
		console.log(runPlus.clickCounter);
	});

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};



// ----------------------------------------------- 5:15PM ----------------------------------------------- confused --------//
function plusFunc() {
		this.name = "hello";
		this.X = $('#number').val();
		this.Y = this.X + this.X;
	/*	$('#plus').click(function() {
		
		// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		console.log("Plus has been clicked " + this.clickCounter + " times");

		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.screenValX = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (this.clickCounter >= 2) {
			this.screenValY = $('#screen').html();
			console.log('screenValY is: ' + this.screenValY);	
			$('#screen').html('');	
		};
	}) */
};


$(document).ready(function() {
	/* make buttons on page
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};
	*/
	// new instance of plusfunc 
	var runPlus = new plusFunc();
	

	$('#plus').click(function() {
		var varX = $('#number').val();
		runPlus.X = $('#number').val();
		console.log("runPlus.X is " + runPlus.X);
		console.log( parseInt(runPlus.X) + parseInt(3));
		console.log("runPlus.Y is " + runPlus.Y);
		});
	
	$("#button1").click(function() {
		$('#number').val(parseInt(1));
	});
	

	$('#equals').click(function(){
		console.log(runPlus.clickCounter);
	});

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};



// ------------------- 6:04 pm -------------------------------------- //
var plusFunc = function() {		
	plusFuncMethod = function() {
		// if plus has been clicked less than or equal to one time
		if (clickCounter <= 1) {
			console.log('screenValX from within the scope is: ' + this.screenValX);
			$('#number').val('');	
		};

		// if plus has been clicked more than or equal to 2
		if (clickCounter >= 2) {
			this.screenValY = $('#number').val();
			console.log('screenValY from within the scope is: ' + this.screenValY);	
			$('#number').val('');		
		};
	};
};


$(document).ready(function() {
	/* make buttons on page
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};
	*/
		// count clicks
		var $this = $(this);
		clickCounter = $this.data('clickCounter') || 0;
		clickCounter += 1;
		$this.data('clickCounter', clickCounter);
		console.log("Plus has been clicked " + clickCounter + " times");
	// new instance of plusfunc 	
	var runFunc =  new plusFunc();

	$('#plus').click(function() {

		// run plusFunc()
		alert("runFunc.screenValX's value is " + runFunc.screenValX);
	});

	$("#button1").click(function() {
		$('#number').val(parseInt(1));
	});
	

	$('#equals').click(function(){
		console.log(runPlus.clickCounter);
	});

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};



// ---------------------------------------------------------- 633 pm ------------------------------//
	$('#plus').click(function() {
		
		// to count how many times it's been clicked
		var $this = $(this);
		var clickCounter = $this.data('clickCounter') || 0;
		clickCounter += 1;
		$this.data('clickCounter', clickCounter);
		console.log("Plus has been clicked " + clickCounter + " times");

		// if plus has been clicked less than or equal to one time
		if (clickCounter <= 1) {
			var screenValX = $('#screen').html();
			console.log('screenValX is: ' + screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (clickCounter >= 2) {
			var screenValY = $('#screen').html();
			console.log('screenValX is: ' + screenValX);	
			console.log('screenValY is: ' + screenValY);	
			$('#screen').html('');	
		};

		$('#equals').click(function(){
			var screenValY = $('#screen').html();
			var screenValZ = parseInt(screenValX) + parseInt(screenValY);
			console.log(screenValZ);
		}); 

	});
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};

// -------------------------- 710pm making progress ----------------------------------- //
function plus() {
};
	plus.prototype.plusTest = function() {

		// to count how many times it's been clicked
		var $this = $(this);
		var clickCounter = $this.data('clickCounter') || 0;
		clickCounter += 1;
		$this.data('clickCounter', clickCounter);
		console.log("Plus has been clicked " + clickCounter + " times");

		// if plus has been clicked less than or equal to one time
		if (clickCounter <= 1) {
			this.screenValX = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (clickCounter >= 2) {
			this.screenValY = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			console.log('screenValY is: ' + this.screenValY);	
			$('#screen').html('');	
		};

	};

$(document).ready(function() {
	var runPlus = new plus();
	$('#plus').click(function() {
		runPlus.plusTest();
		}); 

	$('#equals').click(function(){
			runPlus.screenValY = $('#screen').html();
			$('#screen').html('');	
		console.log("runPlus.screenValX is " + runPlus.screenValX + " and runPlus.screenValY is " + runPlus.screenValY);
		
		var screenValZ = parseInt(runPlus.screenValX) + parseInt(runPlus.screenValY);
		console.log(screenValZ);
	});
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};


// -------------------------------------- 11-10-13 ------------------------------------------- //
function plus() {
};

	plus.prototype.counter = function() {
	// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		console.log("Button has been clicked " + this.clickCounter + " times");
	};
	plus.prototype.plusTest = function() {
		this.counter();
		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.screenValX = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (this.clickCounter >= 2) {
			this.screenValY = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			console.log('screenValY is: ' + this.screenValY);	
			$('#screen').html('');	
		};
	};

$(document).ready(function() {
	var runPlus = new plus();
	$('#plus').click(function() {
		runPlus.plusTest();
		// toggle a class/attribute that says PLUS.  where would i add this class to?
		$('#opIndicator').attr('operator', 'plus'); 
		}); 
	// lets say i make a minus
	$('#minus').click(function() {
		runPlus.plusTest(); // is for storing variables 
		// toggle a class/attribute that says MINUS
		}); 	

	$('#equals').click(function(){
		// reads the class, if it's plus/minus/etc, then DO BLAH.  ============================== START HERE
			
			runPlus.screenValY = $('#screen').html();
			$('#screen').html('');	
		console.log("runPlus.screenValX is " + runPlus.screenValX + " and runPlus.screenValY is " + runPlus.screenValY);
		
		var screenValZ = parseInt(runPlus.screenValX) + parseInt(runPlus.screenValY);
		console.log(screenValZ);
	});
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};



// ------------------------------------ 11-10-13 ----------------------------------- //
function plus() {
};

	plus.prototype.counter = function() {
	// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		console.log("Button has been clicked " + this.clickCounter + " times");
	};
	plus.prototype.plusTest = function() {
		this.counter();
		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.screenValX = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			$('#screen').html('');	
		};

		// if plus has been clicked more than or equal to 2
		if (this.clickCounter >= 2) {
			this.screenValY = $('#screen').html();
			console.log('screenValX is: ' + this.screenValX);	
			console.log('screenValY is: ' + this.screenValY);	
			$('#screen').html('');	
		};
	};

$(document).ready(function() {
	var runPlus = new plus();
	$('#plus').click(function() {
		runPlus.plusTest();
		// toggle a class/attribute that says PLUS.  where would i add this class to?
		$('#opIndicator').attr('operator', 'plus'); 
		}); 
	// lets say i make a minus
	$('#minus').click(function() {
		runPlus.plusTest(); // is for storing variables 
		// toggle a class/attribute that says MINUS
		}); 	

	$('#equals').click(function(){
		// reads the class, if it's plus/minus/etc, then DO BLAH.  ============================== START HERE
		// enters in Y, then clears #screen
		runPlus.screenValY = $('#screen').html();
		$('#screen').html('');	
		// if statement
		if ( $('#opIndicator').attr('operator') == 'plus' ){
			console.log("runPlus.screenValX is " + runPlus.screenValX + " and runPlus.screenValY is " + runPlus.screenValY);
		} else {
			return false;
		}

		
		
		var screenValZ = parseInt(runPlus.screenValX) + parseInt(runPlus.screenValY);
		console.log(screenValZ);
	});
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};

/*	$('#equals').click(function(){
		console.log(eval(screenValX + screenValY)); 
	}) */

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};















// ------------ 1029pm -------------- //
function calculator() {
};

	calculator.prototype.counter = function() {
	// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		console.log("Button has been clicked " + this.clickCounter + " times");
		if ($('#opIndicator').attr('equals') == 1 ){
			this.clickCounter = 0;	
		}
	};
	calculator.prototype.addVars = function() {
		this.counter();
		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.X = $('#screen').html();
			console.log('X is: ' + this.X);	
			$('#screen').html('');	
		};
	};
	
	calculator.prototype.calculate = function() {
		
	}

$(document).ready(function() {
	var runCalc = new calculator();
	$('#plusButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'plusSign'); 
		}); 

	$('#minusButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'minusSign'); 
		}); 	

	$('#multiplyButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'multiplySign'); 
		}); 		

	$('#divideButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'divideSign'); 
		}); 	

	$('#equals').click(function(){
		// enters in Y, then clears #screen
		runCalc.Y = $('#screen').html();
		$('#screen').html('');	
		// if statement

		var OperatorAttribute = $('#opIndicator').attr('operator');
		$('#opIndicator').attr('equals', '1'); 	
		var X = parseInt(runCalc.X);
		var Y = parseInt(runCalc.Y);
		if ( OperatorAttribute == 'plusSign' ){
			var Z = X + Y;
		} else if ( OperatorAttribute == 'minusSign' ) {
			var Z = X - Y;			
		} else if ( OperatorAttribute == 'multiplySign'  ) {
			var Z = X * Y;
		} else if (OperatorAttribute == 'divideSign' ) {
			var Z = X / Y;			
		};
		console.log(Z);
	});
	for (i = 1; i < 10; i++) {
		assignButtonNum(i);
	};

});

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};



// ----------- 12:11am----------------------------//
function calculator() {
};

	calculator.prototype.counter = function() {
	// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		console.log("Button has been clicked " + this.clickCounter + " times");
		if ($('#opIndicator').attr('equals') == 1 ){
			this.clickCounter = 0;	
		}
	};
	calculator.prototype.addVars = function() {
		this.counter();
		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.X = $('#screen').html();
			console.log('X is: ' + this.X);	
			$('#screen').html('');	
		};
	};
	
	calculator.prototype.calculate = function() {
		this.Y = $('#screen').html();
		$('#screen').html('');
		var OperatorAttribute = $('#opIndicator').attr('operator');
		$('#opIndicator').attr('equals', '1'); 	
		var XX = parseInt(this.X);
		var YY = parseInt(this.Y);
		if ( OperatorAttribute == 'plusSign' ){
			var Z = XX + YY;
		} else if ( OperatorAttribute == 'minusSign' ) {
			var Z = XX - YY;			
		} else if ( OperatorAttribute == 'multiplySign'  ) {
			var Z = XX * YY;
		} else if (OperatorAttribute == 'divideSign' ) {
			var Z = XX / YY;			
		};
		console.log(Z);	
		$('#screen').html(Z);	

		for (i = 0; i < 10; i++) {
		NumAftEqual(i);
		};	
	}

function assignButtonNum(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {
		$('#screen').append( parseInt(num) );
	});
};

function NumAftEqual(num) {
	var numberBut = "#button" + num;
	$(numberBut).click(function() {

	if ($('#opIndicator').attr('equals') == 1 ){
		$('#screen').html('');	
		} else {
			return false;
		}
		$('#screen').append( parseInt(num) );
		$('#opIndicator').attr('equals', '0'); 	
	});
};

$(document).ready(function() {
	var runCalc = new calculator();
	$('#plusButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'plusSign'); 
		}); 

	$('#minusButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'minusSign'); 
		}); 	

	$('#multiplyButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'multiplySign'); 
		}); 		

	$('#divideButton').click(function() {
		runCalc.addVars();
		$('#opIndicator').attr('operator', 'divideSign'); 
		}); 	

	$('#equals').click(function(){	
		runCalc.calculate();
	});

	$('#ac').click(function(){
		$('#screen').html('');
		this.clickCounter = 0;	
	})
	for (i = 0; i < 10; i++) {
		assignButtonNum(i);
	};

});

