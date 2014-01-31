var sanitizer = require('sanitizer');

function beat_io(socket, io) {
	socket.on('beatToServer', function (dataPre) {
		// console.log(data)
		var data = sanitizer.sanitize(dataPre);
		socket.broadcast.emit('beatToClient', data)
		// socket.emit('beatToClient', data) // only for testing
	})
}

exports.beat_io = beat_io;