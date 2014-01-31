var _ = require("underscore");
var sanitizer = require('sanitizer');

var participants = []

function chatroomPost (request, response, io) {
	var message = sanitizer.sanitize(request.body.message);
	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "Message is invalid"});
	}
	var name = sanitizer.sanitize(request.body.name);
	io.of('/chatroom').emit("incomingMessage", {message: message, name: name});
	response.json(200, {message: "Message received"});
};

function chatroom_io (socket, io) {
	socket.on("newUser", function (data) {
		var id = sanitizer.sanitize(data.id);
		var name = sanitizer.sanitize(data.name);
		participants.push({id: id, name: name});
		this.broadcast.emit("newConnection", {participants: participants});
		this.emit("newConnection", {participants: participants});
	});

	socket.on("nameChange", function (data) {
		var id = sanitizer.sanitize(data.id);
		var name = sanitizer.sanitize(data.name);
		_.findWhere(participants, {id: socket.id}).name = name;
		this.broadcast.emit("nameChanged", {id: id, name: name});
		this.emit("nameChanged", {id: id, name: name});
	});

	socket.on("disconnect", function () {
		var id = sanitizer.sanitize(data.id);
		participants = _.without(participants, _.findWhere(participants, {id: socket.id}));
		this.broadcast.emit("userDisconnected", {id: socket.id, sender: "system"});
	});
}

exports.chatroomPost = chatroomPost;
exports.chatroom_io = chatroom_io;