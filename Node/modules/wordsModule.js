var _ = require("underscore");
var mongojs = require('mongojs');
var db = mongojs('test', ['sentenceCollection']);

function renderPage (request, response) {
	db.sentenceCollection.find(function(err, docs) {
   console.log("about to serve " + docs.slice(-1)[0].sentence + " to html doc")
   response.render("write/write", {lastSentence: docs.slice(-1)[0].sentence });
	});
}

function addSentence (request, response) {
	var sentence = request.body.sentence;
	if (_.isUndefined(sentence) || _.isEmpty(sentence.trim())) {
		return response.json(400, {error: "Sentence is invalid"});
	}
	
	db.sentenceCollection.save({sentence: request.body.sentence.toString()}, function(err, saved) {
	  if( err || !saved ) console.log("sentence not saved in db");
	  else console.log("sentence saved in db");
	  		findDoc();
	});

	function findDoc () {
		db.sentenceCollection.find(function(err, docs) {
	   response.send(docs);
		});
	} // I'm not sure if this function is blocking
}


exports.addSentence = addSentence;
exports.renderPage = renderPage;
