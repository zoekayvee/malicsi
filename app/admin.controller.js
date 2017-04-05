(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('adminController', adminController);
		
	function adminController($http){
		var vm = this;

		vm.allLogs = [];
		vm.allUsers = [];
		vm.deleteUser = deleteUser;

		$http
			.get('/users')
			.then(function(response) {
				vm.allUsers = response.data;
				console.log(response.data);
			}, function(response){
				console.log('Error');
			});

		function deleteUser(user_id){
			console.log(user_id);
			$http.delete('/users/' + user_id)
				.then(function(response){
					console.log('Deleted User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function updateUser(user_id){
			console.log(user_id);
			$http.put('/updatePass/' + user_id)
				.then(function(response){
					console.log('Updated User');
				}, function(response){
					console.log('Cannot update user password');
				});
		}


	}

})();