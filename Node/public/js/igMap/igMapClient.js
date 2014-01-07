$(document).ready(function () {
	var serverBaseUrl = document.domain;
	var socket = io.connect(serverBaseUrl + '/igmap');
	var image;

	var happyMarker = L.AwesomeMarkers.icon({ icon: 'star', markerColor: 'orange' })

	function streamPhotos() {
		socket.on('newPhoto', function (data) {
			var url = data.data;
			console.log(data)
			req =	$.ajax({
					url: url,
					type: 'GET',
					crossDomain: true,	
					dataType: 'jsonp'
				}).done(function(data) {
					for (var i = 0; i < data.data.length; i++) {
						console.log(data)
						console.log(data.data[0].location.latitude)
						console.log(data.data[0].location.longitude)
						image = data.data[i].images.low_resolution.url;
						// $('#imageContainer').prepend('<img src="' + image + '" />')

						var marker = L.marker([data.data[0].location.latitude, data.data[0].location.longitude], {icon: happyMarker, opacity: 0.7}).addTo(map);
						marker.bindPopup("<img src='"+ data.data[0].images.thumbnail.url +"'></img>").openPopup();

					}
				})
		});
	}
	





	streamPhotos();

	$('#pause').click(function() {
		socket.removeAllListeners("data")
		console.log("paused stream")
	})
	$('#resume').click(function() {
		streamPhotos();
	})
	$('#addStream').click(function() {
		var lat = $('#latitude').val();
		var lng = $('#longitude').val();
		// addStream(37.7833, -122.4167);
		addStream(lat, lng);
	})

	function addStream(lat, lng) {
		socket.emit("newLocation", {lat: lat, lng: lng});
	}


var locations = [];
var circle;

	$('#map').css("width", $(window).width() - 100)
				.css("height", $(window).height() - 100 )

		// var map = L.map('map').setView([0, 0], 2);
		var map = L.map('map').setView([40.69, -73.99], 12);
		// 40.6928° N, 73.9903° W

	   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	   }).addTo(map);

	 function onMapClick(e) {
	 	console.log("you clicked at lat: " + e.latlng)
	 	locations = [];
	 	locations.push(e.latlng);
	 	var latClick = locations[0].lat;
	 	var lngClick = locations[0].lng;

	 	if (circle) {
	 		map.removeLayer(circle);
	 	}
	 	
	 	circle = L.circle([latClick, lngClick], 2000, {
	 		color: 'red',
	 		fillColor: 'red',
	 		fillOpacity: 0.3,
	 	}).addTo(map);

	 	addStream(latClick, lngClick);

	 }

	 map.on('click', onMapClick);


})