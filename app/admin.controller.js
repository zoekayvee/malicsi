(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('adminController', adminController);

	function adminController($http){
		var vm = this;

		/*ADDED*/	
		vm.newUser={};
		vm.user={};
		//vm.user_id = ""; //for user_id initialization
		vm.addUser = addUser;
		vm.initialize= initialize;
		vm.allPending=[];

		vm.allLogs = [];
		vm.allUsers = [];
		vm.allEvents = [];
		vm.deleteUser = deleteUser;
		vm.updateUser = updateUser;
		vm.password = "";
		vm.openModal = openModal;
		vm.closeModal= closeModal;
		vm.currentUserId = null;
		vm.user_type = null;
		vm.approveUser = approveUser;
		vm.approveEvent = approveEvent;
		vm.disapproveEvent = disapproveEvent;
		vm.playerReq=[];
		vm.hasEvent = null;

		$http   
            .get('/user_type_loggedin') 
            .then(function(response) {
            	vm.user_type = response.data;
                if (response.data == 'admin'){
                   $http
						.get('/users')
						.then(function(response) {
							vm.allUsers = response.data;
						}, function(response){
							console.log('Error');
						}); 
					$http
						.get('/user/all_events')
						.then(function(response) {
							vm.allEvents = response.data;
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

		function approveEvent(event_id){
			var data = {
				event_id:event_id,
				status:'accepted'
			}
			$http.put('/events_status',data)
				.then(function(response){
					console.log('Approved Team');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function disapproveEvent(event_id){
			var data = {
				event_id:event_id,
				status:'rejected'
			}
			$http.put('/events_status',data)
				.then(function(response){
					console.log('Approved Team');
					window.location.reload();
				}, function(response){
					console.log('Error');
				});
		}

		function updateUser(user,uname,pw,college,height,weight,fname,lname,email,contactno,user_type,age,gender,location){
			var editUser=vm.user;
			var flag="false";

			console.log(vm.user);
			if(uname == "" || typeof(uname)== 'undefined'){
                uname= user.username
            }
            if(pw =="" || typeof(pw)=='undefined'){
                pw=user.password //the pw is still encrypted
                flag = "true";
            }
            if(college =="" || typeof(college)== 'undefined'){
                college= user.college
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
            if(user_type =="" || typeof(user_type)=='undefined'){
                user_type= user.user_type
            }
            if(age =="" || typeof(age)=='undefined'){
                age= user.age
            }
            if(gender =="" || typeof(gender)=='undefined'){
                gender= user.gender
            }
            if(location =="" || typeof(location)=='undefined'){
                location= user.location
            }

            editUser.username=uname;
            editUser.password=pw;
            editUser.college=college;
            editUser.height=height;
            editUser.weight=weight;
            editUser.firstname=fname;
            editUser.lastname=lname;
            editUser.email=email;
            editUser.contactno=contactno;
            editUser.user_type=user_type;
            editUser.age=age;
            editUser.gender=gender;
            editUser.location=location;
            editUser.flag=flag;
            console.log(editUser.user_id);
            $http
            	.put('/users/passwords/' + editUser.user_id, editUser)
            	.then(function(response){
            		delete editUser.flag;
            		
            	});
           	
           	window.location.reload();
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
		function initialize(user){
			vm.user=user;
			console.log(user);
		}
	}
})();
