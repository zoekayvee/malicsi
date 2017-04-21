(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('userController', userController);

	function userController($http){
		var vm = this;
		vm.username="";
		vm.password="";
		vm.user_type="";
		vm.loginUser=loginUser;
        vm.user = {};
        vm.allLogs = null;
        vm.firstname = "";
		vm.lastname = "";
		vm.newUser = {};


		vm.registerUser=registerUser;
		vm.logOut = logOut;
		vm.dropDown = dropDown;
		vm.openModal = openModal;
		vm.closeModal= closeModal;

        vm.currentUser = {};
        vm.userDash="";

		//FOR DASHBOARD
		vm.teamGames = [];
		vm.currentGames = [];
		vm.upcomingGames = [];
		

		$http   
            .get('/user_loggedin') 
            .then(function(response) {
            	if (response.data){
            		$http
                        .get('/users/'+response.data)
                        .then(function(response) {
                            vm.user = response.data;
                            if(vm.user.user_type==='admin'){
                         	   window.location.href = '/#!/admin';
                        	}
                        	if(vm.user.user_type==='normal'){
                        		window.location.href ='/#!/user/home';
                        	}
                        });
						
						/*if(vm.user.user_type==='admin'){
							redirectLocation('/#!/admin'); //when logged in user access '/' 
								//it should redirect to its ladning page
						}
						if(vm.user.user_type==='normal'){
							redirectLocation('/#!/user/home');
						}*/
            	}
            });

        
        function setToastr(){
		    toastr.options.positionClass = "toast-bottom-right";
		    toastr.options.closeButton = true;
		    toastr.options.showMethod = 'slideDown';
		    toastr.options.hideMethod = 'slideUp';
		    toastr.options.positionClass = "toast-bottom-full-width";
		    toastr.options.timeOut = 2000;
		    toastr.options.newestOnTop = false;
    	}

    	function redirectLocation(redirect){
    		//changed
			if(redirect === 'no')
				window.location.reload();
			else
				window.location.href = redirect;
		}
		
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
					vm.user = response.data
					toastr.success(response.data.message); //added
					vm.userDash=redirect;
					setTimeout(function(){
						redirectLocation(redirect);
					}, 500);
				}, function (response){	
					toastr.error(response.data.message);
					setTimeout(function(){
						redirectLocation(response.data.redirect);
					}, 500);
				});
		}

		function registerUser(){
			setToastr();
			$http
				.post('/users', vm.newUser)
				.then(function(response){
					console.log(response.data);
					console.log('User added!');
					vm.username= vm.newUser.username;
					vm.password= vm.newUser.password; 
					vm.newUser={};
					toastr.success('Successfully sent account approval to admin!');
				},
				function(response){
					toastr.error('Error in input!');
					console.log('Error');
					setTimeout(function(){
						redirectLocation('no');
					}, 500);
				});
		}

	     function logOut() {
	     	$http.get('/logout')
	     			.then(function(response) {
	     				var redirect = response.data.redirect;
	     				toastr.success('Logged out.');
	     				window.location.href=redirect;
	     			});
	     }

		function dropDown(){
			$('.ui.dropdown')
			  .dropdown()
			;
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