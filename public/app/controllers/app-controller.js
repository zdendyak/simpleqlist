angular.module('qlist')
	.controller('AppCtrl', ['$scope', '$state', 'AuthService', 'AUTH_EVENTS',
			function($scope, $state, AuthService, AUTH_EVENTS) {
				$scope.authenticated = AuthService.isAuthenticated;
				

				$scope.currentUser = AuthService.getCurrentUser;
				

				$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
					AuthService.logout();
					$state.go('login');
				});

				$scope.logout = function() {
					AuthService.logout();				
					$state.go('login');
				};
			}]);