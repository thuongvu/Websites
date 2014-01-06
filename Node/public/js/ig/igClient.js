$(document).ready(function () {
	var serverBaseUrl = document.domain;
	var socket = io.connect(serverBaseUrl + '/ig');
	var image;



	socket.on('newPhoto', function (data) {
		var url = data.data;
		console.log(data)
		
			$.ajax({
				url: url,
				type: 'GET',
				crossDomain: true,	
				dataType: 'jsonp'
			}).done(function(data) {
				for (var i = 0; i < data.data.length; i++) {
					image = data.data[i].images.low_resolution.url;
					// console.log(data.data[i].images.low_resolution.url)
					$('#imageContainer').prepend('<img src="' + image + '" />')
				}
			})
			
	});





})

