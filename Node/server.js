// module dependencies
var express = require("express")
	, app = express()
	, http = require("http").createServer(app)
	, io = require("socket.io").listen(http)
	, _ = require("underscore");

// server config

app.set("ipaddr", "127.0.0.1");

// sever port #
app.set("port", 8080);

// specifify views folder
app.set("views", __dirname + "/views");

// view engine is jade
app.set("view engine", "jade");

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

	// let the client know
	response.json(200, {message: "Message received"});

})

http.listen(app.get("port"), app.get("ipaddr"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});





















