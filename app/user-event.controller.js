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
		vm.viewGame = viewGame;
		vm.viewGamesByEvent = viewGamesByEvent;

		// function viewAllWinners(){
			$http
				.get('/sportByEvent/' + $routeParams.event_id)
				.then(function(response){
					vm.allSports = response.data;
				},
				function(response){
					console.log("Error retrieving data!");
				});
		// }


		function viewGamesByEvent(sport){
			$http
				.get('/gamesBySport/'+sport.sport_id)
				.then(function(response){
					vm.games = [];
					for (var i = 0; i != response.data.length; i++) {
						vm.games.push(response.data[i]);
					}
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function viewGame(game_id){
			$location.path('/user/game/' + game_id)
		}

	}

})();