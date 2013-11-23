function destroySave($scope) {

	$scope.briefcase = [
	{name: 'Destroy the world', result: "You're a jerk!  Did you really think this button would work?"},
	{name: 'Destroy the universe', result: "YOU are the BIGGEST JERK EVER.  This button is broken!"},
	{name: 'Save the world', result: 'You are a good human being.'}
	];

	// declaring the activeButtonIndex model on the scope, this will be shared data between methods
	$scope.activeButtonIndex;

	$scope.setHide = function(index) {
	// in this scope, the method setHide accepts a param that we will call index	
		$scope.activeButtonIndex = index;
		// set the param "index" to the activeButtonIndex model that resides in this scope,  defined above
	}
	// how we use it: in the view, we pass ButtonIndex, which is iterated every time with ng-repeat, as a param in this method
	// so we're passing a specific ButtonIndex, because ng-repeat creates a new scope for each repeated item, 

	$scope.isShowing = function(index) {
	// in this scope, the method isShowing accepts a param that we call index	
		return $scope.activeButtonIndex == index;
		// the method sets the activeButtonIndex in this scope to be EQUAL to index, and then returns it
		// basically, how we use it is... it's saying MAKE THIS TRUE--- the activeButtonIndex is equal to index.  make it true!
		// ng-show... show THIS specifically... and this happens to be the the activeButtonIndex that resides in this scope... 
		// what is that?  it's the current iteration of buttonIndex that we are on
	}

} 