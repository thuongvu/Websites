var mongoose = require('mongoose');

var userSchemaGuest = mongoose.Schema({
	facebook			: {
		id				: String,
		token			: String,
		email			: String,
		name			: String
	}
});

module.exports = mongoose.model('UserGuest', userSchemaGuest);