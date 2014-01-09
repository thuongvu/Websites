function renderPage(request, response) {
	response.render('vote/vote')
}

function vote_io(socket, io) {
	
}

exports.renderPage = renderPage;
exports.vote_io = vote_io;