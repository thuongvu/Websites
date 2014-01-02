$(document).ready(function() {

	var serverBaseUrl = document.domain;
	socket = io.connect(serverBaseUrl + '/yousee');

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
		youtubeURL = $('#urlInput').val(); 
		loadVideo(youtubeURL)
		socket.emit("loadVideo", {url: youtubeURL})
	});


	socket.on('askState', function (data) {
		console.log(data)
		loadVideo(data.url.url)
		setTimeout(function ( ){
			ytplayer.seekTo(data.currentTime.currentTime + 3)
			ytplayer.playVideo();
		},1500)
		
	});

	var broadcast = 0;

	socket.on("currentTimeBroadcast", function (data) {
		broadcast = 1;
	})

	setTimeout(function () {
		if (broadcast == 1) {
		console.log("broadcasting")
		socket.emit("connected")
	}
}, 1000)
	



	socket.on('loadVideoBroadcast', function (data) {
		console.log(data)

		ytplayer = document.getElementById("youtubePlayer");
		console.log(data)
		var youtubeURL = data.url
		var params = {
			allowScriptAccess: "always",
			allowFullScreen: true
		};
		var attObj = {id: "youtubePlayer"}; 
		swfobject.embedSWF("http://www.youtube.com/v/" +youtubeURL + "?enablejsapi=1&playerapiid=ytplayer&version=3", 
					"ytapiplayer", "480", "360", "8", null, null, params, attObj);



	});

	socket.on('stateBroadcast', function (data) {
		function setVideo(callback) {
			ytplayer = document.getElementById("youtubePlayer");
		console.log(data)
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
				console.log("the current time is " + data.currentTime)
				seekTime = data.currentTime 
			})

			if (data.state === 1) {
				console.log("started")
					ytplayer.seekTo(seekTime)
				ytplayer.playVideo();
			} else if (data.state === 2){
				ytplayer.seekTo(seekTime)
					ytplayer.pauseVideo()
						
				}
			// }
		}
		syncState(); // now, syncstate gets invoked during every stateBroadcast event AS well as just in tgeneral.  before, you'd have to wait for a statebroadcast for it to invoke, but now it invokes all the time.

	});

});



function onYouTubePlayerReady(playerId) {
		ytplayer = document.getElementById("youtubePlayer");

		console.log("Hello")
		var currentTime;
		var currentState;

		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");

		
	}
		function onytplayerStateChange(newState) {
	   	if (newState === 1) {
	   		console.log("state is " + newState)
	   		 time = setInterval(function() {
	   			var currentTime = ytplayer.getCurrentTime();
	   			socket.emit("currentTime", {currentTime: currentTime})
	   		}, 1000)
	   	} else if (newState === 2) {
	   		console.log("state is " + newState)
	   		var currentTime = ytplayer.getCurrentTime();
	   		socket.emit("currentTime", {currentTime: currentTime})
	   		clearInterval(time)
	   	} else {
	   		clearInterval(time)
	   	}

	   	socket.emit('stateChange', {state: newState, time: currentTime, url: youtubeURL});
		}

