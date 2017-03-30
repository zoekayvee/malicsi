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
        vm.currentUser = {};
        vm.user = [];
        vm.allLogs = [];

        vm.firstname = "";
		vm.lastname = "";
		vm.newUser = {};
		vm.registerUser=registerUser;
		vm.logOut = logOut;
		vm.userProfile=userProfile;
		vm.getLogs = getLogs;
		
        $http   
            .get('/user_loggedin') 
            .then(function(response) {
                if (response.data) {
                    $http
                        .get('/users/'+response.data)
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
					if (redirect === '/user/home'){
						window.location.href=redirect;
					}	
				}, function (response){	
				});
		}
		function registerUser(){
			$http
				.post('/users', vm.newUser)
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

	     function userProfile(){
			var credentials={
				username: vm.username,
				password: vm.password
			}		
	       	$http   
	            .get('/user_loggedin') 
	            .then(function(response) {
	                if (response.data) {
	                    $http
	                        .get('/users/'+response.data)
	                        .then(function(response) {
	                            vm.user = response.data;
								console.log(response.data);
								console.log("HERE");
	                        });
	                }
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
		}

})();