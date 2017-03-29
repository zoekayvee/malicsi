(function(){
	'use strict'
	angular
		.module('mainApp')
		.controller('userController', userController);

	function userController($http){
		var vm = this;
		vm.username="";
		vm.password="";
		vm.loginUser=loginUser;
        vm.currentUser = {};
        vm.user = [];
        
        vm.firstname = "";
		vm.lastname = "";
		vm.newUser = {};
		vm.registerUser=registerUser;
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.logOut = logOut;

        $http   
            .get('/loggedIn') 
            .then(function(response) {
                if (response.data) {
                    $http	
                        .get('/viewUser/'+response.data)
                        .then(function(response) {
                            vm.currentUser = response.data;
                            vm.user = response.data;
                            console.log(vm.currentUser);
                        });
                }
            });
		function loginUser(){
			var credentials={
				username: vm.username,
				password: vm.password
			}
			$http.post('/login', credentials)
				.then(function (response){
					var redirect = response.data.redirect;
					console.log(redirect);
					if (redirect === '/'){
						window.location.href=redirect;
					}	
				}, function (response){	
				});
		}
		function registerUser(){
			vm.newUser.usertype= "normal";
			$http
				.post('/addUser', vm.newUser)
				.then(function(response){
					console.log(response.data);
					console.log('User added!');
				},
				function(response){
					console.log('Error');
				});
		}

	     function logOut() {
	     	$http.get('/logout')
	     			.then(function(response) {
	     				var redirect = response.data.redirect;
	     				window.location.href=redirect;
	     			});
	     }

	     function openModal() {
			 $('.ui.modal')
			 	.modal('setting', {
					 closable: false
				})
				.modal('show');
		 }
		 
		 function closeModal() {
			 $('.ui.modal')
			 	.modal('hide');
			vm.newUser = {};	
		 }
	}

})();