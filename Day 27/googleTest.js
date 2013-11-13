$(document).ready(function(){
	$.getJSON('testgoogle.php',
		function(feeds) {
			$.each(feeds.news, function(i, newsPiece) {
				if (newsPiece.image) {
					$('#google-feed').append("<ul><li><table><tr><td><a href ='" +newsPiece.link+ "'><img src='" +newsPiece.image+ "'</></a></td><td><a href ='" +newsPiece.link+ "'><span class='title'>" +newsPiece.title+ "</span></a><a href ='" +newsPiece.link+ "'><div id='blurb'>"+newsPiece.short_story+ "</div></a></td></tr></table></li></ul>");
				} else {
					$('#google-feed').append("<ul><table><tr><td><a href ='" +newsPiece.link+ "'><span class='title'>" +newsPiece.title+ "</span></a><a href ='" +newsPiece.link+ "'><li><div id='blurb'>"+newsPiece.short_story+ "</div></a></td></tr></table></li></ul>");
				}
				console.log(newsPiece.title);
				console.log(newsPiece.image);
				console.log(newsPiece.link);
				console.log(newsPiece.news_source);
				console.log(newsPiece.short_story);
		
			
			})
		});

});

