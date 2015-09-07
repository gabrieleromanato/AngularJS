'use strict';

angular.module('TwitterApp').controller('TimeLineCtrl', ['$scope', 'Twitter', 'Storage', '$rootScope', function($scope, Twitter, Storage, $rootScope) {
	$scope.latestTweets = {};
	$scope.tweetsLoaded = false;

	$scope.refresh = function() {
		$scope.tweetsLoaded = false;
		Twitter.getTweets('/status/timeline', {}, function(tweets) {
			$scope.latestTweets = tweets;
			Storage.remove('twitter-app-timeline');
			Storage.saveAsJSON('twitter-app-timeline', tweets);
			$scope.tweetsLoaded = true;
		});
	};

	$scope.$on('handleTweet', function(event, args) {
        if(args.sent) {
        	$scope.refresh();
        }
    });   

	if(!Storage.hasItem('twitter-app-timeline')) {

		Twitter.getTweets('/status/timeline', {}, function(tweets) {
			$scope.latestTweets = tweets;
			Storage.saveAsJSON('twitter-app-timeline', tweets);
			$scope.tweetsLoaded = true;
		});
	} else {
		$scope.latestTweets = Storage.readAsJSON('twitter-app-timeline');
		$scope.tweetsLoaded = true;
	}
}]);