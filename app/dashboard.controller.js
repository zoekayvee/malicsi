(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('dashboardController', dashboardController);

	function dashboardController($http){
		//FOR DASHBOARD
		var vm = this;
        vm.user = null;
        vm.recentEvent = null;
        vm.firstTimeUser = true;
        vm.currentEventId = null;

		vm.teamGames = [];
		vm.currentGames = [];
		vm.upcomingGames = [];	
        $http   
             .get('/user_loggedin') 
             .then(function(response) {
               if(response.data){
                   $http
                       .get('/users/'+response.data)
                       .then(function(response) {
                           vm.user = response.data;
                           if(vm.user.user_type==='normal'){
                               $http
                                   .get('/users/joined_events/'+vm.user.user_id)
                                   .then(function(response) {
                                       vm.recentEvent = response.data;
                                       vm.currentEventId = vm.recentEvent.event_id;
                                    });
                           }
                           else{
                               console.log('ADMIN');
                           }
                       }); 
                   }
                   else{
                       window.location.href ='/403';
                   }               
             });
		
        $http   
            .get('/viewTeamPlayGame') 
            .then(function(response) {
                if (response.data) {
                   vm.teamGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })

         $http   
            .get('/viewCurrentGames') 
            .then(function(response) {
                if (response.data) {
                   vm.currentGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })

         $http   
            .get('/viewUpcomingGame') 
            .then(function(response) {
                if (response.data) {
                   vm.upcomingGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })
	}	

})();