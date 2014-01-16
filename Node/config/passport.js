var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategyFriends = require('passport-facebookFriends').Strategy;
var User = require('../models/user');
var UserGuest = require('../models/user');
var UserFriendZombie = require('../models/user');
console.log(UserFriendZombie);
var UserTwitterTwitterType = require('../models/user');
var configAuth = require('./auth');
var sanitizer = require('sanitizer');

module.exports = function (passport) {
	// ----------------------------------- //
	//           SERIALIZE USER	         //
	// ----------------------------------- //

	// used to serialize user for session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	// used to deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		})
	})

	// ----------------------------------- //
	//               LOCAL	          		//
	// ----------------------------------- //

	// local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, email_pre, password_pre, done) {
		// sanitize
		var email = sanitizer.sanitize(email_pre);
		var password = sanitizer.sanitize(password_pre);

		User.findOne({'local.email' : email}, function (err, user) {
			if (err)
				return done(err);
			if (user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken'));
			} else {
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				newUser.save(function(err) {
					if (err)
						throw err;
					return done(null, newUser);
				})
			}
		})
	}))

	//local login
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, email_pre, password_pre, done) {
		// sanitize
			var email = sanitizer.sanitize(email_pre);
			var password = sanitizer.sanitize(password_pre);

			User.findOne({ 'local.email' : email}, function (err, user) {
				if (err)
					return done(err);
				if (!user)
					return done(null, false, req.flash('loginMessage', 'No user found.'));
				if (!user.validPassword(password))
					return done(null, false, req.flash('loginMessage', 'Oops!  Wrong password.'))
				return done(null, user);
			});
	}));



	// ----------------------------------- //
	//       facebook for guestpage			//
	// ----------------------------------- //
	// passport.use(new FacebookStrategy({
	passport.use('fb', new FacebookStrategy({

		clientID				: configAuth.facebookAuth.clientID,
		clientSecret		: configAuth.facebookAuth.clientSecret,
		callbackURL			: configAuth.facebookAuth.callbackURL

	},

	function(token, refreshToken, profile, done) {
			process.nextTick(function() {
				UserGuest.findOne({ 'facebook.id': profile.id}, function(err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, user)
					} else {
						console.log(token)
						console.log(user);
						console.log(profile);
						var newUser 				= new UserGuest();
						newUser.facebook.id 		= profile.id;
						newUser.facebook.token  = token;
						// newUser.facebook.name 	= profile.name.givenName + ' ' + profile.name.familyName;
						newUser.facebook.name 	= profile.name.givenName; // first name only
						newUser.facebook.email 	= profile.emails[0].value;

						newUser.save(function(err) {
							if (err)
								throw err;

							return done(null, newUser);
						});
					}
				});
			});
	}));


	// ----------------------------------- //
	//          facebook_zombie            //
	// ----------------------------------- //
	passport.use('fb_zombie', new FacebookStrategyFriends({

		clientID				: configAuth.facebookZombieAuth.clientID,
		clientSecret		: configAuth.facebookZombieAuth.clientSecret,
		callbackURL			: configAuth.facebookZombieAuth.callbackURL

	},

	function(token, refreshToken, profile, done) {
			process.nextTick(function() {
				UserFriendZombie.findOne({ 'facebook.id': profile.id}, function(err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, user)
					} else {
						var friends = [];
						for (var i = 0; i < 10; i++) {
							var rand = Math.round(Math.random() * 100)
							var person = profile._json.friends.data[rand].name;
							friends.push(person);
						}
						var newUserZ 				= new UserFriendZombie();
						newUserZ.facebook.id 		= profile.id;
						newUserZ.facebook.token  = token;
						newUserZ.facebook.friends = friends;

						newUserZ.save(function(err) {
							if (err)
								throw err;

							return done(null, newUserZ);
						});
					}
				});
			});
	}));
	
	
	// ----------------------------------- //
	//             twittype       			//
	// ----------------------------------- //
	passport.use('twitter', new TwitterStrategy({

		consumerKey				: configAuth.twitterAuth.consumerKey,
		consumerSecret		: configAuth.twitterAuth.consumerSecret,
		callbackURL			: configAuth.twitterAuth.callbackURL

	},

	function(token, refreshToken, profile, done) {
			process.nextTick(function() {
				UserTwitterTwitterType.findOne({ 'twitter.id': profile.id}, function(err, user) {
					if (err)
						return done(err);
					if (user) {
						return done(null, user)
					} else {
						var newUser 				= new UserTwitterTwitterType();
						newUser.twitter.id 		= profile.id;
						newUser.twitter.token  = token;
						newUser.twitter.username 	= profile.username; 
						newUser.twitter.displayName 	= profile.displayName;

						newUser.save(function(err) {
							if (err)
								throw err;

							return done(null, newUser);
						});
					}
				});
			});
	}));


};
