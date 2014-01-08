function renderPage(request, response) {
	response.render('treasure/treasure')
}

function treasure_io(socket, io) {
	socket.on('updateNote', function (data) {
		socket.broadcast.emit('onNoteUpdated', data)
	})
	socket.on('updateNoteTwo', function (data) {
		socket.broadcast.emit('onNoteUpdatedTwo', data)
	})
	socket.on('updateNoteThree', function (data) {
		socket.broadcast.emit('onNoteUpdatedThree', data)
	})
	socket.on('updateNoteFour', function (data) {
		socket.broadcast.emit('onNoteUpdatedFour', data)
	})


}

exports.renderPage = renderPage;
exports.treasure_io = treasure_io;