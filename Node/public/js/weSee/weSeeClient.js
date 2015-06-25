var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl + '/wesee');
var roomName;
var videoLoaded = 0;
var broadcast = 0;

$(document).ready(function() {
	$('#instructions').popover({placement: 'bottom', trigger: 'hover'});
	$('#forMainUser').hide();

	$('#joinRoom').click(function() {
		roomName = $('#roomInput').val();
		socket.emit("joinRoom", roomName)
		setTimeout(function() {
			if (broadcast === 0) {
				$('#forMainUser').show();
				$('#roomSection').hide();
				$('#announceRoom').append('<h4>Room:<b> ' + roomName + '</b></h4>');
			} else {
				$('#roomSection').hide();
				$('#announceRoom').append('<h4>Room:<b> ' + roomName + '</b></h4>');
			}
		}, 1000)
		
	})

	socket.on("joinRoomSuccess", function (data) {
		console.log("joined room " + data.roomName)
		roomName = data.roomName;
		console.log("roomName is " + roomName );
	})

	function loadVideo(youtubeURL, callback) {
		videoLoaded = 1;
		swfobject.removeSWF("youtubePlayer")
		$('#playerContainer').append("<div id='ytapiplayer'></div>")

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
		urlUnparsed = $('#urlInput').val(); 
		var re = /=(\w+\W?\w+)/;
		var urlMatch = urlUnparsed.match(re);
		youtubeURL = urlMatch[1];
		loadVideo(youtubeURL);
		socket.emit("loadVideo", {url: youtubeURL, roomName: roomName});
	});

	socket.on('loadVideoBroadcast', function (data) {
		loadVideo(data.url)
	});

	// check if there is a "broadcaster", if there is, emit "connected"

	socket.on("currentTimeBroadcast", function (data) {
		broadcast = 1;
		console.log("currentTimeBroadcast")
		console.log(data)
		youtubeURL = data.url;
		if (videoLoaded === 0) {
			loadVideo(data.url)
			console.log(data.state)
			setTimeout(function() {
				if (data.state == 1) {
					ytplayer.seekTo(data.currentTime + 1)
					ytplayer.playVideo();
				} else if (data.state == 2){
					ytplayer.seekTo(data.currentTime + 1)
					ytplayer.pauseVideo()
				}
			}, 1500)
			
		}
		
	})

	setTimeout(function () {
		if (broadcast == 1) {
		socket.emit("connected", {roomName: roomName})
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
		ytplayer = document.getElementById("youtubePlayer");
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
			})
			if (ytplayer) {
				if (data.state === 1) {
					ytplayer.seekTo(data.currentTime + 1)
					ytplayer.playVideo();
				} else if (data.state === 2){
					ytplayer.seekTo(data.currentTime + 1)
					ytplayer.pauseVideo()
							
				}
			}
			
		}
	});
});

function onYouTubePlayerReady(playerId) {
		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
	}
		function onytplayerStateChange(newState) {
			if (broadcast === 0) {
				if (newState === 1) {
					 var time = setInterval(function() {
						var currentTime = ytplayer.getCurrentTime();
						socket.emit("currentTime", {currentTime: currentTime, roomName: roomName, url: youtubeURL, state: newState})
					}, 1000)
				} else if (newState === 2) {
					var currentTime = ytplayer.getCurrentTime();
					socket.emit("currentTime", {currentTime: currentTime, roomName: roomName, url: youtubeURL, state: newState})
					clearInterval(time)
				} else {
					clearInterval(time)
				}
				socket.emit('stateChange', {state: newState, currentTime: currentTime, url: youtubeURL, roomName: roomName});
			}
		}

