'use strict';

angular.module('TwitterApp').controller('NavigationCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.setCurrentSection = function(section) {
		$rootScope.menuItem = section;
	};
}]);