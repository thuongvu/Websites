var mongojs = require('mongojs');
var db = mongojs('test', ['guestBookCollection']);
var sanitizer = require('sanitizer');
var _ = require("underscore");

module.exports = function (app, passport) {
	// ======================================================================================== //
	// ---------------------------------- AUTH  START ----------------------------------------- //
	// ======================================================================================== //
	app.get('/auth', function (req, res) {
		res.render('auth/index');
	});

	app.get('/auth/login', function (req, res) {
		res.render('auth/login', { message: req.flash('loginMessage')});
	})

	app.post('/auth/login', passport.authenticate('local-login', {
		successRedirect: '/auth/profile',
		failureRedirect: '/auth/login',
		failureFlash: true
	}))

	app.get('/auth/signup', function (req, res) {
		res.render('auth/signup', {message: req.flash('signupMessage')});
	});

	app.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect: '/auth/profile',
		failureRedirect: '/auth/signup',
		failureFlash: true
	}));

	app.get('/auth/profile', isLoggedIn, function (req, res) {
		res.render('auth/profile', {
			user : req.user
		});
	});

	app.get('/auth/fbprofile', isLoggedIn, function (req, res) {
		res.render('auth/fbprofile', {
			user : req.user
		});
	});

	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect('/auth');
	});

// ======================================================================================== //
// ----------------------------- GUESTBOOK  START ----------------------------------------- //
// ======================================================================================== //

app.get('/guestbook', function (req, res) {
	db.guestBookCollection.find(function(err, data) {
		// res.cookie('user', JSON.stringify({
		// 	'user': req.user
		// }))
		// console.log(JSON.stringify(req.user));
		res.render('guestbook/index', {guestPosts: data})
	}) 
});

app.get('/guestbook/facebook', passport.authenticate('fb', {scope: ['email']}))

app.get('/auth/facebook/callback',
	passport.authenticate('fb', {
		successRedirect : '/guestbook/loggedin',
		failureRedirect : '/guestbook'
	}));

app.get('/guestbook/loggedin', isLoggedInGuessBook, function (req, res) {
	db.guestBookCollection.find(function(err, data) {
		// res.cookie('user', JSON.stringify({
		// 	'user': req.user
		// }))
		// console.log(JSON.stringify(req.user));
		res.render('guestbook/loggedin', {guestPosts: data, user: req.user})
	}) 
});

app.post("/guestbook/loggedin", function (request, response) {
	var message = sanitizer.sanitize(request.body.message.slice(0, 255));
	var fbName = sanitizer.sanitize(request.user.facebook.name)

	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "wisdom is invalid"});
	}
	
	db.guestBookCollection.save({message: message, fbName: fbName}, function(err, saved) {
	  if( err || !saved ) console.log("message not saved in db");
	  else console.log("message in db");
	  db.guestBookCollection.find(function(err, data) {
	  	response.render('guestbook/loggedin', {guestPosts: data, user: request.user})
	  }) 
	});
})

app.get('/guestbook/logout', function (req, res) {
	req.logout();
	res.redirect('/guestbook');
	res.clearCookie('user');
});

// ======================================================================================== //
// ----------------------------------- ZOMBIEBOOK ----------------------------------------- //
// ======================================================================================== //

app.get('/zombiebook', function (req, res) {
		res.render('zombiebook/index', { state : 'not logged in', friends : 'l'})
});

app.get('/zombiebook/facebook', passport.authenticate('fb_zombie', {scope: 'email'}))

app.get('/zombiebook/facebook/callback',
	passport.authenticate('fb_zombie'), function(req, res) {
		// res.cookie('user', JSON.stringify({
		// 	'user': req.user
		// }))
		res.render('zombiebook/index', { state : 'loggedinsuccessfully', friends: req.user.facebook.friends})
	});

app.post('/zombiebook/logout', function (req, res) {
	req.logout();
	res.redirect('/zombiebook');
	res.clearCookie('user');
	console.log("someone just logged out")
});

//} -- i dont know why this was here, in case it breaks soemthing i know it was here 
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/auth'); 
}
function isLoggedInGuessBook(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/guessbook'); 
}