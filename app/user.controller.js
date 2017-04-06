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
		vm.updateUser= updateUser;
		vm.userEvents = [];
		vm.userInterests = [];
		vm.sponsoredEvents = [];
		vm.interests = "";

		vm.updateInterest = updateInterest;

        $http   
            .get('/user_loggedin') 
            .then(function(response) {
                if (response.data){
                    $http
                        .get('/users/'+response.data)
                        .then(function(response) {
                            vm.user = response.data;
                            console.log(vm.user);
                        });
                }
            });

        $http   
            .get('/user_loggedin') 
            .then(function(response) {
                if (response.data){
                    $http
                        .get('/users/'+response.data)
                        .then(function(response) {
                            vm.user = response.data;
                            console.log(vm.user);
                        });

                    $http
                        .get('/user/events/'+response.data)
                        .then(function(response) {
                            vm.userEvents = response.data;
                            console.log(vm.userEvents);

                        });

                    $http
                        .get('/user/sponsored/'+response.data)
                        .then(function(response) {
                            vm.sponsoredEvents = response.data;
                            console.log(vm.sponsoredEvents);
                        });

                     $http
                        .get('/user/interests/'+response.data)
                        .then(function(response) {
                            vm.userInterests = response.data;
                            console.log(vm.userInterests);
                        });
                }
            });

            $http   
            .get('/user_loggedin') 
            .then(function(response) {
	        	$http
	                .get('/users/'+response.data)
	                .then(function(response) {
	                    vm.user = response.data;
	                    if(vm.user.user_type==='normal'){
		                	$http
		                        .get('/logs/'+vm.user.user_id)
		                        .then(function(response) {
		                        	console.log('here');
		                            vm.allLogs = response.data;
		                            console.log(vm.allLogs);
		                           modifyTime();
		                    });
	                    }
	                    else{
		                	$http
								.get('/logs')
								.then(function(response) {
									if(response.data) {
										vm.allLogs = response.data;
										console.log(vm.allLogs);
										modifyTime();
									} else console.log('Error');

							});
		                }
	                });                
            });

        function modifyTime(){
        	 vm.allLogs.forEach(function(e){
            	if(e.Minutes<60){
            		e.Time=e.Minutes + "m ago ";		
            	}
            	else if(e.Hour<24){
            		e.Time = e.Hour + "h ago " ;
            	}
            	else{
            		e.Time = e.Date;
            	}
            	
  				
            });
        }
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
					console.log(response);
					/*setTimeout(function(){
						redirectLocation('no');
					}, 500);*/
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

		function updateInterest(){
			var user = {
				interests: vm.interests
			}

			$http
				.get('user_loggedin')
				.then(function(response){
					 $http
                        .put('/users/updateInterests/'+response.data, user)
                        .then(function(response) {
                        	console.log("Added interest");
                        	window.location.reload();
                        });
				});
			//window.location.reload();		
		}
		function updateUser(user,uname,pw,loc,college,age,height,weight,fname,lname,email,contactno,gender){
			var editUser=vm.user;
			var flag = "false";
			if(uname == "" || typeof(uname)== 'undefined'){
                uname= user.username
            }
            if(pw =="" || typeof(pw)=='undefined'){
                pw=user.password //the pw is still encrypted
                flag = "true";
            }
            if(loc =="" || typeof(loc)=='undefined'){
                loc= user.location
            }
            if(college =="" || typeof(college)== 'undefined'){
                college= user.college
            }
            if(age =="" || typeof(age)=='undefined'){
                age = user.age
            }
            if(height =="" || typeof(height)=='undefined'){
                height= user.height
            }
            if(weight =="" || typeof(weight)== 'undefined'){
                weight= user.weight
            }
            if(fname =="" || typeof(fname)=='undefined'){
                fname = user.firstname
            }
            if(lname =="" || typeof(lname)=='undefined'){
                lname= user.lastname
            }
            if( email =="" || typeof(email)=='undefined'){
                email= user.email
            }
            if(contactno =="" || typeof(contactno)=='undefined'){
                contactno= user.contactno
            }
            if(gender =="" || typeof(gender)=='undefined'){
                gender= user.gender
            }
            editUser.username=uname;
            editUser.password=pw;
            editUser.location=loc;
            editUser.college=college;
            editUser.age=age;
            editUser.height=height;
            editUser.weight=weight;
            editUser.firstname=fname;
            editUser.lastname=lname;
            editUser.email=email;
            editUser.contactno=contactno;
            editUser.gender=gender;
            editUser.flag=flag;
          	$http
                .put('/users/'+editUser.user_id, editUser)
                .then(function(response) {
                	delete editUser.flag;
                	vm.user=editUser;
                    console.log(response.data);
                });
			window.location.reload();
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