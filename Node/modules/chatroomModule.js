var _ = require("underscore");

// list of participants in chatroom
var participants = []

function chatroomPost (request, response, io) {
	var message = request.body.message;
	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "Message is invalid"});
	}
	var name = request.body.name;
	io.sockets.emit("incomingMessage", {message: message, name: name});
	response.json(200, {message: "Message received"});
};


// io.on("connection", function(socket) {
function chatroom_io (socket, io) {
	socket.on("newUser", function (data) {
		participants.push({id: data.id, name: data.name});
		io.sockets.emit("newConnection", {participants: participants});
	});

	socket.on("nameChange", function (data) {
		_.findWhere(participants, {id: socket.id}).name = data.name;
		io.sockets.emit("nameChanged", {id: data.id, name: data.name});
	});

	socket.on("disconnect", function () {
		participants = _.without(participants, _.findWhere(participants, {id: socket.id}));
		io.sockets.emit("userDisconnected", {id: socket.id, sender: "system"});
	});
}


// })

exports.chatroomPost = chatroomPost;
exports.chatroom_io = chatroom_io;