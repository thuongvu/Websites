var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var _ = require("underscore");
var chatroom = require("./modules/chatroomModule.js");
var words = require("./modules/wordsModule.js");
var letitbe = require("./modules/letItBeModule.js");
// mongo
var mongojs = require('mongojs');
var db = mongojs('test', ['sentenceCollection']);

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
	words.renderPage(request, response)
});

app.post("/write/postsentence", function (request, response) {
	words.addSentence(request, response);
})

// let it be
// app.get("/letitbe", function (request, response) {
// 	// db.sentenceCollection.find(function(err, docs) {
//    	// console.log("about to serve " + docs.slice(-1)[0].sentence + " to html doc")
//    	// response.render("letitbe/letitbe", {lastSentence: docs.slice(-1)[0].sentence });
//    	randNumber(findRandom)
// 	// });
// 	function randNumber (callback) {
// 		var num = Math.round(Math.random() * 10)
// 		callback(num, "letitbe/letitbe")
// 	}
// 	function findRandom (random, page) {
// 		db.sentenceCollection.find().limit(-1).skip(random).next(function (err, docs) {
// 			response.render(page, {compliment: docs.sentence });
// 			console.log(docs);
// 		})
// 	}
	
// })

app.get("/letitbe", function (request, response) {
	letitbe.renderPage(request, response, function (docs) {
		response.render("letitbe/letitbe", {compliment: docs.sentence });
	})
})
app.get("/letitbe/add", function (request, response) {
		response.render("letitbe/add", {compliment: docs.sentence });
})

app.post("/letitbe/add", function (request, response) {
	words.addSentence(request, response);
})

app.get("/letitbe/name/:name", function (request, response) {
	console.log(request.params.name) 
	// db.sentenceCollection.find(function(err, docs) {
   // console.log("about to serve " + docs.slice(-1)[0].sentence + " to html doc")
   // response.render("letitbe/letitbeName", {lastSentence: docs.slice(-1)[0].sentence, name: request.params.name });
	// letitbe.renderPage(request, response, "letitbe/letitbeName.ejs")
	// response.render("letitbe/letitbe", {compliment: docs.sentence, name: request.params.name });
	// });

	letitbe.renderPage(request, response, function (docs) {
		response.render("letitbe/letitbeName.ejs", {compliment: docs.sentence, name: request.params.name });
	})
})



http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});