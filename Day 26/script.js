function calculator() {
};

	calculator.prototype.counter = function() {
	// to count how many times it's been clicked
		var $this = $(this);
		this.clickCounter = $this.data('clickCounter') || 0;
		this.clickCounter += 1;
		$this.data('clickCounter', this.clickCounter);
		if ($('#opIndicator').attr('equals') == 1 ){
			this.clickCounter = 0;	
		}
	};
	calculator.prototype.addVars = function() {
		this.counter();
		// if plus has been clicked less than or equal to one time
		if (this.clickCounter <= 1) {
			this.X = $('#screen').html();
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
