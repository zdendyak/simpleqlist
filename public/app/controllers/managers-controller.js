angular.module('qlist')
	.controller('ManagersCtrl', ['$scope', '$state', 'UserService', 'AuthService','AUTH_EVENTS',
			function($scope, $state, UserService, AuthService, AUTH_EVENTS) {						
				$scope.error_message = "";
				$scope.searchField = '';	
				
				$scope.managers = [];

				
				if (AuthService.isAuthenticated()) {
					UserService.getAllUsers()
					.then(function(data){
						
						$scope.managers = data;
					}, function(err) {
						$scope.error_message = "Не вдається отримати дані. Спробуйте оновити сторінку";
						
					});
				};
						
			}]);