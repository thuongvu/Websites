navigator.geolocation.getCurrentPosition(success, error);

function success(pos) {
	var crd = pos.coords;
	$('#position').html('<p> Your current position is: Latitude: ' + crd.latitude + '   Longitude: ' + crd.longitude + '</p>')
	$.ajax({
		url:'http://geocoder.ca/?latt=' + crd.latitude + '&longt=' + crd.longitude + '&reverse=1&allna=1&geoit=xml&corner=1&jsonp=1&callback=getLocation',
		dataType: 'jsonp',
		jsonpCallback: 'getLocation',
	})
};

function error(err) {
  	console.warn('ERROR(' + err.code + '): ' + err.message);
};


function getLocation(response) {
	$('#locationName').html("<h1>How's the weather in " + response.city + "?");
	$('#status').html("Loading <img src='481.GIF'></img>");
	$.ajax({
		url:'https://george-vustrey-weather.p.mashape.com/api.php?location=' + response.city, // leave as LA for now
		type: 'GET',
		datatype: 'json',
		success: function(data) {
		 	var jsonInfo2 = data;
			$('#table0').html('<tr><td>' + jsonInfo2[0].day_of_week + '</td></tr><tr><td>' + Math.round(jsonInfo2[0].high) + '</td></tr><tr><td>' + Math.round(jsonInfo2[0].low) + '</td></tr><tr><td>' + jsonInfo2[0].condition + '</td></tr>')
		 	$('#table1').html('<tr><td>' + jsonInfo2[1].day_of_week + '</td></tr><tr><td>' + Math.round(jsonInfo2[1].high) + '</td></tr><tr><td>' + Math.round(jsonInfo2[1].low) + '</td></tr><tr><td>' + jsonInfo2[1].condition + '</td></tr>') 
		 	$('#table2').html('<tr><td>' + jsonInfo2[2].day_of_week + '</td></tr><tr><td>' + Math.round(jsonInfo2[2].high) + '</td></tr><tr><td>' + Math.round(jsonInfo2[2].low) + '</td></tr><tr><td>' + jsonInfo2[2].condition + '</td></tr>')   
		 	$('#table3').html('<tr><td>' + jsonInfo2[3].day_of_week + '</td></tr><tr><td>' + Math.round(jsonInfo2[3].high) + '</td></tr><tr><td>' + Math.round(jsonInfo2[3].low) + '</td></tr><tr><td>' + jsonInfo2[3].condition + '</td></tr>')				   
			$('#status').remove();
		 },
		error: function(err) {console.log(err); },
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Mashape-Authorization", "OFnRuWJsY2TwdrEtByGzVfB4y7q37hJm");
		}
	});
};








