angular.module('qlist')
	.controller('QformCtrl', ['$scope', '$state', 'QlistService', 'UserService',
			function($scope, $state, QlistService, UserService) {
				$scope.error_message = '';
				$scope.qlist = {};
				$scope.users = [];
				
				UserService.getAllUsers()
				.then(function(users) {
					$scope.users = users;
				});

				$scope.sendQlist = function (qlist) {
					QlistService.sendQlist(qlist)
					.then(function(qlist) {
						$state.go('main');
						$scope.error_message = '';
						$scope.qlist = {};
						console.log('Дані відпавлені');
					})
					.catch(function(err) {
						$scope.error_message = "Не вдається відправити дані. Спробуйте пізніше";
					});					
				};

			}]);