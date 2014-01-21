function beat_io(socket, io) {
	socket.on('beatToServer', function (data) {
		console.log(data)
		socket.broadcast.emit('beatToClient', data)
		// socket.emit('beatToClient', data) // only for testing
	})
}

exports.beat_io = beat_io;