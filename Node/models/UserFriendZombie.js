var mongoose = require('mongoose');

var userSchemaZombie = mongoose.Schema({
   facebook       : {
	   id             : String,
	   token          : String,
	   name           : String,
	   friends        : Array,
  },
});

module.exports = mongoose.model('UserFriendZombie', userSchemaZombie);