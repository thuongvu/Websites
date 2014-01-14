var mongojs = require('mongojs');
var db = mongojs('test', ['guestBookCollection']);
var sanitizer = require('sanitizer');
var _ = require("underscore");

module.exports = function (app, passport) {
	// AUTH PAGE
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

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))

	// app.get('/auth/facebook/callback',
	// 	passport.authenticate('facebook', {
	// 		successRedirect : '/auth/profile',
	// 		failureRedirect : '/auth'
	// 	}));


// GUESTBOOK
app.get('/guestbook', function (req, res) {
	// w/o mongo data
	res.render('guestbook/index');

	// // w/ db data
	// db.guestBookCollection.find(function(err, docs) {
	// 	res.render('guestbook/index', {guestPosts: docs})
	// }) 
});


app.get('/guestbook/login', function (req, res) {
	res.render('guestbook/login', { message: req.flash('loginMessage')});
})

app.post('/guestbook/login', passport.authenticate('local-login', {
	successRedirect: '/guestbook/loggedin',
	failureRedirect: '/guestbook/login',
	failureFlash: true
}))

app.get('/guestbook/facebook', passport.authenticate('facebook', {scope: 'email'}))

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/guestbook/loggedin',
		failureRedirect : '/guestbook'
	}));

app.get('/guestbook/loggedin', isLoggedIn, function (req, res) {
	res.render('guestbook/loggedin', {
		user : req.user
	});
});


app.post("/guestbook/post", function (request, response) {
	console.log(request.body.message);
	console.log(request.user.facebook.name)
	var message = sanitizer.sanitize(request.body.message);
	var fbName = sanitizer.sanitize(request.user.facebook.name)

	if (_.isUndefined(message) || _.isEmpty(message.trim())) {
		return response.json(400, {error: "wisdom is invalid"});
	}
	
	db.guestBookCollection.save({message: message}, function(err, saved) {
	  if( err || !saved ) console.log("message not saved in db");
	  else console.log("message in db");
	  response.end() // test here
	});

})


}
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/auth'); 
}