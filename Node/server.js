// module dependencies
var express = require("express")
	, app = express()
	, http = require("http").createServer(app);

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

http.listen(app.get("port"), app.get("ipaddr"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});