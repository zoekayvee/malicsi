(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('adminController', adminController);
		
	function adminController($http){
		var vm = this;

		vm.password = "";

		vm.allLogs = [];
		vm.allUsers = [];
		vm.deleteUser = deleteUser;
		vm.updateUser = updateUser;
		vm.addUser = addUser;

		vm.openModal = openModal;
		vm.closeModal= closeModal;

		$http
			.get('/users')
			.then(function(response) {
				vm.allUsers = response.data;
				console.log(response.data);
			}, function(response){
				console.log('Error');
			});

		function deleteUser(user_id){
			console.log("!!!!!!!!");
			console.log(user_id);
			$http.delete('/users/' + user_id)
				.then(function(response){
					console.log('Deleted User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function addUser(){
			// console.log(user_id);

			$http.post('/user/')
				.then(function(response){
					console.log('Added User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function updateUser(user_id){
			var user = {
				password : vm.password
			}
			$http.put('/user/password/' + user_id,user)
				.then(function(response){
					closeModal('edit-modal');
					console.log('Updated User');
				}, function(response){
					console.log('Cannot update user password');
				});
		}

		function openModal(dmodal){
			$('#'+dmodal+'.modal')
		 	.modal('setting', {
				 closable: false
			})
			.modal('show');
		
		}
		function closeModal(dmodal){
			$('#'+dmodal+'.modal')
			 	.modal('hide');	
		}
	}

})();
