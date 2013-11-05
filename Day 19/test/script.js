$(document).ready(function(){
	var mySecondDiv=$('<li></li>', {
		id: 'someID',
		className: 'foo',
		html: "content" + "<img src='https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png'</>"
	});
$('#myDiv').append(mySecondDiv);
});










// progress as the key, and an anonymous function that will accept a parameter called ms.
// progress is a function called frequently whiel recording.  it passes milliseconds as an argument
// we are naming the result that it outputs - ms. and that goes down here into this function.  




/* it all comes together and works
				SC.get('/me/tracks', {limit: 1}, function(tracks) {
				$('#userInfo').append(tracks[0].permalink_url);
				SC.oEmbed(tracks[0].permalink_url, {color: "ff0066"},  document.getElementById("embedHere"));
			}
		);
*/

// embedding SC.oEmbed("+tracks[0].permalink_url+", {color: "ff0066"},  document.getElementById("embedHere"));	
/*
				SC.get('/me', function(user) {
				$('#userInfo').append(user.permalink_url);
			}
		);
		*/

/* this works
				SC.get('/me/tracks', {limit: 1}, function(tracks) {
				$('#userInfo').append(tracks[0].permalink_url);
			}
		);
		*/

/*	var trackUrl = 'https://soundcloud.com/blue-orb-records/bardia-f-thuyvu-rishi-k-tland';
	$.get(
  		'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=f5990c3cbb71cd146d93be7d4f3d6394', 
  		function (track) {
  			console.log(track);
  			$('#track').append("<img src='" +track.artwork_url+ "'</>")
    		$('#track').append(track.permalink_url);

 		}
	);
*/		









// embedding oembed objects, copy/pasted from doc -- this one just loads it
/*
$(document).ready(function(){
	SC.oEmbed("http://soundcloud.com/forss/flickermood", {auto_play: true}, function(oembed){
    console.log("oEmbed response: ", oembed);
  });
});	
*/

/*
// embedding oembed object, this one embeds it on a page through getelementbyid
$(document).ready(function(){
SC.oEmbed("http://soundcloud.com/forss/sets/soulhack", {color: "ff0066"},  document.getElementById("putTheWidgetHere"));
  });
*/





/*
// this is a mini player with buttons that work --- on to the next one!
$(document).ready(function(){
	var trackLink = "http://api.soundcloud.com/tracks/112987994";		
		SC.stream(trackLink, function(sound) {
			$('#play').click(function(e) {
				e.preventDefault;
				sound.play();
			});
			$('#pause').click(function(e) {
				e.preventDefault;
				sound.pause();
			});
			$('#stop').click(function(e) {
				e.preventDefault;
				sound.stop();
			});
		});
});
*/


/* this works
$(document).ready(function(){
	SC.stream("/tracks/293", function(sound) {
		sound.play();
	});
});
*/


/*
// this is a shorthand ajax function that has the property of url... it GETS the data from the url
// now we have a function that takes the data as its argument, and i can specify what i want to do with the data
// the var trackUrl gets inputed into the url in the get method, and that url does a resolve.
// a resolve looks up and accesses api resources only when you know the url
$(document).ready(function(){
	var trackUrl = 'https://soundcloud.com/blue-orb-records/bardia-f-thuyvu-rishi-k-tland';
	$.get(
  		'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=f5990c3cbb71cd146d93be7d4f3d6394', 
  		function (track) {
  			console.log(track);
  			$('#track').append("<img src='" +track.artwork_url+ "'</>")
    		$('#track').append(track.permalink_url);

 		}
	);
});
*/


/* another example from the documentation
$(document).ready(function() {
		SC.get("/groups/5/tracks", {limit: 1}, function(tracks){
  			$('#track').append("Latest track: " + tracks[0].permalink_url);
		});
})
*/


/*
$(document).ready(function() {
  SC.get('/tracks', {
    genres: 'ambient' }, 
        function(tracks) {
            $(tracks).each(function(index, track) {
				var trackInfo = $('<li></li>', {
					html: "<img src='" +track.artwork_url+ "'</>" // remember that it's part of track obj now 
				});            			
                  $('#track').append(trackInfo);
    });
  });
});

// $('#track').append($('<li></li>').html(track.title + ' - ' + track.genre )); // is what gets title + genre

*/