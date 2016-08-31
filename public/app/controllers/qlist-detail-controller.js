angular.module('qlist')
	.controller('QListDetailCtrl', ['$scope', '$state', 'qlist', 'QlistService', 'UserService',
			function($scope, $state, qlist, QlistService, UserService) {
				$scope.error_message = '';
				$scope.qlist = qlist;
				$scope.users = [];
				
				UserService.getAllUsers()
				.then(function(users) {
					$scope.users = users;
				});

				
				$scope.updateQlist = function (qlist) {
					QlistService.updateQlist(qlist)
					.then(function() {

						$scope.error_message = '';
						$state.go('main');
						console.log('Дані відпавлені');
					})
					.catch(function(err) {
						$scope.error_message = "Не вдається відправити дані. Спробуйте пізніше";
					});					
				};

			}]);