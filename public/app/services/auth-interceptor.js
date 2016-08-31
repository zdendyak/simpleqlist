angular.module('qlist')
	.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', '$window',
		function($rootScope, $q, AUTH_EVENTS, $window) {
			return {
				responseError: function(response) {
					$rootScope.$broadcast({
						401: AUTH_EVENTS.notAuthenticated
					}[response.status], response);
					return $q.reject(response);
				},
				request: function(config) {
					if ($window.localStorage['token']) {
						config.headers.Authorization = $window.localStorage['token'];
					}
					return config;
				}
			};
	}])

	.config(function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	});