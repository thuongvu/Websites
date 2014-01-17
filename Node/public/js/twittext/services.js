angular.module('app.services', [])
	.factory('Auth', function ($cookieStore, $http) {
		var cookie = $cookieStore.get('user')
		if (cookie) {
			var username = cookie.username;
			var role = cookie.role;
		}
		
		$cookieStore.remove('user');

		return {
			logCookie: function() {
				console.log(cookie)
				console.log(username)
				console.log(role)
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

			}
		}

})
