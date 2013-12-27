var _ = require("underscore");

var participants = []

function chatroomPost (request, response, io) {
	var message = request.body.message;
	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "Message is invalid"});
	}
	var name = request.body.name;
	io.of('/chatroom').emit("incomingMessage", {message: message, name: name});
	response.json(200, {message: "Message received"});
};

function chatroom_io (socket, io) {
	socket.on("newUser", function (data) {
		participants.push({id: data.id, name: data.name});
		this.broadcast.emit("newConnection", {participants: participants});
		this.emit("newConnection", {participants: participants});
	});

	socket.on("nameChange", function (data) {
		_.findWhere(participants, {id: socket.id}).name = data.name;
		this.broadcast.emit("nameChanged", {id: data.id, name: data.name});
		this.emit("nameChanged", {id: data.id, name: data.name});
	});

	socket.on("disconnect", function () {
		participants = _.without(participants, _.findWhere(participants, {id: socket.id}));
		this.broadcast.emit("userDisconnected", {id: socket.id, sender: "system"});
	});
}

exports.chatroomPost = chatroomPost;
exports.chatroom_io = chatroom_io;