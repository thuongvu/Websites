var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	local 			: {
		email 		: String,
		password		: String,
	},
	facebook			: {
		id				: String,
		token			: String,
		email			: String,
		name			: String
	},
	twitter 			: {
		id				: String,
		token			: String,
		displayName	: String,
		username 	: String,
	},
	google			: {
		id				: String,
		token			: String,
		email			: String,
		name 			: String
	}
});

var userSchemaGuest = mongoose.Schema({
	facebook			: {
		id				: String,
		token			: String,
		email			: String,
		name			: String
	}
});

var userSchemaZombie = mongoose.Schema({
   facebook       : {
   id             : String,
   token          : String,
   name           : String,
   friends        : Array,
  },
});

var userSchemaTwitter = mongoose.Schema({
	twitter 			: {
		id				: String,
		token			: String,
		displayName	: String,
		username 	: String,
	}
});

// methods -----------------

//generate hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
// check password valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password)
};

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('UserGuest', userSchemaGuest);
module.exports = mongoose.model('UserTwitterType', userSchemaTwitter);
module.exports = mongoose.model('UserFriendZombie', userSchemaZombie);