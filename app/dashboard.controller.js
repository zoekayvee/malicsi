(function(){
  'use strict'
  angular
    .module('malicsi')
    .controller('dashboardController', dashboardController);

  function dashboardController($http,$location){
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
    vm.gamesFromEvent = [];
    vm.upcomingGames = [];
    vm.approveTeamPlayer=approveTeamPlayer;
    vm.disapproveTeamPlayer=disapproveTeamPlayer;
    vm.getScores = getScores;
    vm.getScores2 = getScores2;
    vm.viewEvent=viewEvent;
    vm.allScores = [];
    vm.allScores2 = [];

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

                                              vm.sportsFromEvent.forEach(function(e){
                                                $http   
                                                  .get('/game/' + e.game_id) 
                                                  .then(function(response) {
                                                      console.log(response.data);
                                                      vm.gamesFromEvent.push(response.data);
                                                  }); 
                                              });

                                              
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

        function getScores(game){
          $http
            .get('/scores/' + game.game_id + '/' + game.team_id)
            .then(function(response){
              while(vm.allScores.length!=game.game_id) vm.allScores.push(null);
              if(response.data.length==0) vm.allScores.push(0);
              else vm.allScores.push(response.data[0].team_score);
              console.log('Viewing Score Successful');
          },
          function(response){
            console.log('Error Viewing Score');
          });
      }

      function getScores2(game){
        $http
          .get('/scores/' + game.game_id + '/' + game.team_id_2)
          .then(function(response){
            while(vm.allScores2.length!=game.game_id) vm.allScores2.push(null);
            if(response.data.length==0) vm.allScores2.push(0);
            else vm.allScores2.push(response.data[0].team_score);
            console.log('Viewing Score Successful');
        },
        function(response){
          console.log('Error Viewing Score');
        });
      }

      function viewEvent(id){
        $location.path('/events/' + id)
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