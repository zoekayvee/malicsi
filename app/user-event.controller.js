(function(){
	'use strict'
	angular
	.module('malicsi')
	.controller('userEventController',userEventController);

	function userEventController($http,$location,$routeParams){
		var vm = this;

		vm.allSports = [];
		vm.allSportGames;
		vm.allGames = [];
        vm.addSportName = null
        vm.addSport = addSport;;
		vm.viewGame = viewGame;
		vm.viewGamesByEvent = viewGamesByEvent;
		vm.viewSportByEvent = viewSportByEvent;
		vm.viewAvailableSports = viewAvailableSports;
		vm.attachSportToEvent = attachSportToEvent;
		vm.scoreboard = scoreboard;
		vm.event_id = $routeParams.event_id;
		vm.sportId = null;
		vm.setSportId = setSportId;
		vm.allAvailableSports = null;

		viewSportByEvent();

		function viewSportByEvent(){
			$http
				.get('/sport/event/' + $routeParams.event_id)
				.then(function(response){
					vm.allSports = response.data;
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function viewAvailableSports(){
			$http
				.get('/sport/event/view/' + $routeParams.event_id)
				.then(function(response){
					vm.allAvailableSports = response.data;
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}


		function viewGamesByEvent(sport){
			var event = {
				event_event_id: $routeParams.event_id
			}
			console.log("event");
			$http
				.post('/game/sport/'+sport.sport_id,event)
				.then(function(response){
					if(response.data.length == 0) return;
					vm.games = [];
					for (var i = 0; i != response.data.length; i++) vm.games.push(response.data[i]);
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					vm.games = [];
					for (var i = 0; i != response.data.length; i++) {
						vm.games.push(response.data[i]);
					}
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					console.log(vm.allGames);
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function attachSportToEvent(){
            var sportToBeAdded = {
                sport_id: vm.sportId,
            }
            $http
                .post('/sport/' + $routeParams.event_id, sportToBeAdded)
                .then(function(response){
                    console.log('Adding Sport To Event Successful!');
                    // window.location.reload();
            },
            function(response){
                console.log('Error Adding Sport');
            });
        }

        function setSportId(sport_id){
            vm.sportId = sport_id;
            //console.log(vm.deleteSponsorId);
        }
		
		function addSport(){
            var sportToBeAdded = {
                sport_name: vm.addSportName,
            }
            $http
                .post('/sport/' + $routeParams.event_id, sportToBeAdded)
                .then(function(response){
                    console.log('Adding Sport Successful!')
            },
            function(response){
                console.log('Error Adding Sport');
            });
        }

		function viewGame(game_id){
			$location.path('/user/game/' + game_id)
		}

		function scoreboard(){
			$location.path('/user/event/' + $routeParams.event_id + '/scoreboard')
		}

	}

})();