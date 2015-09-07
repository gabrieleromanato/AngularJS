'use strict';

angular.module('TwitterApp').factory('Twitter', ['$http', 'REST_URL', function($http, REST_URL) {
	return {
		getTweets: function(url, params, callback) {
			$http.get(REST_URL + url, {
				params: params
			}).then(function(tweets) {
				callback(tweets);
			});
		},
		tweet: function(url, text, callback) {
			$http.post(REST_URL + url, {
				text: text
			}).then(function(response) {
				callback(response);
			}, function(response) {
				console.log(response);
			});	
		}
	};
}]);