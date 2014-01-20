var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var _ = require("underscore");
var mongojs = require('mongojs');
var https = require('https');
var fs = require('fs');

var chatroom = require("./modules/chatroomModule.js");
var words = require("./modules/wordsModule.js");
var letitbe = require("./modules/letItBeModule.js");
var drawSomething = require("./modules/drawSomethingModule.js");
var notes = require("./modules/notesModule.js");
var here = require("./modules/hereModule.js");
var youSee = require("./modules/youSeeModule.js");
var twit = require("./modules/twitterModule.js");
var ticTac = require("./modules/ticTacModule.js");
var harkModule = require("./modules/harkModule.js");
var ig = require("./modules/igModule.js");
var igMap = require("./modules/igMapModule.js");
var treasure = require("./modules/treasureModule.js");
var vote = require("./modules/voteModule.js");
var weSee = require("./modules/weSeeModule.js");
var timed = require("./modules/timedModule.js");
var testdraw = require("./modules/testdrawModule.js");
var rps = require("./modules/rpsModule.js");

	// auth
	var port = process.env.PORT || 8080;
	var mongoose = require('mongoose');
	var passport = require('passport')
	var flash = require('connect-flash');
	var configDB = require('./config/database.js');
	mongoose.connect(configDB.url);
	require ('./config/passport')(passport)
	app.use(express.logger('dev')); 
	app.use(express.cookieParser()); 
	app.use(express.bodyParser()); 

	app.set('view engine', 'ejs'); 

	app.use(express.session({ secret: 'secretsecretsarenofun' })); 
	app.use(passport.initialize());
	app.use(passport.session()); 
	app.use(flash());

	// ----------------

	require('./routes.js')(app, passport);

app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
app.use(express.static("public", __dirname + "/public"));
// app.use(express.bodyParser());


// https ------ //
var options = {
	key: fs.readFileSync('../../ssl/aws.key'),
	cert: fs.readFileSync('../../ssl/aws.crt'),
	ca: fs.readFileSync('../../ssl/ca.crt'),
	passphrase: 'neonindian'
};
var https = require("https").createServer(options, app);
var ios = require("socket.io").listen(https);
// ------------ //

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

// yousee
app.get('/yousee', function (request, response) {
	youSee.renderPage(request, response);
})
var youSee_socket_io = io.of('/yousee').on("connection", function (socket) {
	youSee.youSee_io(socket, io);
})

//twitter
app.get('/twitter', function (request, response) {
	twit.renderPage(request, response);
})
var twitter_socket_io = io.of('/twitter').on("connection", function (socket) {
	twit.twitter_io(socket, io);
})

// tictac
app.get('/tictac', function (request, response) {
	ticTac.renderPage(request, response)
})
var ticTac_socket_io = io.of('/tictac').on("connection", function (socket) {
	ticTac.ticTac_io(socket, io);
})

// hark
app.get('/hark', function (request, response) {
	harkModule.renderPage(request, response)
})

// ig
app.get('/ig', function (request, response) {
	ig.renderPage(request, response);
})
app.get('/ig/callback/3', function (request, response) {
	ig.handshake(request, response);
})
app.post('/ig/callback/3', function (request, response) {
	ig.igPost(request, response);
})
var ig_socket_io = io.of('/ig').on("connection", function (socket) {
	ig.ig_io(socket, io);
})
ig.igSelfieTags();

//igMap
app.get('/igmap', function (request, response) {
	igMap.renderPage(request, response);
})
app.get('/igmap/callback/1', function (request, response) {
	igMap.handshake(request, response);
})
app.post('/igmap/callback/1', function (request, response) {
	igMap.igPost(request, response);
})
var igMap_socket_io = io.of('/igmap').on("connection", function (socket) {
	igMap.igMap_io(socket, io);
})

// treasure
app.get('/collabtypewriter', function (request, response) {
	treasure.renderPage(request, response);
})
var treasure_socket_io = io.of('/collabtypewriter').on("connection", function (socket) {
	treasure.treasure_io(socket, io);
})

// vote
app.get('/vote', function (request, response) {
	vote.renderPage(request, response);
})
var vote_socket_io = io.of('/vote').on("connection", function (socket) {
	vote.vote_io(socket, io);
})
var vote_socket_io_ssl = ios.of('/vote').on("connection", function (socket) {
	vote.vote_io(socket, io);
})

// weSee
app.get('/wesee', function (request, response) {
	weSee.renderPage(request, response);
})
var weSee_socket_io = io.of('/wesee').on("connection", function (socket) {
	weSee.weSee_io(socket, io);
})

// timedd
app.get('/timedd', function (request, response) {
	timed.renderPage(request, response)
})

var timed_socket_io = io.of('/timedd').on("connection", function (socket) {
	timed.timed_io(socket, io);
})

// testdraw
app.get("/testdraw", function (request, response) {
	testdraw.renderPage(request, response);
});
app.get("/testdraw/previous", function (request, response) {
	testdraw.getPrevious(request, response);
});
var draw = io.of('/testdraw').on("connection", function (socket) {
	testdraw.testdraw_io(socket, io);
})

var rps_socket_io = io.of('/rps/game').on("connection", function (socket, io) {
	rps.rps_io(socket, io);
})

// ------------------------------------------------------------------------- //

http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
https.listen(8081,function() {
	console.log("magic happening on ths https server")
});