(function(){
	'use strict'
	angular
	.module('malicsi')
	.controller('userGameSchedController',userGameSchedController);

	function userGameSchedController($http,$location){
		var vm = this;

		vm.allSports = [];
		vm.allSportGames;
		vm.allGames = [];
		vm.viewGame = viewGame;
		vm.viewGames = viewGames;
		vm.viewGamesLeaderboards = viewGamesLeaderboards;

		// function viewAllWinners(){
			$http
				.get('/sport')
				.then(function(response){
					vm.allSports = response.data;
				},
				function(response){
					console.log("Error retrieving data!");
				});
		// }

		function viewGames(sport){
			$http
				.get('/schedule/'+sport.sport_id)
				.then(function(response){
					vm.games = [];
					for (var i = 0; i != response.data.length/2; i++) {
						vm.games.push(response.data[i]);
					}
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function viewGamesLeaderboards(sport){
			$http
				.get('/leaderboard/'+sport.sport_id)
				.then(function(response){
					vm.games = [];
					for (var i = 0; i != response.data.length/2; i++) {
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