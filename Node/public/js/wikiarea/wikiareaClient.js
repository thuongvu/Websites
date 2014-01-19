$(document).ready(function() {
	var map;
	var circle;
	var locations = [];

	$('#map').css("width", $(window).width())
				.css("height", $(window).height())

	map = L.map('map').setView([30, 50], 2);

   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   map.on('click', function (e) {
   	locations = [];
   	locations.push(e.latlng);
   	var latClick = locations[0].lat;
   	var lngClick = locations[0].lng;

   	if (circle) {
   		map.removeLayer(circle);
   	}
   	
   	circle = L.circle([latClick, lngClick], 1000, {
   		color: 'red',
   		fillColor: 'red',
   		fillOpacity: 0.1,
   	}).addTo(map);

   	$('#lat').val(latClick)
   	$('#lng').val(lngClick)
	})

	var happyMarker = L.AwesomeMarkers.icon({ icon: 'flag', markerColor: 'blue' })

	$('#getReq').click(function() {
		var url = "http://api.wikilocation.org/articles?lat=" + $('#lat').val() + "&lng=" + $('#lng').val() + "&limit=50&radius=1000"
		$.get(url, function(data) {
			$('.infoPanel').empty();
			for (var i = 0; i < data.articles.length; i++) {
				var marker = L.marker([data.articles[i].lat, data.articles[i].lng], {icon: happyMarker, opacity: 0.7}).addTo(map);
				marker.bindPopup('<a href="' + data.articles[i].url +'">' + data.articles[i].title + '</a>').openPopup();
				$('.infoPanel').append('<p><a href="' + data.articles[i].url +'">' + data.articles[i].title + '</a></p>')
			}

		})
	})
});