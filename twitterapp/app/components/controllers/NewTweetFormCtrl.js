'use strict';

angular.module('TwitterApp').controller('NewTweetFormCtrl', ['$scope', '$rootScope', 'Twitter',  function($scope, $rootScope, Twitter) {
	$scope.tweetText = '';
	$scope.overLimit = false;
	$scope.charCount = 0;
	$scope.tweetSent = false;

	$scope.checkLength = function() {
		$scope.charCount = $scope.tweetText.length;

		if($scope.tweetText.length > 140) {
			$scope.overLimit = true;	
		} else {
			$scope.overLimit = false;
		}
	};

	$scope.sendTweet = function() {
		if(!$scope.overLimit) {
			Twitter.tweet('/tweets/send', $scope.tweetText, function(response) {
				if(response.data.id) {
					$scope.tweetSent = true;
					$scope.$emit('tweetSent', {sent: true});
				}
			});

		}
	};

}]);