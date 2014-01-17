angular.module('app.services', [])
	.factory('Auth', function ($cookieStore, $http) {
		var cookie = $cookieStore.get('user')
		if (cookie) {
			var username = cookie.username;
			var role = cookie.role;
			var hashtags = cookie.hashtags;
		} else {
			var username = '';
			var role = 0;
			var hashtags = [];
		}
		
		$cookieStore.remove('user');

		return {
			// this.username = username,
			// this.role = role,
			logCookie: function() {
				// console.log(cookie)
				console.log(username)
				console.log(role)
				// return cookie;
				// var cookie = cookie;
				// success()
			},
			// logout: function () {
			// 	$http.post('/twittext/logout').success(function() {
			// 		console.log("logged out")
			// 	})
			// }
			logout: function (success, error) {
				$http.post('/twittext/logout').success(function() {
					username = '';
					role = 0;
					success();
				}).error(error);
			},
			username : username,
			role : role,
			hashtags: hashtags,
		}

})
