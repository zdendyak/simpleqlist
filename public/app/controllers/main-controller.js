angular.module('qlist')
	.controller('MainCtrl', ['$scope', '$state', 'QlistService', 'AuthService','AUTH_EVENTS', 'UserService',
			function($scope, $state, QlistService, AuthService, AUTH_EVENTS, UserService) {						

				$scope.searchField = '';

				$scope.oneAtATime = false;
				
				$scope.qlists = [];

				UserService.getAllUsers()
				.then(function(users) {

					if (AuthService.isAuthenticated()) {
						QlistService.getAllQlists()
						.then(function(data){
							
							$scope.qlists = data;
							$scope.qlists.forEach(function(qlist){
								let manager = users.filter(function(user) {
									return qlist.manager === user.id;
								})[0];
								qlist.managerName = manager.firstName + ' ' + manager.lastName;
							})
						}, function(err) {
							$scope.error_message = "Не вдається отримати дані. Спробуйте оновити сторінку";
							
						});
					};
				});

				
				
						

				if (!$scope.qlists) {
					$scope.message = 'У Вас поки немає збережених даних. Додайте опитувальний лист';

				};

				$scope.closeAlert = function() {
					$scope.message = '';
				};

				$scope.delete = function(id) {
					QlistService.deleteQlistById(id)
					.then(function(data){
						$state.reload();
						console.log(data);
					}, function(err) {
						$scope.error_message = "Не вдається видалити дані";
					
				});
				}


			}]);