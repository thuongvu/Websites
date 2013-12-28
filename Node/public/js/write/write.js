$(document).on('ready', function () {
	function sendSentence() {
		var outgoingSentence = $('#sentence').val();
		$.post('/write/postsentence', {
			sentence: outgoingSentence,
		})
	}
var story = [];
	function sendSentence() {
		var outgoingSentence = ' ' + $('#sentence').val() + ' ';
		$.post('/write/postsentence', {
			sentence: outgoingSentence,
		}, function (data) {
			data.forEach(function (data) {
				story += data.sentence
			})
			$('#showStory').html(story);
			$('.hideAfterAdd').hide();
		})
	}

	$('#send').on('click', sendSentence)
	$('#sentence').keypress(function(e){
		if (e.which == 13) {
			$('#send').click();
		};
	});
});