var _ = require("underscore");
var mongojs = require('mongojs');
var db = mongojs('test', ['sentenceCollection']);

function renderPage(request, response, call) {
   randNumber(findRandom)
	function randNumber (callback) {
		db.sentenceCollection.count(function (err, docs) {
			// console.log("this collection has " + docs )
			var num = Math.round(Math.random() * docs)
			callback(num)
		})
		// var num = Math.round(Math.random() * 10)
		// callback(num)
	}
	function findRandom (random, callback) {
		db.sentenceCollection.find().limit(-1).skip(random).next(function (err, docs) {
			call(docs)
			console.log(docs);
		})
	}
	// function mainPage(docs) {
	// 	response.render("letitbe/letitbe", {compliment: docs.sentence });
	// }
}



exports.renderPage = renderPage;