var _ = require("underscore");
var mongojs = require('mongojs');
var db = mongojs('test', ['drawSomethingCol']);

function drawSomething_io (socket, io) {
	socket.on("newStroke", function (data) {
		// console.log(data.strokes)
		// console.log(data.strokes)
		currentStrokes = data.strokes
		currentStrokes.forEach(function (obj) {
			// console.log(obj)
			db.drawSomethingCol.save({dot: obj}, function(err, saved) {
			  if( err || !saved ) console.log("dot not saved in db");
			  else console.log("dot saved in db");
			});
		})
		this.broadcast.emit("strokesToDraw", {data: data});
		// this.emit("strokesToDraw", {data: data});
	});

	socket.on("reset", function (){
		db.drawSomethingCol.remove()
		this.broadcast.emit("resetDrawing");
	})
}



function renderPage (request, response) {
	// db.drawSomethingCol.find(function(err, docs) {
   // response.render("drawSomething/drawSomething", {dots: docs.dot });
   // response.render("drawSomething/drawSomething", {dots: "hello" });
   response.render("drawSomething/drawSomething");
   // response.send({dots: 'json'})
   // response.render("drawSomething/drawSomething");
	// });
}

function getPrevious (request, response) {
	db.drawSomethingCol.find(function(err, docs) {
		response.send({dots: docs})
	})
	
}


exports.drawSomething_io = drawSomething_io;
exports.renderPage = renderPage;
exports.getPrevious = getPrevious;