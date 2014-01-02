var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/yousee');

$(document).ready(function() {

	

	function loadVideo(youtubeURL, callback) {
		var params = {
			allowScriptAccess: "always",
			allowFullScreen: true
		};
		var attObj = {id: "youtubePlayer"}; 
		swfobject.embedSWF("http://www.youtube.com/v/" +youtubeURL + "?enablejsapi=1&playerapiid=ytplayer&version=3", 
					"ytapiplayer", "480", "360", "8", null, null, params, attObj);
		if (callback) {
			callback()
		}

		ytplayer = document.getElementById("youtubePlayer");

	}

	$('#loadVideo').click(function(){
		youtubeURL = $('#urlInput').val(); // needs to be global???
		loadVideo(youtubeURL);
		socket.emit("loadVideo", {url: youtubeURL});
	});

	socket.on('loadVideoBroadcast', function (data) {
		loadVideo(data.url)
	});

	// check if there is a "broadcaster", if there is, emit "connected"

	var broadcast = 0;

	socket.on("currentTimeBroadcast", function (data) {
		broadcast = 1;
	})

	setTimeout(function () {
		if (broadcast == 1) {
		socket.emit("connected")
	}
}, 1000)
	
	// on "connected", the server sends back "askState" with url + currentTime.  load video + seek to time, play video.
	socket.on('askState', function (data) {
		loadVideo(data.url.url);
		setTimeout(function (){
			ytplayer.seekTo(data.currentTime.currentTime + 3)
			ytplayer.playVideo();
		},1500)
		
	});


	socket.on('stateBroadcast', function (data) {
		function setVideo(callback) {
		var ytplayer = document.getElementById("youtubePlayer");
		var youtubeURL = data.url
		var params = {
			allowScriptAccess: "always",
			allowFullScreen: true
		};
		var attObj = {id: "youtubePlayer"}; 
		swfobject.embedSWF("http://www.youtube.com/v/" +youtubeURL + "?enablejsapi=1&playerapiid=ytplayer&version=3", 
					"ytapiplayer", "480", "360", "8", null, null, params, attObj);

		setTimeout(function () {
			callback()
		}, 1500)
		
		}

		setVideo(syncState)
		
		function syncState() {
			socket.on('currentTimeBroadcast', function(data) {
				seekTime = data.currentTime // needs to be global???
			})

			if (data.state === 1) {
				ytplayer.seekTo(seekTime + 1)
				ytplayer.playVideo();
			} else if (data.state === 2){
				ytplayer.seekTo(seekTime + 1)
				ytplayer.pauseVideo()
						
				}
		}
		syncState(); // now, syncstate gets invoked during every stateBroadcast event AS well as just in general.  before, you'd have to wait for a statebroadcast for it to invoke, but now it invokes all the time.
	});
});



function onYouTubePlayerReady(playerId) {
		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
	}
		function onytplayerStateChange(newState) {
	   	if (newState === 1) {
	   		 var time = setInterval(function() {
	   			var currentTime = ytplayer.getCurrentTime();
	   			socket.emit("currentTime", {currentTime: currentTime})
	   		}, 1000)
	   	} else if (newState === 2) {
	   		var currentTime = ytplayer.getCurrentTime();
	   		socket.emit("currentTime", {currentTime: currentTime})
	   		clearInterval(time)
	   	} else {
	   		clearInterval(time)
	   	}

	   	socket.emit('stateChange', {state: newState, time: currentTime, url: youtubeURL});
		}

