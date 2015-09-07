'use strict';

angular.module('TwitterApp').controller('SearchFormCtrl', ['$scope', '$window', function($scope, $window) {
	$scope.query = '';
	$scope.search = function() {
		$window.location.href = '#!/search/' + $scope.query;
	};
}]);