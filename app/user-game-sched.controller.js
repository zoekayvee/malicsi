(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('userGameSchedController',userGameSchedController);

	function userGameSchedController($http){
		var vm = this;


		vm.allSports = [];
		vm.allSportGames;
		vm.allGames = [];
		vm.counter = 0;
		vm.viewGames = viewGames;

		// function viewAllWinners(){
			$http
				.get('/viewAllSports')
				.then(function(response){
					vm.allSports = response.data;
					// for(var i=0;i!=vm.allSports.length;i++){
					// 	console.log(vm.counter++);
					// }
				},
				function(response){
					console.log("Error retrieving data!");
				});
		// }

		function viewGames(sport){
			$http
				.get('/viewScheds/'+sport.sport_id)
				.then(function(response){
					vm.games = [];
					for (var i = 0; i != response.data.length/2; i++) {
						vm.games.push(response.data[i]);
						console.log(response.data[i]);
					}
					while(vm.allGames.length!=(sport.sport_id-1)) vm.allGames.push(null);
					vm.allGames.push(vm.games);
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}
	}


})();