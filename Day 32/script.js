function multiplication ($scope) {
	$scope.table = {startNum: 1};

	$scope.times = function() {
		$scope.table.result1 = $scope.table.startNum * 1;
		$scope.table.result2 = $scope.table.startNum * 2;
		$scope.table.result3 = $scope.table.startNum * 3;
		$scope.table.result4 = $scope.table.startNum * 4;
		$scope.table.result5 = $scope.table.startNum * 5;
		$scope.table.result6 = $scope.table.startNum * 6;
		$scope.table.result7 = $scope.table.startNum * 7;
		$scope.table.result8 = $scope.table.startNum * 8;
		$scope.table.result9 = $scope.table.startNum * 9;
		$scope.table.result10 = $scope.table.startNum * 10;
		$scope.table.result11 = $scope.table.startNum * 11;
		$scope.table.result12 = $scope.table.startNum * 12; 

		// why does this not work?
		// for (i = 1; i<12; i++) {
		// 	$scope.table.result[i] = $scope.table.startNum * i;
		// }
	}

}