var expanderApp = angular.module('expanderModule', [])

expanderApp.controller("SomeController", function ($scope) {
	$scope.myArray = ['images/daphne.png', 'images/fred.gif','images/scooby.gif','images/shaggy.gif','images/velma.gif', 'images/monster.gif'];

	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	};
	$scope.newArray = shuffle($scope.myArray);

	$scope.expanders = [
		{
			text: $scope.newArray[0]
		},
		{
			text: $scope.newArray[1]
		},
		{
			text: $scope.newArray[2]
		},
		{
			text: $scope.newArray[3]
		},
		{
			text: $scope.newArray[4]
		},
		{
			text: $scope.newArray[5]
		}

	];

	$scope.runRL = function() {
	if (Math.floor(Math.random() * 2) > 0) {
		$scope.direction = "right";
	} else {
		$scope.direction = "left";
	}
};
		
});

expanderApp.directive('accordion', function() {
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div ng-transclude></div>',
		controller: function() {
			var expanders = [];
			this.gotOpened = function(selectedExpander) {
				angular.forEach(expanders, function(expander) {
					if (selectedExpander != expander) {
						expander.showMe = false;
						expander.titleShow = true;
					}
				});
			}
			this.addExpander = function(expander) {
				expanders.push(expander);
			}
		}
	}
});

expanderApp.directive('expander', function(){
	return {
		restrict: 'EA', 
		replace: true, 
		transclude: true, 
		require: '^?accordion',
		scope: { title:'=expanderTitle' },
		template: '<div>' +
			'<div class="title" ng-show="titleShow" ng-click="toggle()"><img src="images/DungeonDoor.jpg" width="150"></div>' +
			'<div class="body" ng-show="showMe" ng-transclude></div>' +
			'</div>',
		link: function (scope, element, attrs, accordionController) {
			scope.titleShow = true;
			scope.showMe = false;
			accordionController.addExpander(scope);

			scope.toggle = function toggle() {
				scope.titleShow = false;
				scope.showMe = !scope.showMe;
				accordionController.gotOpened(scope);
				
			}
		}
	}
});

expanderApp.directive("run", function() {
	return function($scope, element, attrs) {
		element.bind("mouseenter", function() {
			element.addClass(attrs.run)
			$scope.runRL();
		})
	}
})








