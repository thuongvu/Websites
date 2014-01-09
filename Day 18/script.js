
$(document).ready(function() {
		$('#moviesOpening').click(function() {
			$('#moviesOpening').html("<span class='glyphicon glyphicon-random'>&nbsp;<span>Loading</span>");
			$.ajax({
				url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=cfgemr7rvkj9uvtpge95kc6d&limit=16",
				dataType: "jsonp",
				jsonpCallback: "opening", 
				complete: function(){
					$('#moviesOpening').html("<span class='glyphicon glyphicon-film'></span>&nbsp;&nbsp;<span>Just Opening</span>")	
				}
			});
		});

		$('#moviesInTheaters').click(function() {
			$('#moviesInTheaters').html("<span class='glyphicon glyphicon-random'>&nbsp;<span>Loading</span>");
			$.ajax({
				url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=cfgemr7rvkj9uvtpge95kc6d&page_limit=16",
				dataType: "jsonp",
				jsonpCallback: "inTheaters", 
				complete: function(){
					$('#moviesInTheaters').html("<span class='glyphicon glyphicon-film'></span>&nbsp;&nbsp;<span>In Theaters Now</span>")
				}
			});
		});

		$('#moviesUpcoming').click(function() {
			$('#moviesUpcoming').html("<span class='glyphicon glyphicon-random'>&nbsp;<span>Loading</span>");
			$.ajax({
				url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=cfgemr7rvkj9uvtpge95kc6d&page_limit=16",
				dataType: "jsonp",
				jsonpCallback: "upcoming", 
				complete: function(){
					$('#moviesUpcoming').html("<span class='glyphicon glyphicon-film'></span>&nbsp;&nbsp;<span>Coming Soon</span>")
				}
			});
		});		
	});



function opening(response) {
	$('#list').empty();
	console.log(response)
	$.each(response.movies, function(i, movie) {
		$('#list').append("<a href ='" +movie.links.alternate+ "'><img class='poster' src='" +movie.posters.detailed+ "' height='203' width='140' </></a>");
	});
}
function inTheaters(response) {
	$('#list').empty();
	$.each(response.movies, function(i, movie) {
		$('#list').append("<a href ='" +movie.links.alternate+ "'><img class='poster' src='" +movie.posters.detailed+ "' height='203' width='140' </></a>");
	});
}
function upcoming(response) {
	$('#list').empty();
	$.each(response.movies, function(i, movie) {
		$('#list').append("<a href ='" +movie.links.alternate+ "'><img class='poster' src='" +movie.posters.detailed+ "' height='203' width='140' </></a>");
	});
}

