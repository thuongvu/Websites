var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var _ = require("underscore");
var chatroom = require("./modules/chatroomModule.js");
var words = require("./modules/wordsModule.js");

app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public", __dirname + "/public"));
app.use(express.bodyParser());

// chatroom
app.get("/chatroom", function (request, response) {
	response.render("chatroom/chatroom");
});

app.post("/chatroom/message", function (request, response) {
	chatroom.chatroomPost(request, response, io);
});

var chat = io.of('/chatroom').on("connection", function (socket) {
	chatroom.chatroom_io(socket, io);
})

// write
app.get("/write", function (request, response) {
	response.render("write/write", {lastSentence: storyArray.slice(-1)[0] });
	console.log(storyArray.slice(-1)[0] + 'is the last in the array');
});

// app.post("/write/postsentence", function (request, response) {
// 	words.addSentence(request, response);
// })
var storyArray = ["whatsgooood "];
app.post("/write/postsentence", function (request, response) {
	var sentence = request.body.sentence;
	if (_.isUndefined(sentence) || _.isEmpty(sentence.trim())) {
		return response.json(400, {error: "Sentence is invalid"});
	}
	
	storyArray.push(sentence.toString());
	console.log(sentence);
	response.send(storyArray)
})



http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});