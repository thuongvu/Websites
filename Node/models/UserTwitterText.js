var mongoose = require('mongoose');

var userSchemaTwitterText = mongoose.Schema({
	twitter 			: {
		id				: String,
		token			: String,
		tokenSecret	: String,
		displayName	: String,
		username 	: String,
	}
});

module.exports = mongoose.model('UserTwitterText', userSchemaTwitterText);