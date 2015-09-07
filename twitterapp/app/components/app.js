'use strict';

angular.module('TwitterApp', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCookies', 'TwitterFilters']);
angular.module('TwitterApp').constant('REST_URL', '/api');

angular.module('TwitterApp').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
  	title: 'Timeline | TwitterApp',
  	controller: 'TimeLineCtrl',
  	templateUrl: 'app/views/timeline.html',
    section: 'timeline'
  }).when('/home', {
    title: 'Home | TwitterApp',
    controller: 'HomeCtrl',
    templateUrl: 'app/views/home.html',
    section: 'home'
  }).when('/followers', {
    title: 'Followers | TwitterApp',
    controller: 'FollowersCtrl',
    templateUrl: 'app/views/followers.html',
    section: 'followers'
  }).when('/search/:q', {
    title: 'Search | TwitterApp',
    controller: 'SearchCtrl',
    templateUrl: 'app/views/search.html'
  }).otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(false).hashPrefix('!');

}]);

angular.module('TwitterApp').run(['$rootScope',
  function($rootScope) {

    $rootScope.menuItem = '';

    $rootScope.$on('tweetSent', function(event, args) {
        $rootScope.$broadcast('handleTweet', args);
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    	if (current.hasOwnProperty('$$route')) {

            $rootScope.title = current.$$route.title;
            $rootScope.menuItem = current.$$route.section;

        }
    });
}]);