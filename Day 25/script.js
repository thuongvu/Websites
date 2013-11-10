function createDivs() {
	// create 16 divs, then create 16 again. append them to #shuffle
	for (i = 1; i < 21; i++) {
		$('#shuffle').append("<div class='down' num=" + i + "></div>")
		$('#shuffle').append("<div class='down' num=" + i + "></div>")
	}
};

function shuffle(e) {
	// Thank you, Owen!  From here: http://stackoverflow.com/a/315353 
	var replace = $('<div>');
	var size = e.size();

	while (size >= 1) {
		var rand = Math.floor(Math.random() * size);
		var temp = e.get(rand);
		replace.append(temp);
		e = e.not(temp);
		size--;
	}
	$('#shuffle').html(replace.html() );
}

function checkMatch() {
	// if the attribute num is the same in the two .up elements , then---
	if ( $('.up:eq(0)').attr('num') == $('.up:eq(1)').attr('num') ) {
		// remove .test from first .up element, remove .up, add .matched
		$('.up:eq(0)').removeClass('test').removeClass('up').addClass('matched');
		// remove .test from second .up element, remove .up, add .matched
		// note, also eq(0) because when you remove the first up.eq0, then there's none left!  therefore, you gotta start from the 0 part of index again
		$('.up:eq(0)').removeClass('test').removeClass('up').addClass('matched');
	} else {
		// else if the attribute num is not the same, then--- remove .test, remove .up, add .down 
		$('.up:eq(0)').removeClass('test').removeClass('up').addClass('down').empty();
		$('.up:eq(0)').removeClass('test').removeClass('up').addClass('down').empty();
	}	
};

$(document).ready(function(){
	createDivs();
	shuffle($('#shuffle div'));

	$('.down').hover(function(){
		$(this).toggleClass('hover');
	})

	$('.down').click(function(){
		// counts how many .up classes are in the DOM
		var countUps = $('.up').length;
		// if there is 1 .up in the DOM, do this---
		if (countUps < 1) {
			// remove .down, add .up---- on click
			$(this).toggleClass('down').toggleClass('up');
			// show a picture
			var numAttr = $(this).attr('num');
			$(this).append("<img src='images/" +numAttr+ ".png'></img>") 
			// add .test to the first .up element 
			$('.up:eq(0)').addClass('test');
		// else if there are 2 .up's in the DOM, do this----- on click
		} else if (countUps < 2){
			// remove .down on the element clicked, add .up, add .test to the second .up element
			$(this).toggleClass('down').toggleClass('up');
			// show a picture
			var numAttr = $(this).attr('num');
			$(this).append("<img src='images/" +numAttr+ ".png'></img>")
			$('.up:eq(1)').addClass('test');
			// check if there is a match between the two elements with .test class, give player half a second to look at it before .down class is added again
			setTimeout(function(){
				checkMatch();
				}, 500);
		}  else {
			return false;
		}
	});
});
