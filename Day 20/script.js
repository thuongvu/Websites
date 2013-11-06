// 1st
$(document).ready(function() {
	$('#inputBigButton').click(function(){
		var youtubeURL = $('#inputBig').val(); 
		var params = {allowScriptAccess: "always",
					allowFullScreen: true
		};
var attObj = {id: "youtubePlayer"}; 
swfobject.embedSWF("http://www.youtube.com/v/" +youtubeURL + "?enablejsapi=1&playerapiid=ytplayer&version=3", 
					"ytapiplayer", "480", "360", "8", null, null, params, attObj);
	});
});

// 2nd
$(document).ready(function() {
	$('#inputBigButton2').click(function(){
		var youtubeURL2 = $('#inputBig2').val(); 
				var params = {allowScriptAccess: "always",
					allowFullScreen: true
		};
var attObj = {id: "youtubePlayer2"}; 
swfobject.embedSWF("http://www.youtube.com/v/" + youtubeURL2 + "?enablejsapi=1&playerapiid=ytplayer2&version=3", 
					"ytapiplayer2", "480", "360", "8", null, null, params, attObj);
	});
});


function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("youtubePlayer");
	ytplayer2 = document.getElementById("youtubePlayer2");
	$('#youtubePlay').click(function() {
		playButton();
	});
	$('#youtubePause').click(function() {
		pauseButton();
	});	
} 

var playButton = function play() {
	if (ytplayer) {
		ytplayer.playVideo();
	};
	if (ytplayer2) {
		ytplayer2.playVideo();
	};	
};

var pauseButton = function play() {
	if (ytplayer) {
		ytplayer.pauseVideo();
	};
	if (ytplayer2) {
		ytplayer2.pauseVideo();
	};	
};



