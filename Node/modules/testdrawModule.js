var _ = require("underscore");
var mongojs = require('mongojs');
// var db = mongojs('test', ['testDrawCol']);

function testdraw_io (socket, io) {
	socket.on("newStroke", function (data) {
		currentStrokes = data.strokes
		// currentStrokes.forEach(function (obj) {
		// 	db.testDrawCol.save({dot: obj}, function(err, saved) {
		// 	  if( err || !saved ) console.log("dot not saved in db");
		// 	  else console.log("dot saved in db");
		// 	});
		// })
		// this.broadcast.emit("strokesToDraw", {data: data});
		console.log("data")
		console.log(data)
		console.log("data.room")
		console.log(data.room)
		socket.in(data.room).broadcast.emit("strokesToDraw", {data: data});
	});

	socket.on("reset", function (){
		db.testDrawCol.remove()
		this.broadcast.emit("resetDrawing");
	})

	socket.on("joinRoom", function(data) {
		var roomName = data;
		socket.join(roomName);
		socket['room'] = roomName;
		socket.emit('joinRoomSuccess', {roomName: roomName})
		console.log("someone joined room " + roomName);
	})
}

function renderPage (request, response) {
   response.render("testdraw/index.ejs");
}

function getPrevious (request, response) {
	db.testDrawCol.find(function(err, docs) {
		response.send({dots: docs})
	})
	
}

exports.testdraw_io = testdraw_io;
exports.renderPage = renderPage;
exports.getPrevious = getPrevious;