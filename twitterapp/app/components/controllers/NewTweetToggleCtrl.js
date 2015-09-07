'use strict';

angular.module('TwitterApp').controller('NewTweetToggleCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.tweetFormVisible = false;
	$scope.toggleTweetForm = function() {
		$rootScope.tweetFormVisible = !$rootScope.tweetFormVisible;
	};
}]);