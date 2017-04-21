(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('adminController', adminController);

	function adminController($http){
		var vm = this;

		/*ADDED*/	
		vm.newUser={};
		vm.user_id = ""; //for user_id initialization
		vm.addUser = addUser;
		vm.initialize= initialize;
		vm.allPending=[];

		vm.allLogs = [];
		vm.allUsers = [];
		vm.allTeams = [];
		vm.deleteUser = deleteUser;
		vm.updateUser = updateUser;
		vm.password = "";
		vm.openModal = openModal;
		vm.closeModal= closeModal;
		vm.currentUserId = null;
		vm.user_type = null;
		vm.approveUser = approveUser;
		vm.approveTeam = approveTeam;
		vm.disapproveTeam = disapproveTeam;

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
					$http
						.get('/events_teams')
						.then(function(response) {
							vm.allTeams = response.data;
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
			// console.log(user_id);
			$http.post('/user',vm.newUser)
				.then(function(response){
					console.log('Added User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function approveUser(user_id){
			$http.put('/users/approval/'+user_id)
				.then(function(response){
					console.log('Approved User');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function approveTeam(team_id,event_id){
			var data = {
				team_id: team_id,
				event_id:event_id,
				status:'accepted'
			}
			$http.put('/teams_status',data)
				.then(function(response){
					console.log('Approved Team');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function disapproveTeam(team_id,event_id){
			var data = {
				team_id: team_id,
				event_id:event_id,
				status:'rejected'
			}
			$http.put('/teams_status',data)
				.then(function(response){
					console.log('Approved Team');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function updateUser(){
			var user = {
				password : vm.password
			}
			$http.put('/users/passwords/' + vm.user_id, user)
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

		//added, the user_id should not be passed when there's modal
		function initialize(user_id){
			vm.user_id=user_id;
		}
	}
})();
