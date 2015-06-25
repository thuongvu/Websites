var mongoose = require('mongoose');

var userSchemaTwitter = mongoose.Schema({
	twitter 			: {
		id				: String,
		token			: String,
		tokenSecret	: String,
		displayName	: String,
		username 	: String,
	}
});

module.exports = mongoose.model('UserTwitterType', userSchemaTwitter);