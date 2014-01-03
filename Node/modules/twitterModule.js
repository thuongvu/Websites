var _ = require("underscore");
var twitter = require("ntwitter");
var cronJob = require("cron").cronJob;
var events = require("events");
var fs = require("fs");
var eventEmitter = new events.EventEmitter();
var coords;
var isStreamOpen = 0;
var users = 0;

// twitter logic
var watchSymbols = ['happy', 'sad']

var watchList = {
	total: 0,
	symbols: {},
}

_.each(watchSymbols, function (v) {
	watchList.symbols[v] = 0;
});

	fs.readFile('../../config/keys.json', function(err, data) {
		// console.log(data)
		var keys = JSON.parse(data);
		// console.log(keys)
		t = new twitter(keys);
	})

function openStream() {
	t.stream('statuses/filter', {track: watchSymbols}, function (stream) {
		stream.on('data', function (tweet) {
			twitterStream = stream; // for destruction later on, global var
			var claimed = false;

			if (tweet.text !== undefined && tweet.coordinates !== null) {
				var text = tweet.text.toLowerCase();
				_.each(watchSymbols, function (v) {
					if (text.indexOf(v.toLowerCase()) !== -1) {
						watchList.symbols[v]++;
						claimed = true;
						// added
						if (claimed) {
							coords = {"symbol": v, "coordinates": tweet.coordinates, "text": tweet.text, "image": tweet.user.profile_image_url};
							// console.log("incoming tweet")
							eventEmitter.emit("newTweet")
						}
					}
					
				})
			}


		})
	})
}


// node + sockets
function renderPage (request, response) {
	response.render("twitter/twitter")
}

function twitter_io (socket, io) {
	if (isStreamOpen === 0) {
		users++;
		openStream()
		eventEmitter.on("newTweet", function () {
			socket.emit("data", coords)
		})
	} else if (isStreamOpen === 1) {
		users++;
		eventEmitter.on("newTweet", function () {
			socket.emit("data", coords)
		})
	}

	socket.on("disconnect", function () {
		users--;
		if (users === 0) {
			twitterStream.destroy();
		}
	})
}

// exporting functions
exports.renderPage = renderPage;
exports.twitter_io = twitter_io;
