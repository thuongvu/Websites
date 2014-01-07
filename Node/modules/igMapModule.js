var Instagram = require("instagram-node-lib");
var events = require("events");
var _ = require("underscore");
var eventEmitter = new events.EventEmitter();
var url;
var photoCounter = 0;
var subscriptions = [];

// you can already see my keys in my git history, so fuck it.
Instagram.set('client_id', 'ee792378f4f2484b81748343d1bba08b');
Instagram.set('client_secret', '4c36bd0b64214355abfeb6b80cf8960b');
Instagram.set('callback_url', 'http://181e0fc6.ngrok.com/igmap/callback/1');

// https://api.instagram.com/v1/subscriptions?client_secret=4c36bd0b64214355abfeb6b80cf8960b&client_id=ee792378f4f2484b81748343d1bba08b
// curl -X DELETE 'https://api.instagram.com/v1/subscriptions?client_secret=e75bf8d778ea4b25b5037d5d65ba3f4b&object=all&client_id=7f3a0d9e6cca4689b5dadeaed96197dd'

// function igGeo() {
// 	Instagram.subscriptions.subscribe({
// 	  object: 'geography',
// 	  aspect: 'media',
// 	  lat: '35.657872',
// 	  lng: '139.70232',
// 	  radius: '2000',
// 	  type: 'subscription',
// 	  id: '#'
// 	});
// }


function igGeo(lat, lng) {
	// Instagram.subscriptions.list();
	for (var i = 0; i < subscriptions.length; i++) {
		Instagram.subscriptions.unsubscribe({ id: subscriptions[i] })
	}
	// Instagram.subscriptions.unsubscribe({ id: 4585406 })
	// Instagram.subscriptions.unsubscribe_all();

	// showList

	// Instagram.subscriptions.unsubscribe({ id: 4030559 });
	// Instagram.subscriptions.unsubscribe_all();
	// Instagram.media.unsubscribe_all();

	Instagram.subscriptions.subscribe({
	  object: 'geography',
	  aspect: 'media',
	  lat: lat,
	  lng: lng,
	  radius: '2000',
	  type: 'subscription',
	  id: '#'
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
	// subscriptions.push((data.subscription_id);
	// console.log(subscriptions)
	console.log(data)
	data.forEach(function(tag) {
		url = 'https://api.instagram.com/v1/geographies/' + tag.object_id + '/media/recent?&count=1&client_id=ee792378f4f2484b81748343d1bba08b';
		// if (_.contains(subscriptions, tag.subscription_id)) {
		// 	console.log("already has " + tag.subscription_id)
		// } else {
		// 	subscriptions.push(tag.subscription_id);
		// }
		if (!(_.contains(subscriptions, tag.subscription_id))) {
			subscriptions.push(tag.subscription_id);
		}
		eventEmitter.emit("newPhoto");
	})

	response.end()
}

eventEmitter.on("newPhoto", function () {
	// photoCounter++;
	// if (photoCounter === 10) {
		eventEmitter.emit("sendPhoto")
		// photoCounter = 0;
	// }
})


function igMap_io (socket,io) {
	eventEmitter.on("sendPhoto", function () {
		socket.emit("newPhoto", {data: url});
	})

	socket.on("newLocation", function (data){
		console.log(data.lat)
		igGeo(data.lat, data.lng)
	})



}

exports.renderPage = renderPage;
exports.handshake = handshake;
exports.igPost = igPost;
exports.igGeo = igGeo;
exports.igMap_io = igMap_io;


