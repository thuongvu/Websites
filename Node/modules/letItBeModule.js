var _ = require("underscore");
var mongojs = require('mongojs');
var db = mongojs('test', ['wisdomCollection']);

function renderPage(request, response, call) {
   randNumber(findRandom)
	function randNumber (callback) {
		db.wisdomCollection.count(function (err, docs) {
			// console.log("this collection has " + docs )
			var num = Math.round(Math.random() * (docs - 1))
			callback(num)
		})
		// var num = Math.round(Math.random() * 10)
		// callback(num)
	}
	function findRandom (random, callback) {
		db.wisdomCollection.find().limit(-1).skip(random).next(function (err, docs) {
			call(docs)
			// console.log(docs);
		})
	}
	// function mainPage(docs) {
	// 	response.render("letitbe/letitbe", {compliment: docs.sentence });
	// }
}



function addWisdom (request, response) {
	var wisdom = request.body.wisdom;
	if (_.isUndefined(wisdom) || _.isEmpty(wisdom.trim())) {
		return response.json(400, {error: "wisdom is invalid"});
	}
	
	db.wisdomCollection.save({wisdom: request.body.wisdom.toString()}, function(err, saved) {
	  if( err || !saved ) console.log("sentence not saved in db");
	  else console.log("saved in db");
	  response.send("Saved!  Thank you for spreading love! :)")
	});

}


exports.renderPage = renderPage;
exports.addWisdom = addWisdom;