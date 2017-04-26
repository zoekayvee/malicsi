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
    vm.sportsFromEvent = [];
		vm.upcomingGames = [];
    vm.eventsByInterest = [];

        $http   
             .get('/user_loggedin') 
             .then(function(response) {
               if(response.data){
                   $http
                       .get('/users/'+response.data)
                       .then(function(response) {
                           vm.user = response.data;
                           if(vm.user.user_type==='normal' || vm.user.user_type==='admin'){
                              $http
                                   .get('/users/joined_events/'+vm.user.user_id)
                                   .then(function(response) {
                                       vm.recentEvent = response.data;
                                       vm.currentEventId = vm.recentEvent.event_id;

                                        $http   
                                          .get('/events/' + vm.recentEvent.event_id + '/current_games') 
                                          .then(function(response) {
                                              vm.sportsFromEvent = response.data;
                                              console.log(response.data);
                                          }); 

                                        $http   
                                          .get('/events/' + vm.recentEvent.event_id + '/upcomingGames') 
                                          .then(function(response) {
                                              vm.upcomingGames = response.data;
                                              console.log(response.data);
                                          }); 

                                        $http   
                                          .get('/eventsByInterest/' + vm.user.user_id) 
                                          .then(function(response) {
                                              vm.eventsByInterest = response.data;
                                              console.log(response.data);
                                          }); 
                                    });
                              //uncomment this if the change in db is confirmed (user_event table)

                           }
                           else{
                               window.location.href ='/403';
                           }
                       }); 
                   }
                   else{
                       window.location.href ='/403';
                   }               
             });
		
        
               
	}	

})();