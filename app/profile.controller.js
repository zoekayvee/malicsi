(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('profileController', profileController);

	function profileController($http, $location){
		var vm = this;
		
		vm.interests = "";

		vm.user = {};
        vm.userid = null;
		vm.userEvents = {};
		vm.userInterests = {};
		vm.sponsoredEvents = {};
        vm.userTeams = {};//added
        vm.files = [];

		vm.openModal = openModal;
		vm.closeModal= closeModal;
		vm.updateUser= updateUser;
        vm.updateInterest= updateInterest;
		vm.deleteInterest= deleteInterest;
        
        vm.viewPastGamesUser = viewPastGamesUser;
        vm.getUserId = getUserId
        vm.pastGamesUser = [];

        vm.updateProfilePic = updateProfilePic;
        vm.viewTeam= viewTeam;

		$http   
            .get('/user_loggedin') 
            .then(function(response) {
                if (response.data){
                    $http
                        .get('/users/'+response.data)
                        .then(function(response) {
                            vm.user = response.data;
                            vm.userid = vm.user.user_id;
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

                        });

                     $http
                        .get('/user/interests/'+response.data)
                        .then(function(response) {
                            vm.userInterests = response.data;
                            console.log(vm.userInterests);
                        });
                    //added
                     $http
                        .get('/user/teams/'+response.data)
                        .then(function(response) {
                            vm.userTeams = response.data;
                            console.log(vm.userTeams);
                        });
                    $http
                        .get('/game/user/' + vm.userid)
                        .then(function(response){
                            vm.pastGamesUser = response.data;
                            console.log(vm.userid);
                            console.log("Viewing Past Games of user Successful!");
                        });
                }
                else{
                	window.location.href ='/#!/login';
                }
            });

        function updateProfilePic() {
            if (vm.files[0]) {
                let options = {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                let fd = new FormData();
                fd.append("profilepic", vm.files[0]);
                $http.put('/users/'+ vm.user.user_id +'/profilepic', fd, options)
                    .then(function(response) {
                        console.log("Profile picture updated");
                        window.location.reload();
                    })
                    .catch(function(err) {
                        console.log("Error in uploading picture");
                    });
            } else {
                console.log("No file found");
            }
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
                .put('/user/'+editUser.user_id, editUser)
                .then(function(response) {
                	delete editUser.flag;
                	vm.user=editUser;
                    console.log(response.data);
                });
			window.location.reload();
		}

		function updateInterest(){
            console.log(vm.interests);
			var user = {
				interests: vm.interests
			}

			$http
				.get('user_loggedin')
				.then(function(response){
					 $http
                        .put('/users/interests/'+response.data, user)
                        .then(function(response) {
                        	console.log("Added interest");
                            window.location.reload();  //added
                        });
				});	
		}

        function deleteInterest(interest){

            var users = {
                myInterest:interest
            }
            console.log(users.myInterest)
            $http
                .get('user_loggedin')
                .then(function(response){
                     $http
                        .delete('/users/interests/' + response.data+"/" + users.myInterest)
                        .then(function(response){
                            window.location.reload();//added
                        });
                });    
        }

        function getUserId() {
            vm.userid = vm.user.user_id;
        }

        function viewTeam(team_id,event_id){
            $location.path('/events/' + event_id + '/team/'+ team_id)
        }
        function viewPastGamesUser(){
            $http   
            .get('/user_loggedin') 
            .then(function(response) {
                if (response.data){
                    $http
                    .get('/users/'+response.data)
                    .then(function(response) {
                        vm.userid = response.data.user_id;
                         $http
                            .get('/game/user/' + vm.userid)
                            .then(function(response){
                                vm.pastGamesUser = response.data;
                                console.log("Viewing Past Games of user Successful!");
                        },
                        function(response){
                            console.log('Error viewing Past Games of User')
                        });
                    });}
                else{
                    window.location.href ='/403';
                }
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
	}

})();