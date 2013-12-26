// module dependencies
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var _ = require("underscore");

// list of participants in chatroom
var participants = []

app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public", __dirname + "/public"));
app.use(express.bodyParser());

// server routing
app.get("/chatroom", function (request, response) {
	response.render("chatroom/chatroom");
});

app.post("/chatroom/message", function (request, response) {
	var message = request.body.message;
	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "Message is invalid"});
	}
	var name = request.body.name;
	io.sockets.emit("incomingMessage", {message: message, name: name});
	response.json(200, {message: "Message received"});
});

io.on("connection", function(socket) {
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
})

http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});