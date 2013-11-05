SC.initialize({
	client_id: "f5990c3cbb71cd146d93be7d4f3d6394",
	redirect_uri: "http://thuongvuho.com/soundcloud/callback.html"
});

$(document).ready(function() {
	$('#startRecord').click(function(e) {
		e.preventDefault;
		$('#startRecord').hide();
		$('#stopRecord').show();
		SC.record({
			progress: function(ms) {
				updateTimer(ms)
			}
		});
	});

	$('#stopRecord').click(function(e) {
		e.preventDefault;
		$('#startRecord').show();
		$('#stopRecord').hide();
		$('#playBack').show();
		$('#upload').show();
		SC.recordStop();
		});

	$('#playBack').click(function(e) {
		e.preventDefault;
		SC.recordPlay();
		});

	$('#upload').click(function(e) {
		e.preventDefault;
		SC.connect({
			connected: function() {
				SC.recordUpload( {
					track: {
						title: "Recording from Thuongvu's website",
						sharing: "public"
					}
				});
				SC.get('/me/tracks', {limit: 1}, function(tracks) {
					if (tracks[0].state = 'finished') {
						SC.oEmbed(tracks[0].permalink_url, {color: "ff0066"},  document.getElementById("embedHere"));	
			}
		);
			}
		});
	});	


	function updateTimer(ms) {
		$('#timer').text(SC.Helper.millisecondsToHMS(ms))
	}
});



