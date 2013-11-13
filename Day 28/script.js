// loads iframe player api code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(document).ready(function() {
	$('#sam').click(function(){
		if ( $('#userInput').val() ){
			$('#sam').effect('shake', {direction: 'down'}).delay(1500).slideUp();
			$('#userInput').delay(1500).fadeOut();
			$('#instructions').delay(1500).fadeOut();
			setTimeout(videoAll, 2000);
		} else {
			$('#message').fadeIn().html("<p>(Ask me a G'DAMN question before you click that again.)</p>");
			$('#message').delay(5000).fadeOut();
		};
	});
	$('#userInput').keypress(function(e){
		if (e.which == 13) {
			$('#sam').click();
		};
	});
});

	function videoAll() {
	    var	player = new YT.Player('player', {
	        	height: '390',
	          	width: '640',
	         	playerVars: {
	          		controls: 0,
	          		enablejsapi: 1,
	          		modestbranding: 0,
	          		rel: 0,
	          		showinfo: 0,
	          		iv_load_policy: 3,
	          		disablekb: 1
	          	},
	          	events: {
	            	'onReady': onPlayerReady, 
	          	}
	        });

	    function onPlayerReady(event) { 

	    	var chosenVideo = Math.floor(Math.random() * 10);
	    	switch (chosenVideo){
	    	case 0:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 16, 'endSeconds': 19, 'suggestedQuality': 'small'});
	    	break;
	    	case 1: 
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 19.2, 'endSeconds': 22, 'suggestedQuality': 'small'});
	    	break;
	    	case 3:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 93, 'endSeconds': 96, 'suggestedQuality': 'small'});
	    	break;
	    	case 4:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 99, 'endSeconds': 103.5, 'suggestedQuality': 'small'});
	    	break
	    	case 5:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 130.7, 'endSeconds': 134.4, 'suggestedQuality': 'small'});
	    	break;
	    	case 6:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 155, 'endSeconds': 157, 'suggestedQuality': 'small'});
	    	break;
	    	case 7:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 208, 'endSeconds': 215, 'suggestedQuality': 'small'});
	    	break;
	    	case 8:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 237.5, 'endSeconds': 238.8, 'suggestedQuality': 'small'});
	    	break;
	    	case 9:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 281.8, 'endSeconds': 285.9, 'suggestedQuality': 'small'});
	    	break;
	    	case 10:
	    	player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 407.5, 'endSeconds': 409.5, 'suggestedQuality': 'small'});
	    	break;
	    	}
	    }
	};