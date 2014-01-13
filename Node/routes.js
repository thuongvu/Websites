module.exports = function (app, passport) {
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

	app.get('/auth/logout', function (req, res) {
		req.logout();
		res.redirect('/auth');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/auth/profile',
			failureRedirect : '/auth'
		}));

}
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/auth'); 
}