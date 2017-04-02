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
		vm.dropDown = dropDown;
		vm.openModal = openModal;
		vm.closeModal= closeModal;
		vm.updateUser= updateUser;
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
					vm.user = response.data
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
					console.log('User added!');
					vm.username= vm.newUser.username;
					vm.password= vm.newUser.password; 
					vm.newUser={};
					loginUser();
				},
				function(response){
					console.log('Error');
					window.location.reload();
				});
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
	     				window.location.href=redirect;
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