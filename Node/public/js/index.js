function init() {
	var serverBaseUrl = document.domain;

	// on client init, try to connect to socket.io server, no need to specify port bc we already did that
	var socket = io.connect(serverBaseUrl);

	// save session ID in a var for later
	var sessionId = '';

	// when client connects successfully to the server, an event "connect" is emitted
	// get the sess ID & log it
	socket.on('connect', function () {
		sessionId = socket.socket.sessionid;
		console.log('Connected ' + sessionId);
	});
}
$(document).on('ready', init);