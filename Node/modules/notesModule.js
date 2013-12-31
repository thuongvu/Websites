function renderPage(request, response) {
	response.render("notes/notes");
}

function notes_io(socket, io) {
	// socket.on('connection', function (socket) {

		socket.on('createNote', function (data) {
			this.broadcast.emit('onNoteCreated', data)
		});

		socket.on('updateNote', function (data) {
			this.broadcast.emit('onNoteUpdated', data)
		});

		socket.on('deleteNote', function (data) {
			this.broadcast.emit('onNoteDeleted', data)
		})

		socket.on('moveNote', function (data) {
			this.broadcast.emit('onNoteMoved', data)
		})

	// })
}
exports.notes_io = notes_io;
exports.renderPage = renderPage;