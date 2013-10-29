function wutTheTime() {
	var d = new Date();
	var hoursMilitary = d.getHours();
	var hours = d.getHours();
	if (hours > 12) {
		var hoursAMPM = (hours + 11) % 12 + 1;
	} else {
		var hoursAMPM = hours;
	}
	var minutes = d.getMinutes();
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
	var seconds = d.getSeconds();
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
	if (hours > 12) {
		var amORpm = 'PM'
	} else {
		var amORpm = 'AM'
	}
	return {
		milHours : hoursMilitary,
		ampm : amORpm,
		hh : hoursAMPM,
		mm : minutes,
		ss : seconds
	}
}

$(document).ready(function() {
    setInterval(function() {
    	var time = wutTheTime();
    	if (time.milHours >= 6 && time.milHours < 9 ) {
    		$('body').removeClass('night');
    		$('body').addClass('sunrise');
    	} else if (time.milHours >= 9 && time.milHours < 18) {
    		$('body').removeClass('sunrise');
    		$('body').addClass('noon');
    	} else if (time.milHours >= 18 && time.milHours < 19) {
    		$('body').removeClass('noon');
    		$('body').addClass('sunset');    		
    	} else {
    		$('body').removeClass('sunset');
    		$('body').addClass('night');       		
    	}; 
        $('#time').text(time.hh + ':' + time.mm + ':' + time.ss + time.ampm);
    }, 1000);
});

