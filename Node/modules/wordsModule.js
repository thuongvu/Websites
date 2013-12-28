
// function chatroomPost (request, response, io) {
// 	var message = request.body.message;
// 	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
// 		return response.json(400, {error: "Message is invalid"});
// 	}
// 	var name = request.body.name;
// 	io.of('/chatroom').emit("incomingMessage", {message: message, name: name});
// 	response.json(200, {message: "Message received"});
// };

function addSentence (request, response) {
	var sentence = request.body.sentence;
	if (_.isUndefined(sentence) || _.isEmpty(sentence.trim())) {
		return response.json(400, {error: "Sentence is invalid"});
	}
	console.log(sentence);
}

exports.addSentence = addSentence;
