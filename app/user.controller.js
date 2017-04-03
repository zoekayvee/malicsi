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
        
        vm.firstname = "";
		vm.lastname = "";
		vm.newUser = {};
		vm.registerUser=registerUser;
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.logOut = logOut;

		//FOR DASHBOARD
		vm.teamGames = [];
		vm.currentGames = [];
		vm.upcomingGames = [];
		
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

        // $http   
        //     .get('/viewTeamPlayGame') 
        //     .then(function(response) {
        //         if (response.data) {
        //            vm.teamGames = response.data;   
        //         }
        //         else{
        //         	console.log("ERROR!");
        //         }
        //     })

        //  $http   
        //     .get('/viewCurrentGames') 
        //     .then(function(response) {
        //         if (response.data) {
        //            vm.currentGames = response.data;   
        //         }
        //         else{
        //         	console.log("ERROR!");
        //         }
        //     })

        //  $http   
        //     .get('/viewUpcomingGame') 
        //     .then(function(response) {
        //         if (response.data) {
        //            vm.upcomingGames = response.data;   
        //         }
        //         else{
        //         	console.log("ERROR!");
        //         }
        //     })


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