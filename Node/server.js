// module dependencies
var express = require("express")
	, app = express()
	, http = require("http").createServer(app);

// server config

app.set("ipaddr", "127.0.0.1");

// sever port #
app.set("port", 8080);

app.use(express.bodyParser());

// server routing
app.get("/", function (request, response) {

	response.send("server is up and running");

});

http.listen(app.get("port"), app.get("ipaddr"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});