var Instagram = require("instagram-node-lib");
var events = require("events");
var eventEmitter = new events.EventEmitter();
var url;
var photoCounter = 0;

Instagram.set('client_id', '7f3a0d9e6cca4689b5dadeaed96197dd');
Instagram.set('client_secret', 'e75bf8d778ea4b25b5037d5d65ba3f4b');
// Instagram.set('callback_url', 'http://181e0fc6.ngrok.com/ig/callback/3');
Instagram.set('callback_url', 'http://node.thuongvuho.com/ig/callback/3');

function igBlueTags() {
	// Instagram.tags.info({
	//   name: 'blue',
	//   complete: function(data){
	//     console.log(data);
	//   }
	// });

	// Instagram.media.popular({
	// 	complete: function(data) {
	// 		console.log(data)
	// 	}
	// })
	// Instagram.media.popular({complete: function (data) {
	// 	console.log(data)
	// }})

	// Instagram.media.search({ lat: 48.858844300000001, lng: 2.2943506 })

	// Instagram.tags.recent({name: 'selfie'});

	// Instagram.tags.subscribe({ 
	// 	object: 'tag',
	// 	object_id: 'selfie',
	// 	aspect: 'media',
	// 	callback_url: 'https://181e0fc6.ngrok.com/ig/callback',
	// 	type: 'subscription',
	// 	id: "#"
	// })
	//4028882 / 5


	Instagram.subscriptions.subscribe({
	  object: 'tag',
	  object_id: 'selfie',
	  aspect: 'media',
	  // callback_url: 'https://181e0fc6.ngrok.com/ig/callback/3',
	  callback_url: 'http://node.thuongvuho.com/ig/callback/3',
	  type: 'subscription',
	  id: '#'
	});

// Instagram.subscriptions.unsubscribe_all();


}


function renderPage(request, response) {
	response.render('ig/ig')
	Instagram.subscriptions.list();
}

function handshake(request, response) {
	Instagram.subscriptions.handshake(request, response);
}

function igPost(request, response) {
	var data = request.body;


	data.forEach(function(tag) {
		url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?&count=1&client_id=7f3a0d9e6cca4689b5dadeaed96197dd';
		console.log(url)
		eventEmitter.emit("newPhoto")
	})

	response.end()
}


eventEmitter.on("newPhoto", function () {
	photoCounter++;
	if (photoCounter === 100) {
		eventEmitter.emit("sendPhoto")
		photoCounter = 0;
	}
})

function ig_io(socket,io) {
	eventEmitter.on("sendPhoto", function () {
		socket.emit("newPhoto", {data: url});
	})

}


exports.renderPage = renderPage;
exports.handshake = handshake;
exports.igPost = igPost;
exports.igBlueTags = igBlueTags;
exports.ig_io = ig_io;