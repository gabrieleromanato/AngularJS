'use strict';

angular.module('TwitterApp').controller('SearchCtrl', ['$scope', 'Twitter', 'Storage', '$routeParams', function($scope, Twitter, Storage, $routeParams) {
	$scope.latestTweets = {};
	$scope.tweetsLoaded = false;

	var q = $routeParams.q;

	Twitter.getTweets('/tweets/search', {q: q}, function(tweets) {
		$scope.latestTweets = tweets;
		$scope.tweetsLoaded = true;
	});
}]);