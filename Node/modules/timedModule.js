var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/test', ['timeScoreCollection']);
var sanitizer = require('sanitizer');

function renderPage(request, response) {
	response.render('timed/timed')
}

function timed_io (socket, io) {
	socket.on("newScore", function (data) {
		sanitizer.sanitize(data)
		db.timeScoreCollection.save({name: data.name, score: data.score}, function(err, saved) {
		  if( err || !saved ) console.log("timeScore not saved in db");
		  else console.log("timeScore saved in db");
		  		findDoc(); //not sure this is blocking code, and so on
		});

	})

	function findDoc () { // or here either
		db.timeScoreCollection.find(function(err, data) {
			function sortScoresThenSend (data) {
				var sorted = data.sort(function (a,b) {
					return a.score - b.score
				})
				socket.emit("highScoresToClient", sorted.slice(0,10))
			}
			sortScoresThenSend(data);
		});
	}

	socket.on("requestHighScores", function() {
		findDoc()
	}) 

}

exports.renderPage = renderPage;
exports.timed_io = timed_io;