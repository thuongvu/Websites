$(document).ready(function() {
	$('#setName').click(function() {
	   // window.location = 'letitbe/name/' + $('#nameInput').val();
	   window.location = 'name/' + $('#nameInput').val();
	});

	$('#send').on('click', sendWisdom)
	$('#wisdom').keypress(function(e){
		if (e.which == 13) {
			$('#send').click();
		};
	});

	function sendWisdom() {
		var outgoingWisdom = $('#wisdom').val();
		$.post('/letitbe/add', {
			wisdom: outgoingWisdom,
		}, function () {
			console.log("added")
		})
	}

})
