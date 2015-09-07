angular.module('Ecommerce').factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', 'REST_URL', 'LoginService'];

function AuthenticationService($http, $cookieStore, $rootScope, REST_URL, LoginService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            LoginService.save({username: username, password: password}, function(response) {
                callback(response);
            });
        }

        function SetCredentials(username, password) {
            var authdata = btoa(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; 
            $cookieStore.put('globals', $rootScope.globals);
            $cookieStore.put('loggedin', '1');
       }

       function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $cookieStore.remove('loggedin');
            $http.defaults.headers.common.Authorization = 'Basic ';
       }
}