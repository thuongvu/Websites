var mongojs = require('mongojs');
var db = mongojs('test', ['colorVoteCollection']);

function renderPage(request, response) {
	response.render('vote/vote')
}

function vote_io(socket, io) {

	db.colorVoteCollection.find(function (err, docs){
		console.log(docs)
		console.log("user connected")
		socket.emit("connectedUser", docs)
	})

	socket.on("newVote", function (data) {
		socket.broadcast.emit("updatedVotes", data)

		// // add ONCE
		// db.colorVoteCollection.save(data, function(err, saved) {
		//   if( err || !saved ) console.log("vote not saved in db");
		//   else console.log("vote in db");
		// });

		// update
		db.colorVoteCollection.findAndModify({
			remove: data,
			new: true,
		}, function (err, saved) {
			if ( !saved ||err ) console.log(err);
			else 
			  	db.colorVoteCollection.save(data, function(err, saved) {
			  	  if( err || !saved ) console.log("vote not saved in db");
			  	  else console.log("vote in db");
			  	});
		})


	})
}

exports.renderPage = renderPage;
exports.vote_io = vote_io;