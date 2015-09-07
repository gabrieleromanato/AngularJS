'use strict';

angular.module('TwitterApp').controller('FollowersCtrl', ['$scope', 'Twitter', 'Storage', '$rootScope', function($scope, Twitter, Storage, $rootScope) {
	$scope.followers = [];
	$scope.tweetsLoaded = false;


	if(!Storage.hasItem('twitter-app-followers')) {

		Twitter.getTweets('/followers', {}, function(response) {
			$scope.followers = response.data.users;
			Storage.saveAsJSON('twitter-app-followers', response.data.users);
			$scope.tweetsLoaded = true;
		});
	} else {
		$scope.followers = Storage.readAsJSON('twitter-app-followers');
		$scope.tweetsLoaded = true;
	}
}]);