
$(document).ready(function() {
    $('html, body').animate({scrollTop: $(document).height()-$(window).height()}, 300);
	var y = '';
	var x = '';

	$(document).mousemove(function(e) {
		y = e.pageY;
		x = e.pageX;
	}).click(function(){
		$('body').append(
			$('<div class="balloons"><img src="balloonpurple.png" height="100"></></div>')
			.css({'top': y, 'left': x})
			.animate({ top: "-=2700"}, 10000, function()
				{ $(this).remove();
				})
			);
	});
});
