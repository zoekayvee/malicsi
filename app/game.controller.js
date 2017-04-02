(function(){
	'use strict'
	angular
	.module('malicsi')
	.controller('gameController',gameController);

	function gameController($http,$routeParams){
		var vm = this;
		
		vm.game = null;
		vm.allGames = null;
		vm.game_id;
		vm.addGame = addGame;
		vm.updateGame = updateGame;
		vm.deleteGame = deleteGame;
		vm.deleteAllGames = deleteAllGames;
		vm.viewGame = viewGame;
		vm.viewAllGames = viewAllGames;
		vm.addSportId = null;
		vm.addVenueId = null;
		vm.addWinnerTeamId = null;
		vm.addReferee = null;
		vm.updateGameId = null;
		vm.updateSportId = null;
		vm.updateVenueId = null;
		vm.updateReferee = null;
		
		function addGame(){
			var gameToBeAdded = {
				sport_id: vm.addSportId,
				venue_id: vm.addVenueId,
				winner_team_id: vm.addWinnerTeamId,
				referee: vm.addReferee
			}
			$http
				.post('/game',gameToBeAdded)
				.then(function(response){
					console.log('Adding Game Successful!');
			},
			function(response){
				console.log('Error');
			});

		}
		function viewGame(){
			$http
				.get('/game/' + $routeParams.game_id)
				.then(function(response){
					vm.game = response.data;
					console.log('Viewing Game Successful');
			},
			function(response){
				console.log('Error Viewng Game');
			});

		}
		// function viewGame(id){
		// 	$http
		// 		.get('/game/' + id)
		// 		.then(function(response){
		// 			vm.game = response.data;
		// 			console.log('Viewing Game Successful');
		// 	},
		// 	function(response){
		// 		console.log('Error Viewng Game');
		// 	});

		// }
		function viewAllGames(){
			$http
				.get('/game')
				.then(function(response){
					console.log('Viewing All Games Successful');
					vm.allGames = response.data;
			},
			function(response){
				console.log('Error Viewing All Games');
			});

		}
		function updateGame(){
			var updatedGames = {
				sport_id: vm.updateSportId,
				venue_id: vm.updateVenueId,
				referee: vm.updateReferee
			}
			$http
				.put('/game/' + vm.updateGameId, updatedGames)
				.then(function(response){
					console.log('Updating Game Successful!');
			},
			function(response){
				console.log('Error Updating Game');
			});

		}
		function deleteGame(id){

			$http
				.delete('/game/' + id)
				.then(function(response){
					vm.allGames = response.data;
					console.log('Deleting Game Successful!');
			},
			function(response){
				console.log('Error Deleting Game');
			});
		}
		function deleteAllGames(){

			$http
				.delete('/game')
				.then(function(response){
					console.log('Deleting All Games Successful!');
			},
			function(response){
				console.log('Error Deleting All Games');
			});
		}
	}
})();
