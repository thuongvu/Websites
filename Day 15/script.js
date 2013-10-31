$(document).ready(function() {
	for (var i = 1; i < 61; i++){
		createTopDivs();
	}
	$('#timeInButton').click(function(){
		stopWatch();
	});
});

var j = 1;
function createTopDivs() {
	j=j+1;
	$('<div class="topOrig"></div>').attr('id', "num"+j).appendTo('#topContainer');
};

var m = 1;
function createBottomDivs() {
	m=m+1;
	$('<div class="bottomAft"></div>').attr('id', "num2"+m).appendTo('#bottomContainer');
};


var sec = 60;
var clock = 0;
	function stopWatch() {
		clearTimeout(clock);
		sec--;
		clock = setTimeout("stopWatch()", 1000);
		$('#daTime').text("Seconds: " + sec);
		changeTopDivs(); 
		createBottomDivs();
		if (sec <= 0) {
			clearTimeout(clock);
		}
	};

var k = 1;
function changeTopDivs() {
	k=k+1;
	$('#num'+k).addClass("red");
}



