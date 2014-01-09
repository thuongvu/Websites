function renderPage (request, response) {
	response.render("here/here")
}

function here_io (socket, io) {
		socket.on('send:coords', function (data) {
			console.log(data)
			socket.broadcast.emit('load:coords', data)
		})
}

exports.renderPage = renderPage;
exports.here_io = here_io;