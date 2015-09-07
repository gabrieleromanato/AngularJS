'use strict';

angular.module('TwitterApp').controller('HomeCtrl', ['$scope', 'Twitter', 'Storage', function($scope, Twitter, Storage) {
	$scope.latestTweets = {};
	$scope.tweetsLoaded = false;

	$scope.refresh = function() {
		$scope.tweetsLoaded = false;
		Twitter.getTweets('/status/home', {}, function(tweets) {
			$scope.latestTweets = tweets;
			Storage.remove('twitter-app-home');
			Storage.saveAsJSON('twitter-app-home', tweets);
			$scope.tweetsLoaded = true;
		});
	};

	if(!Storage.hasItem('twitter-app-home')) {

		Twitter.getTweets('/status/home', {}, function(tweets) {
			$scope.latestTweets = tweets;
			Storage.saveAsJSON('twitter-app-home', tweets);
			$scope.tweetsLoaded = true;
		});
	} else {
		$scope.latestTweets = Storage.readAsJSON('twitter-app-home');
		$scope.tweetsLoaded = true;
	}
}]);