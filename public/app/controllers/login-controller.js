angular.module('qlist')
	.controller('LoginCtrl', ['$scope', '$state', '$rootScope', 'AuthService', 'AUTH_EVENTS',
			function($scope, $state, $rootScope, AuthService, AUTH_EVENTS) {
				$scope.error_message = '';
				$scope.user = {};

				$scope.login = function(user) {
					AuthService.login(user)
					.then(function(result) {
						$scope.error_message = '';
						$scope.user = {};
						
						$state.go('main');
					})
					.catch(function(err) {
						$scope.error_message = err.message;
						$scope.user = {};
					});
				};

			}]);