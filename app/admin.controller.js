(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('adminController', adminController);

	function adminController($http){
		var vm = this;

		vm.password = "";		
		vm.newUser={};
		vm.user_id = ""; //for user_id initialization


		vm.allLogs = [];
		vm.allUsers = [];
		vm.deleteUser = deleteUser;
		vm.addUser = addUser;
		vm.updateUser = updateUser;
		
		vm.openModal = openModal;
		vm.closeModal= closeModal;
		vm.currentUserId = null;
		vm.user_type = null;
		vm.approveUser = approveUser;
		vm.initialize= initialize;
		vm.allPending=[];

		$http   
            .get('/user_type_loggedin') 
            .then(function(response) {
            	vm.user_type = response.data;
                if (response.data == 'admin'){
                   $http
						.get('/users')
						.then(function(response) {
							vm.allUsers = response.data;
							console.log(response.data);
						}, function(response){
							console.log('Error');
						}); 
                }
                else{
                	window.location.href ='/403';
                }
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

		function addUser(){
			$http.post('/user',vm.newUser)
				.then(function(response){
					console.log('Added User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function approveUser(user_id){
			console.log(user_id);
			$http.put('/users/approval/'+user_id)
				.then(function(response){
					console.log('Approved User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function initialize(user_id){
			vm.user_id=user_id;
		}

		function updateUser(){
			var user = {
				password : vm.password
			}
			$http.put('/users/passwords/' + vm.user_id, user)
				.then(function(response){
					console.log('Updated User');
					console.log(vm.user_id);
					window.location.reload();
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
