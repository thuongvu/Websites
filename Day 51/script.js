var app = angular.module('app', []);

app.factory('parseService', function($q) {
	Parse.initialize("cZ8rrWVabWBWsgOF2h6AYPf4zG6uKce9QF5CxXJ2", "l8STgm2xfRHufGSi1PqpPoPE3IDjax2OjUj0KEMq");
	var Item = Parse.Object.extend("Item");

	var parseService = {

		facebookLogin: function() {
			var defer = $q.defer();
			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					if (!user.existed()) {
						console.log("user signed up and logged in through facebook");
					} else {
						console.log("user logged in through facebook");
					};
					var loggedInUser = user;
					defer.resolve();
				},
				error: function(user, error) {
					console.log("user cancelled the facebook login or did not fully authorize");
				}
			});
			return defer.promise;
		},

		logOut: function () {
			var defer = $q.defer();
			defer.resolve(Parse.User.logOut());
			return defer.promise;
		},

		addItem: function(itemInput) {
			var defer = $q.defer()
			var loggedInUser = Parse.User.current();
			var object = new Item();
			object.set({item: itemInput});
			object.setACL(new Parse.ACL(Parse.User.current()));
			defer.resolve(object.save());
			return defer.promise;
		},

		getItems: function(callback) {
			var query = new Parse.Query(Item);
			query.find({
				success: function (results) {
					callback(results);
				},
				error: function (error) {
					console.log(error.message);
				}
			})
		},

		deleteItem: function(objID) {
			var defer = $q.defer();
			var query = new Parse.Query(Item);
			query.get(objID, {
				success: function(object) {
					object.destroy({
						success: function(object) {
							console.log('successfully deleted')
							defer.resolve();
						},
						error: function(error) {
							console.log(error.message);
						}
					})
				},
				error: function(error) {
					console.log(error.message)
				}
			})
			return defer.promise;
		}

	}
	return parseService;
})

app.controller('mainCtrl', function ($scope, parseService, $timeout, $q) {
	$scope.itemsList = [];

	$scope.checkLoggedState = function () {
		if (Parse.User.current()) {
			$scope.loggedIn = true;
		} else {
			$scope.loggedIn = false;
		}
	};
	$scope.checkLoggedState();

	$scope.facebookLogin = function () {
		parseService.facebookLogin()
		.then(function() {
			$scope.getItems()
		})
		.then(function() {
			$scope.checkLoggedState();
		});
	}
	$scope.logOut = function () {
		parseService.logOut()
		.then(function() {
			$scope.checkLoggedState()
		})
		.then(function() {
			$scope.itemsList = [];
		})
		
	}
	$scope.addItem = function () { 
		parseService.addItem($scope.item)
		.then(function () {
			$scope.item = '';
		})
		.then(function() {
			$scope.getItems();
		})

	}
	$scope.getItems = function () {
		parseService.getItems(function(results) {
			$scope.$apply(function() {
				$scope.itemsList = results;
			})
		})
	}
	$scope.getItems();
	$scope.deleteItem = function (ObjID) {
		parseService.deleteItem(ObjID)
		.then(function () {
			$scope.getItems();
		})
	}

})






