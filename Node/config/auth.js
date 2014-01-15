module.exports = {

	'facebookAuth' : {
		'clientID' 		: '496629287120285', 
		'clientSecret' 	: 'e7ec12e547f7edd97b034a73fd1862d3', 
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback' // for development // http://localhost:8080/auth/facebook/callback
		// 'callbackURL' 	: 'http://node.thuongvuho.com/auth/facebook/callback' // http://node.thuongvuho.com/auth/facebook/callback
	},

	'facebookZombieAuth' : {
		'clientID' 		: '578420412244987', 
		'clientSecret' 	: '818c4ccfa0e65b7740a37bb31ac474db', 
		// 'callbackURL' 	: 'http://localhost:8080/zombiebook/facebook/callback' // for development // http://localhost:8080/auth/facebook/callback
		'callbackURL' 	: 'http://node.thuongvuho.com/zombiebook/facebook/callback' // http://node.thuongvuho.com/zombiebook/facebook/callback
	},

	// 'facebookZombieAuth' : {
	// 	'clientID' 		: '625022444231201', 
	// 	'clientSecret' 	: '84e79a0cb88628d1dcf7936edd7e59d9', 
	// 	'callbackURL' 	: 'http://localhost:8080/zombiebook/facebook/callback' // for development // http://localhost:8080/auth/facebook/callback
	// 	// 'callbackURL' 	: 'http://node.thuongvuho.com/zombiebook/facebook/callback' // http://node.thuongvuho.com/zombiebook/facebook/callback
	// },

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};