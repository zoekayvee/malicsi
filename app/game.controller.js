(function(){
'use strict'
angular
.module('malicsi')
.controller('gameController',gameController);


function gameController($http){

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
	
	// viewAllGames();


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
				// console.log(response.data);
				console.log('Game Added!')
		},
		function(response){
			console.log('Error');
		});

	}
	function viewGame(id){

		$http
			.get('/game/' + id)
			.then(function(response){
				vm.game = response.data;
				// console.log(response.data);
				// console.log('Viewing game' + response.data.sport_id);
		},
		function(response){
			console.log('Error');
		});

	}
	function viewAllGames(){

		$http
			.get('/game')
			.then(function(response){
				vm.allGames = response.data;
				// console.log(response.data);
				console.log('Viewing All Games!');
		},
		function(response){
			console.log('Error');
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
				console.log('Game updated');
		},
		function(response){
			console.log('Error');
		});

	}
	function deleteGame(id){

		$http
			.delete('/game/' + id)
			.then(function(response){
				vm.allGames = response.data;
				console.log('Game deleted');
		},
		function(response){
			console.log('Error');
		});
	}
	function deleteAllGames(){

		$http
			.delete('/game')
			.then(function(response){
				console.log('All Games deleted');
		},
		function(response){
			console.log('Error');
		});
	}


}

})();
