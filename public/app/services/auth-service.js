angular.module('qlist')
	.factory('AuthService', ['$http', '$q', '$window',
			function($http, $q, $window) {
				var LOCAL_TOKEN_KEY = 'token';
				var isAuthenticated = false;
				var authToken;
				
				function loadUserCredentials() {
					var token = $window.localStorage.getItem(LOCAL_TOKEN_KEY);
					if (token) {
						useCredentials(token);
					}
				};

				function storeUserCredentials(token) {
					$window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
					useCredentials(token);
				};

				function useCredentials(token) {
					isAuthenticated = true;
					authToken = token;
				};

				function destroyUserCredentials() {
					authToken = undefined;
					isAuthenticated = false;
					
					
					$window.localStorage.removeItem(LOCAL_TOKEN_KEY);
				};

				function register (user) {
					return $q(function(resolve, reject) {
						$http.post('/auth/register', user)
						.then(function(result) {
							if (result.data.success) {
								resolve(result.data);
							} else {
								reject(result.data);
							};
						});
					});
				};

				function login (user) {
					return $q(function(resolve, reject) {
						$http.post('/auth/login', user)
						.then(function(result) {
							if (result.data.success) {
								storeUserCredentials(result.data.token);
								
								resolve(result.data);
							} else {
								reject(result.data);
							};
						});
					});
				};

				function logout () {
					destroyUserCredentials();
				};

				function getCurrentUser () {
					if (isAuthenticated && authToken) {
						var payload = authToken.split('.')[1];
						payload = $window.atob(payload);
						payload = JSON.parse(payload);
						return payload.username;
					};

					return "";
				};

				loadUserCredentials();

				return {
					login: login,
					register: register,
					logout: logout,
					getCurrentUser: getCurrentUser,
					isAuthenticated: function() { return isAuthenticated;}
				};

			}]);