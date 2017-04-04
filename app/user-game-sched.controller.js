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
		vm.rankList = [];
		vm.viewGame = viewGame;
		vm.viewGames = viewGames;
		vm.viewSports = viewSports;
		vm.getRanking = getRanking;
		vm.viewGamesLeaderboards = viewGamesLeaderboards;

		viewSports();

		function viewSports(){
			$http
				.get('/sport')
				.then(function(response){
					vm.allSports = null;
					vm.allSports = null;
					vm.allSports = response.data;
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function viewGames(sport){
			$http
				.get('/schedule/'+sport.sport_id)
				.then(function(response){

					vm.games = [];
					for (var i = 0; i != response.data.length; i++) {
						if(i%2 == 0) vm.games.push(response.data[i]);
					}
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					console.log(response.data[0] + sport.sport_name);
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
					for (var i = 0; i != response.data.length; i++) {
						if(i%2==0) vm.games.push(response.data[i]);
					}
					console.log("done");
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}


		function getRanking(sport){
			$http
				.post('/ranking/' + sport.sport_id)
				.then(function(response){
					vm.rankList = response.data;
					console.log('Viewing Rank Successful');
			},
			function(response){
				console.log('Error Viewing Rank');
			});

		}

		function viewGame(game_id){
			$location.path('/user/game/' + game_id)
		}
	}

})();
