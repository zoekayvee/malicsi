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

		vm.prevPage = "";

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
			if(redirect === '/#!/user/home')
				window.location.href=redirect;
			else
				window.location.reload();
		}

		function loginUser(){
			setToastr();
			var credentials={
				username: vm.username,
				password: vm.password
			}
			$http.post('/login', credentials)
				.then(function (response){
					var redirect = response.data.redirect;
					
					console.log(redirect);
					vm.user = response.data
					if (redirect === '/#!/user/home'){
						toastr.success('Login successful!');
						setTimeout(function(){
							redirectLocation(redirect);
						}, 500);
					}
				}, function (response){	
					toastr.error('Invalid input!');
					console.log('Error');
					setTimeout(function(){
						redirectLocation('no');
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
					toastr.error('Error on input!');
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