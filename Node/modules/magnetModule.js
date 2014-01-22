var _ = require("underscore");
var mongojs = require('mongojs');
var db = mongojs('test', ['magnetCol']);
var sanitizer = require("sanitizer")

function magnet_io(socket, io) {

		db.magnetCol.find(function(err, data) {
			socket.emit('magnetsOnLoad', data)
		})

		// socket.on('createMagnet', function (data) {
		// 	db.magnetCol.save(data, function(err, saved) {
		// 	  if( err || !saved ) console.log("sentence not saved in db");
		// 	  else console.log("saved in db");
		// 	});
		// });

		// socket.on('updateMagnet', function (data) {
		// 	db.magnetCol.findAndModify({
		// 		query: {id: data.id},
		// 		update: {id: data.id, body: data.body, x: data.x, y: data.y, bgcolor: data.bgcolor},
		// 		new: true
		// 	})
		// });

		socket.on('moveMagnet', function (data) {
			db.magnetCol.findAndModify({
				query: {id: data.id},
				update: {id: data.id, body: data.body, x: data.x, y: data.y, bgcolor: data.bgcolor},
				new: true
			})
			this.broadcast.emit('magnetMovedByOther', data)
		})

}
exports.magnet_io = magnet_io;

