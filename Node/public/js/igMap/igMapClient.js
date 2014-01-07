$(document).ready(function () {
	var serverBaseUrl = document.domain;
	var socket = io.connect(serverBaseUrl + '/igmap');
	var image;
	var socketId;
	var locations = [];
	var circle;
	var subsID;
	var map;

	socket.on("connection", function(data) {
		socketId = data.id;
		console.log(socketId)
	})

	socket.on("newSubscription", function (data) {
		if (data.socketId == socketId) {
			subsID = data.data;
			console.log(subsID + " is my latest subscription ID")
		}
	})

	var happyMarker = L.AwesomeMarkers.icon({ icon: 'star', markerColor: 'orange' })

			socket.on('newPhoto', function (data) {
				console.log("arrival for data.subscriptionID:" + data.subscriptionID)
				console.log("my subscriptionId is " + subsID)
				if (data.subscriptionID == subsID) {
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
								var marker = L.marker([data.data[0].location.latitude, data.data[0].location.longitude], {icon: happyMarker, opacity: 0.7}).addTo(map);
								marker.bindPopup("<img src='"+ data.data[0].images.thumbnail.url +"'></img>").openPopup();

							}
						})
				}
				
			});
	
	if (navigator.geolocation) {
	     navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	} else {
	    $(".map").text("Your browser isn't supported, sorry :(")
	}

	//callback of geolocate for error
	function positionError ( ){
	  console.log("Sorry, it doesn't work")
	}

	//callback of geolocate for success
	function positionSuccess(position) {
	  var lat = position.coords.latitude;
	  var lng = position.coords.longitude;
	  makeMap(lat,lng)                        
	}

	function addStream(lat, lng) {
		socket.emit("newLocation", {lat: lat, lng: lng, id: socketId});
	}

	function makeMap(lat, lng) {
		$('#map').css("width", $(window).width() - 100)
					.css("height", $(window).height() - 100 )

			map = L.map('map').setView([lat, lng], 12);

		   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		   }).addTo(map);

		   circle = L.circle([lat, lng], 5000, {
		   	color: 'red',
		   	fillColor: 'red',
		   	fillOpacity: 0.3,
		   }).addTo(map);

		   addStream(lat, lng);
		   map.on('click', function (e) {
		   	console.log("you clicked at lat: " + e.latlng)
		   	locations = [];
		   	locations.push(e.latlng);
		   	var latClick = locations[0].lat;
		   	var lngClick = locations[0].lng;

		   	if (circle) {
		   		map.removeLayer(circle);
		   	}
		   	
		   	circle = L.circle([latClick, lngClick], 5000, {
		   		color: 'red',
		   		fillColor: 'red',
		   		fillOpacity: 0.3,
		   	}).addTo(map);

		   	addStream(latClick, lngClick);
		   });
	}

})