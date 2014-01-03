var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/twitter');

$(document).ready(function() {

	$('#map').css("width", $(window).width() - 100)
				.css("height", $(window).height() - 100)
	var happyTweets = 0;
	var sadTweets = 0;

	var map = L.map('map').setView([0, 0], 2); //global

   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

	
	var happyMarker = L.AwesomeMarkers.icon({ icon: 'home', markerColor: 'orange' })
	var sadMarker = L.AwesomeMarkers.icon({ icon: 'home', markerColor: 'blue' })

	socket.on("data", function (data) {
		console.log(data)

		if (data.symbol === "happy") {
			var marker = L.marker([data.coordinates.coordinates[1], data.coordinates.coordinates[0]], {icon: happyMarker, opacity: 0.7}).addTo(map);
			marker.bindPopup("<table><tr><td><img src='"+ data.image +"'></img></td><td>" + data.text +"</td><tr></table>").openPopup();
			happyTweets++;
			$('#happyCount').text("Happy tweets: " + happyTweets);
		} else if (data.symbol === "sad") {
			var marker = L.marker([data.coordinates.coordinates[1], data.coordinates.coordinates[0]], {icon: sadMarker, opacity: 0.7}).addTo(map);
			marker.bindPopup("<table><tr><td><img src='"+ data.image +"'></img></td><td>" + data.text +"</td><tr></table>").openPopup();
			sadTweets++;
			$('#sadCount').text("Sad tweets: " + sadTweets);
		}
	})

})