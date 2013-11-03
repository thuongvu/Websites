function showVideos(data) {
		var feed = data.feed;
		var entries = feed.entry || []; // array of video entries
		var addHTML = ['<div id="videos">'];

		for (i = 0; i < entries.length; i++) {
			var entry = entries[i]; // this cycles through the video entries on the page // got this wrong, relook at it
			var thumbnail = entries[i].media$group.media$thumbnail[2].url;
			var mediaPlayer = entries[i].media$group.media$player.url; 
			addHTML.push('<a href="', mediaPlayer, '"><img src="', thumbnail, '" width="280" height="160" /></a>')
						  
		};
		document.getElementById('videos').innerHTML = addHTML.join('');
	}