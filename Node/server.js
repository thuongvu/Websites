var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var _ = require("underscore");
var chatroom = require("./modules/chatroomModule.js");
var words = require("./modules/wordsModule.js");
var letitbe = require("./modules/letItBeModule.js");
var drawSomething = require("./modules/drawSomethingModule.js");
var notes = require("./modules/notesModule.js");
var here = require("./modules/hereModule.js");
var mongojs = require('mongojs');
// var db = mongojs('test', ['wisdomCollection']); //'sentenceCollection', 

app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public", __dirname + "/public"));
app.use(express.bodyParser());

// chatroom
app.get("/chatroom", function (request, response) {
	response.render("chatroom/chatroom");
	response.end();
});

app.post("/chatroom/message", function (request, response) {
	chatroom.chatroomPost(request, response, io);
});

var chat = io.of('/chatroom').on("connection", function (socket) {
	chatroom.chatroom_io(socket, io);
})

// write
app.get("/write", function (request, response) {
	words.renderPage(request, response)
});

app.post("/write/postsentence", function (request, response) {
	words.addSentence(request, response);
})

// let it be
app.get("/letitbe", function (request, response) {
	letitbe.renderPage(request, response, function (docs) {
		response.render("letitbe/letitbe", {compliment: docs.wisdom });
	})
})
app.get("/letitbe/add", function (request, response) {
		response.render("letitbe/add");
})

app.post("/letitbe/add", function (request, response) {
	letitbe.addWisdom(request, response);
})
app.get("/letitbe/name/:name", function (request, response) {
	letitbe.renderPage(request, response, function (docs) {
		response.render("letitbe/letitbeName.ejs", {compliment: docs.wisdom, name: request.params.name });
	})
})

//drawSomething 
app.get("/drawsomething", function (request, response) {
	drawSomething.renderPage(request, response);
});

app.get("/drawsomething/previous", function (request, response) {
	drawSomething.getPrevious(request, response);
});

var draw = io.of('/drawsomething').on("connection", function (socket) {
	drawSomething.drawSomething_io(socket, io);
})

// notes
app.get('/notes', function (request, response) {
	notes.renderPage(request, response);
})

var notes_socket_io = io.of('/notes').on("connection", function (socket) {
	notes.notes_io(socket, io);
})

// here
app.get('/here', function (request, response) {
	here.renderPage(request, response);
})

var here_socket_io = io.of('/here').on("connection", function (socket) {
	here.here_io(socket, io);
})


// ------------------------------------------------------------------------- //

http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});