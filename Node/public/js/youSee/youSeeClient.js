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
	}

	$('#loadVideo').click(function(){
		youtubeURL = $('#urlInput').val(); 
		loadVideo(youtubeURL)
		// var params = {
		// 	allowScriptAccess: "always",
		// 	allowFullScreen: true
		// };
		// var attObj = {id: "youtubePlayer"}; 
		// swfobject.embedSWF("http://www.youtube.com/v/" +youtubeURL + "?enablejsapi=1&playerapiid=ytplayer&version=3", 
		// 			"ytapiplayer", "480", "360", "8", null, null, params, attObj);
		socket.emit("loadVideo", {url: youtubeURL})
	});

	socket.on('connect', function (data) {
		console.log("just connected")
	});

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
		}, 1000)
		
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

	// socket.on('askState', function (data) {
	// 	socket.emit('stateChange', {state: newState, time: currentTime, url: youtubeURL});
	// })

});



function onYouTubePlayerReady(playerId) {
		ytplayer = document.getElementById("youtubePlayer");

		console.log("Hello")
		var currentTime;
		var currentState;

		
		// setInterval(function() {
		// 	currentTime = ytplayer.getCurrentTime();
		// 	socket.emit("currentTime", {currentTime: currentTime})
		// }, 1000)


		// setInterval(function() {
		// currentTime = ytplayer.getCurrentTime();
		// currentState = ytplayer.getPlayerState()
		// console.log(currentState + " " + currentTime )
		// }, 1000)

		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");

		
	}
		function onytplayerStateChange(newState) {
	   	// var currentTime = ytplayer.getCurrentTime();
	   	// console.log("Player's new state: " + newState + " time is " + currentTime);
	   	// console.log(youtubeURL)
	   	if (newState === 1) {
	   		console.log("state is " + newState)
	   		 time = setInterval(function() {
	   			var currentTime = ytplayer.getCurrentTime();
	   			socket.emit("currentTime", {currentTime: currentTime})
	   			socket.emit('stateChange', {state: newState, time: currentTime, url: youtubeURL});
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