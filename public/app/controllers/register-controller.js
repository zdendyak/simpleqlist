angular.module('qlist')
	.controller('RegisterCtrl', ['$scope', '$state', 'AuthService',
			function($scope, $state, AuthService) {
				$scope.error_message = '';
				$scope.user = {};

				$scope.register = function(user) {
					$scope.error_message = '';
					if ($scope.user.password === $scope.user.password2) {
						AuthService.register(user)
						.then(function(result) {
							$scope.error_message = '';
							$scope.user = {};
							$state.go('login');
						})
						.catch(function(err) {
							$scope.error_message = err.message;
						});
					} else {
						$scope.error_message = 'Паролі не співпадають';
					};
				};

			}]);