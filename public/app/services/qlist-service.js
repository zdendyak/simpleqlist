angular.module('qlist')
	.factory('QlistService', ['$http', '$q',
			function($http, $q) {
				return {
					sendQlist: sendQlist,
					getAllQlists: getAllQlists,
					getQlistById: getQlistById,
					updateQlist: updateQlist,
					deleteQlistById: deleteQlistById
				};

				function sendQlist (qlist) {
					
					return $http.post('api/qlist', qlist)
					.then(function(result){
						return result.data;
					}, function(err) {
						console.log(err);
						return err;
					});
				};

				function updateQlist (qlist) {
					
					return $http.put('api/qlist', qlist)
					.then(function(result){
						console.log(result)
						return result.data;
					}, function(err) {
						console.log(err);
						return err;
					});
				};


				function getAllQlists () {

					return $http.get('/api/qlists')
						.then(function(results){
							return results.data;
						}, function(err) {
							console.log('error: ', err);
							return err;
						});
				};

				function getQlistById (id) {

					return $http.get('/api/qlist/' + id)
						.then(function(results){
							return results.data;
						}, function(err) {
							console.log(err);
							return err;
						});
				};

				function deleteQlistById (id) {

					return $http.delete('/api/qlist/' + id)
						.then(function(results){
							return results.data;
						}, function(err) {
							console.log(err);
							return err;
						});
				};

			}]);