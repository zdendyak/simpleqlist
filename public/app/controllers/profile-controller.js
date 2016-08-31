angular.module('qlist')
	.controller('ProfileCtrl', ['$scope', '$state', 'UserService',
			function($scope, $state, UserService) {
				$scope.error_message = '';

				UserService.getProfile()
				.then(function(data){
					$scope.user = data;
				})
				.catch(function(err) {
					$scope.error_message = err.message;
				});

				
				$scope.update = function(user) {
					$scope.error_message = '';
					UserService.updateProfile(user)
						.then(function(result) {
							$scope.error_message = 'Профіль оновлено';
							$scope.user = result;
							
						})
						.catch(function(err) {
							$scope.error_message = err.message;
						});
				};

			}]);