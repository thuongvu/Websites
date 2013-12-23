// module dependencies
var express = require("express")
	, app = express()
	, http = require("http").createServer(app)
	, io = require("socket.io").listen(http)
	, _ = require("underscore");

// list of participants in chatroom
var participants = []

// server config

app.set("ipaddr", "127.0.0.1");

// sever port #
app.set("port", 8080);

// specifify views folder
app.set("views", __dirname + "/views");

// view engine is jade
app.set("view engine", "ejs");

// specify where static content is
app.use(express.static("public", __dirname + "/public"));

app.use(express.bodyParser());

// server routing
app.get("/", function (request, response) {

	//render the view called "index"
	response.render("index");

});

// post method to create chat message
app.post("/message", function (request, response) {
	
	// the request body expects a param named message
	var message = request.body.message;

	// if the message is empty or wasnt sent, then it's a bad request
	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "Message is invalid"});
	}

	// we also expect the sender's name with the message
	var name = request.body.name;

	// let chatroom know there is a new message
	io.sockets.emit("incomingMessage", {message: message, name: name});

	// let the client know
	response.json(200, {message: "Message received"});

});

// socket.io events
io.on("connection", function(socket) {
	// when a new user connects, we expect an event "newUser"
	// then we emit an event "newConnections" w/ list
	socket.on("newUser", function (data) {
		participants.push({id: data.id, name: data.name});
		io.sockets.emit("newConnection", {participants: participants});
	});

	// when a user changes name, expect event "nameChange"
	// emit an event called "nameChanged" to all w/ id+new name of user who emited original msg
	socket.on("nameChange", function (data) {
		_.findWhere(participants, {id: socket.id}).name = data.name;
		io.sockets.emit("nameChanged", {id: data.id, name: data.name});
	});

	// when user disconnects, event "disconnect" is automatically captured by server
	// then emit event called userDisconnected to all w/ id of user who disconnected
	socket.on("disconnect", function () {
		participants = _.without(participants, _.findWhere(participants, {id: socket.id}));
		io.sockets.emit("userDisconnected", {id: socket.id, sender: "system"});
	});
})

http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});