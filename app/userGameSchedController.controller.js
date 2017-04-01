(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('userGameSchedController',userGameSchedController);

	function userGameSchedController($http){
		var vm = this;


		vm.allSports = [];
		vm.retSome = retSome;
		vm.allSportGames;
		vm.allGames = [];
		vm.counter = 0;

		function viewAllWinners(){
			$http
				.get('/viewAllSports')
				.then(function(response){
					vm.allSports = response.data;
						console.log(response.data[0]);
					for(var i=0;i!=vm.allSports.length;i++){
						// vm.allGames = new Array(vm.allSports.length);
						
						console.log(vm.counter);
						// viewGames(vm.allSports[i]);
						// console.log(vm.allSports.length);
					}
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function viewGames($sport){
						console.log(sport);
			$http
				// .get('/viewGameBySportId/'+$sport.sport_id)
				.get('/viewScheds/'+$sport.sport_id)
				.then(function(response){
					// vm.allGames = vm.allGames + response.data;
					// console.log("wew" + response.data[0].sport_id + "wew");
					vm.allGames = [];
					vm.allGames = response.data;
						// console.log(response.data[0]);
					// for (var i = 0; i != response.data.length; i++) {
					// 	vm.allGames.push(response.data[i]);
					// }

					for (var i = 0; i != response.data.length; i++) {
						console.log(vm.allGames[i]);
					}
					vm.counter = vm.counter + 1;
					// vm.allGames.push(vm.games);
					// vm.allGames[$index] = new Array()
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

		function retSome($sport){
			$http
				// .get('/viewGameBySportId/'+$sport.sport_id)
				.get('/viewScheds/'+$sport)
				.then(function(response){
					// vm.allGames = vm.allGames + response.data;
					// console.log("wew" + response.data[0].sport_id + "wew");
					vm.allGames = [];
					for (var i = 0; i != response.data.length; i++) {
						vm.allGames.push(vm.games);
					}
					// vm.allGames[$index] = new Array()
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
			return vm.allGames;
		}

	}

	function gameController($http){
		var vm = this;

		vm.allGames = [];

		// function viewAllWinners(){
			$http
				.get('/viewAllSports')
				.then(function(response){
					vm.allSports = response.data;
					for(var i=0;i!=vm.allSports.length;i++){
						viewGames(vm.allSports[i]);
						// console.log(vm.allSports.length);
					}
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		// }

		function viewGames($sport){
			$http
				.get('/viewGameBySportId/'+$sport)
				.then(function(response){

					
					vm.allSports = response.data;
					for(var i=0;i!=vm.allSports.length;i++){
						viewGames(vm.allSports[i]);
						// console.log(vm.allSports.length);
					}
					
				},
				function(response){
					console.log("Error retrieving data!");
				});
		}

	}

})();
