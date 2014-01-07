var Instagram = require("instagram-node-lib");
var events = require("events");
var _ = require("underscore");
var eventEmitter = new events.EventEmitter();
var url;
var subscriptions = [];
var subDirectory = {};
var subscriptionID;

// you can already see my keys in my git history, so fuck it.
Instagram.set('client_id', 'ee792378f4f2484b81748343d1bba08b');
Instagram.set('client_secret', '4c36bd0b64214355abfeb6b80cf8960b');
// Instagram.set('callback_url', 'http://181e0fc6.ngrok.com/igmap/callback/1');
Instagram.set('callback_url', 'http://node.thuongvuho.com/igmap/callback/1');

function igGeo(lat, lng, socketId) {
	if (subDirectory[socketId]) {
		var previousSub = subDirectory[socketId];
		Instagram.subscriptions.unsubscribe({ id: previousSub })
	}
	// quick fix
	Instagram.subscriptions.unsubscribe({ id: 4586176 };

	console.log("socketId is + " + socketId);

	Instagram.subscriptions.subscribe({
	  object: 'geography',
	  aspect: 'media',
	  lat: lat,
	  lng: lng,
	  radius: '4000',
	  type: 'subscription',
	  id: '#',
	  complete: function (data) {
	  	console.log("subscription is " +  data.id)
	  	subDirectory[socketId] = data.id
	  	console.log(subDirectory)
	  	eventEmitter.emit("newSubscription", {data: data.id, id: socketId});
	  	
	  }
	});
}


function renderPage(request, response) {
	response.render('igMap/igMap')
}

function handshake(request, response) {
	Instagram.subscriptions.handshake(request, response);
}

function igPost(request, response) {
	var data = request.body;
	console.log(data);

	data.forEach(function(tag) {
		url = 'https://api.instagram.com/v1/geographies/' + tag.object_id + '/media/recent?&count=1&client_id=ee792378f4f2484b81748343d1bba08b';
		subscriptionID = tag.subscription_id;
		if (!(_.contains(subscriptions, tag.subscription_id))) {
			subscriptions.push(tag.subscription_id);
		}
		eventEmitter.emit("sendPhoto");
	})

	response.end()
}

function igMap_io (socket,io) {
	eventEmitter.on("sendPhoto", function () {
		socket.emit("newPhoto", {data: url, subscriptionID: subscriptionID});
	})

	socket.on("newLocation", function (data){
		igGeo(data.lat, data.lng, data.id)
	})

	socket.emit("connection", {id: socket.id})

	eventEmitter.on("newSubscription", function (data) {
		var subscription = data.data;
		var socketId = data.id;
		socket.emit("newSubscription", {data: subscription, socketId: socketId});
	})
	
	socket.on("disconnect", function () {
		var socketId = socket.id;
		if (subDirectory[socketId]) {
		var previousSub = subDirectory[socketId];
		Instagram.subscriptions.unsubscribe({ id: previousSub })
		console.log("this is what is left of subdirectory")
		console.log(subDirectory)
	}
	})


}

exports.renderPage = renderPage;
exports.handshake = handshake;
exports.igPost = igPost;
exports.igGeo = igGeo;
exports.igMap_io = igMap_io;