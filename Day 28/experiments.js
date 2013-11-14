// 1:16pm
// loads iframe player api code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


      var player; //  declare var player
      function onYouTubeIframeAPIReady() { // when iframe is ready,
        player = new YT.Player('player', { // make a new instance of the YT.Player class, with these properties
          height: '390',
          width: '640',
        /*  videoId: 'K2_9R4zJ1uo', */
          playerVars: {
          	controls: 1,
          	enablejsapi: 1
          },
          events: {
            'onReady': onPlayerReady,  // event listener for onready, when that gets called, call function onplayerready
//            'onStateChange': onPlayerStateChange // event listener for onstatechange, call function on playerstatechange
          }
        });
      }

      function onPlayerReady(event) { // when the yt.player object has loaded, then the onready event property tells this to run
    /*    event.target.playVideo(); */
    player.loadVideoById({'videoId': 'bHQqvYy5KYo', 'startSeconds': 5, 'endSeconds': 15, 'suggestedQuality': 'medium'});

      }


 /*       var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      } */



// ---------------------------------- 3:09pm ------------------------------------- //
// loads iframe player api code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(document).ready(function() {
	$('#comeOn').click(function() {



	    var player; //  declare var player
	  /*  function onYouTubeIframeAPIReady() { // when iframe is ready, */
	    	player = new YT.Player('player', { // make a new instance of the YT.Player class, with these properties
	        	height: '390',
	          	width: '640',
	         	playerVars: {
	          		controls: 1,
	          		enablejsapi: 1
	          	},
	          	events: {
	            	'onReady': onPlayerReady,  // event listener for onready, when that gets called, call function onplayerready
	          	}
	        });
	 /*   } */

	    function onPlayerReady(event) { // when the yt.player object has loaded, then the onready event property tells this to run
	    	player.loadVideoById({'videoId': 'bHQqvYy5KYo', 'startSeconds': 5, 'endSeconds': 15, 'suggestedQuality': 'medium'});
	    }

	});

});


// ------------------------ 324pm --------------------------------------- //
// loads iframe player api code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



$(document).ready(function() {
	$('#comeOn').click(function() {



	    var player; //  declare var player
	  /*  function onYouTubeIframeAPIReady() { // when iframe is ready, */
	    	player = new YT.Player('player', { // make a new instance of the YT.Player class, with these properties
	        	height: '390',
	          	width: '640',
	         	playerVars: {
	          		controls: 1,
	          		enablejsapi: 1
	          	} // took out comma
	       //   	events: {
	       //     	'onReady': onPlayerReady,  // event listener for onready, when that gets called, call function onplayerready
	       //   	}
	        });
	 /*   } */


	   // function onPlayerReady(event) { // when the yt.player object has loaded, then the onready event property tells this to run
	   // 	player.loadVideoById({'videoId': 'bHQqvYy5KYo', 'startSeconds': 5, 'endSeconds': 15, 'suggestedQuality': 'medium'});
	  //  }
	$('#videoLoad').click(function() {
		player.events({
			'onReady': onPlayerReady,
		 })

	    function onPlayerReady(event) { // when the yt.player object has loaded, then the onready event property tells this to run
	    	player.loadVideoById({'videoId': 'bHQqvYy5KYo', 'startSeconds': 5, 'endSeconds': 15, 'suggestedQuality': 'medium'});
	    }
	})


	});


});



// --------------------------- 4:00pm -------------------------------- //
// loads iframe player api code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


$(document).ready(function() {
	$('#comeOn').click(function() {
		$('#player').html();


	  /*  function onYouTubeIframeAPIReady() { // when iframe is ready, */
	    var	player = new YT.Player('player', { // make a new instance of the YT.Player class, with these properties
	        	height: '390',
	          	width: '640',
	         	playerVars: {
	          		controls: 1,
	          		enablejsapi: 1
	          	},
	          	events: {
	            	'onReady': onPlayerReady,  // event listener for onready, when that gets called, call function onplayerready
	          	}
	        });
	 /*   } */

	    function onPlayerReady(event) { // when the yt.player object has loaded, then the onready event property tells this to run
	    	player.loadVideoById({'videoId': 'bHQqvYy5KYo', 'startSeconds': 5, 'endSeconds': 15, 'suggestedQuality': 'medium'});
	    }

	});




});




// 9:31pm --------------------------------------------------------------------------------------- //
// loads iframe player api code
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(document).ready(function() {
	$('#sam').click(function(){
		$('#sam').effect('shake', {direction: 'down'})
	});


	$('#comeOn').click(function() {



	 //   var player; //  declare var player
	  /*  function onYouTubeIframeAPIReady() { // when iframe is ready, */
	    var	player = new YT.Player('player', { // make a new instance of the YT.Player class, with these properties
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
	            	'onReady': onPlayerReady,  // event listener for onready, when that gets called, call function onplayerready
	          	}
	        });
	 /*   } */

	    function onPlayerReady(event) { // when the yt.player object has loaded, then the onready event property tells this to run
	    /*	if ( Math.floor(Math.random() * 2) < 1 ) {
	    		player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 16, 'endSeconds': 19, 'suggestedQuality': 'small'});
	    	} else {
	    		player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 93, 'endSeconds': 96, 'suggestedQuality': 'small'});
	    	} */

	    	
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 16, 'endSeconds': 19, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 19.2, 'endSeconds': 22, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 93, 'endSeconds': 96, 'suggestedQuality': 'small'});

	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 99, 'endSeconds': 103.5, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 130.7, 'endSeconds': 134.4, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 155, 'endSeconds': 157, 'suggestedQuality': 'small'});
	    	
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 208, 'endSeconds': 215, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 237.5, 'endSeconds': 238.8, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 281.8, 'endSeconds': 285.9, 'suggestedQuality': 'small'});
	    	// player.loadVideoById({'videoId': 'FLe54UPOeXw', 'startSeconds': 407.5, 'endSeconds': 409.5, 'suggestedQuality': 'small'});

	    	var chosenVideo = Math.floor(Math.random() * 11);
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

	});

});


