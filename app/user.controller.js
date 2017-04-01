(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('userController', userController);

	function userController($http){
		var vm = this;
		vm.username="";
		vm.password="";
		vm.loginUser=loginUser;
        vm.user = {};
        vm.allLogs = [];

        vm.firstname = "";
		vm.lastname = "";
		vm.newUser = {};
		vm.registerUser=registerUser;
		vm.logOut = logOut;
		vm.getLogs = getLogs;
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.dropDown = dropDown;

        $http   
            .get('/user_loggedin') 
            .then(function(response) {
                if (response.data) {
                    $http
                        .get('/users/'+response.data)
                        .then(function(response) {
                            vm.user = response.data;
                            console.log(vm.user);
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
					if (redirect === '/#!/user/home'){
						window.location.href=redirect;
					}
				}, function (response){	
					console.log('Error');
					window.location.reload();
				});
		}
		function registerUser(){
			$http
				.post('/users', vm.newUser)
				.then(function(response){
					console.log(response.data);
					vm.username= vm.newUser.username;
					console.log(vm.username);
					vm.password=vm.newUser.password;
					console.log(vm.password);
					console.log('User added!');
					loginUser();
				},
				function(response){
					console.log('Error');
					window.location.reload();
				});
		}

	     function logOut() {
	     	$http.get('/logout')
	     			.then(function(response) {
	     				vm.user={};
	     			});
	     }
		function getLogs(){
			$http
			.post('/logs')
			.then(function(response) {
				if(response.data) {
					vm.allLogs = response.data;
				} else console.log('Error');
			});
		}

		function openModal(){
			$('.ui.modal')
				.modal('show');
		}
		function closeModal() {
			 $('.ui.modal')
			 	.modal('hide');
			vm.newUser = {};	
		 }

		function dropDown() {
			$('.ui.dropdown')
			  .dropdown();
			$('select.dropdown')
				.dropdown();
		}

	}

})();