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
    vm.hasEvent = null;

    vm.playerReq=[];
    vm.teamGames = [];
    vm.sportsFromEvent = [];
    vm.upcomingGames = [];
    vm.approveTeamPlayer=approveTeamPlayer;
    vm.disapproveTeamPlayer=disapproveTeamPlayer;

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
                                    });
                              //uncomment this if the change in db is confirmed (user_event table)
                              $http
                                   .get('/users/player_requests/'+vm.user.user_id)
                                   .then(function(response) {
                                      vm.playerReq = response.data;
                                      console.log(response.data)
                                      if(vm.playerReq.length > 0){
                                        vm.hasEvent=true;
                                      }
                                      else{
                                        vm.hasEvent=false;
                                      }
                                   });
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
    
        function approveTeamPlayer(team_id,user_id,event_id){
          var data = {
            team_id: team_id,
            event_id:event_id,
            user_id: user_id,
            status:'accepted'
          }
          $http.put('/users/player_requests/approval',data)
            .then(function(response){
              window.location.reload();
            }, function(response){
              console.log('Error');
            });
        }

        function disapproveTeamPlayer(team_id,user_id){
          var data = {
            team_id: team_id,
            user_id:user_id,
            status:'rejected'
          }
          $http.put('/users/player_requests/disapproval',data)
            .then(function(response){
              window.location.reload();
            }, function(response){
              console.log('Error');
            });
        }

               
  } 

})();