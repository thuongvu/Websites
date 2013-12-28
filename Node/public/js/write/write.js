$(document).on('ready', function () {
	function sendSentence() {
		var outgoingSentence = $('#sentence').val();
		$.post('/write/postsentence', {
			sentence: outgoingSentence,
		})
	}
// jQuery.post( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )
	function sendSentence() {
		var outgoingSentence = ' ' + $('#sentence').val() + ' ';
		$.post('/write/postsentence', {
			sentence: outgoingSentence,
		}, function (data) {
			console.log(data);
			$('#showStory').html(data);
		})
	}

	$('#send').on('click', sendSentence)
});