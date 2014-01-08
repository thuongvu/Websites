var Instagram = require("instagram-node-lib");
var events = require("events");
var eventEmitter = new events.EventEmitter();
var url;
var photoCounter = 0;

// you can already see my keys in my git history, so fuck it.
Instagram.set('client_id', '7f3a0d9e6cca4689b5dadeaed96197dd');
Instagram.set('client_secret', 'e75bf8d778ea4b25b5037d5d65ba3f4b');
Instagram.set('callback_url', 'http://node.thuongvuho.com/ig/callback/3');
// curl -X DELETE 'https://api.instagram.com/v1/subscriptions?client_secret=e75bf8d778ea4b25b5037d5d65ba3f4b&object=all&client_id=7f3a0d9e6cca4689b5dadeaed96197dd'

function igSelfieTags() {
	// Instagram.subscriptions.subscribe({
	//   object: 'tag',
	//   object_id: 'selfie',
	//   aspect: 'media',
	//   callback_url: 'http://node.thuongvuho.com/ig/callback/3',
	//   type: 'subscription',
	//   id: '#'
	// });
console.log("running igSelfieTags")
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
		eventEmitter.emit("newPhoto")
	})

	response.end()
}

eventEmitter.on("newPhoto", function () {
	photoCounter++;
	if (photoCounter === 10) {
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
exports.igSelfieTags = igSelfieTags;
exports.ig_io = ig_io;