angular.module('qlist')
	.factory('UserService', ['$http', 
			function($http) {
				return {			
					getAllUsers: getAllUsers,
					getUserById: getUserById,
					getProfile: getProfile,
					updateProfile: updateProfile
				};

				function getAllUsers () {

					return $http.get('/api/users')
						.then(function(results){
							return results.data;
						}, function(err) {
							return err;
						});
				};

				function getUserById (id) {

					return $http.get('/api/user/' + id)
						.then(function(results){
							return results.data;
						}, function(err) {
							return err;
						});
				};

				function getProfile () {

					return $http.get('/api/profile')
						.then(function(result){
							return result.data;
						}, function(err) {
							return err;
						});
				};

				function updateProfile(user) {
					return $http.put('/api/profile', user)
						.then(function(result) {
							return result.data;
						}, function(err) {
							return err;
						});
				};

			}]);