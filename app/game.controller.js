(function(){
	'use strict'
	angular
	.module('malicsi')
	.controller('gameController',gameController);

	function gameController($http,$location,$routeParams){
		var vm = this;
		
		vm.game = null;
		vm.allGames = null;
		vm.game_id = "";
		vm.user_id = 1;
		vm.score = 0;
		vm.score2 = 0;
		vm.updateScore = 0;
		vm.updateScore2 = 0;
		vm.addGame = addGame;
		vm.updateGame = updateGame;
		vm.deleteGame = deleteGame;
		vm.getScores = getScores;
		vm.getScores2 = getScores2;
		vm.deleteAllGames = deleteAllGames;
		vm.viewGame = viewGame;
		vm.canBet = canBet;
		vm.userCanbet = true;
		vm.viewAllGames = viewAllGames;
		vm.bet = bet;
		vm.addSportId = null;
		vm.addVenueId = null;
		vm.addEventId = null;
		vm.currentId = null;
		vm.addDate = null;
		vm.addTime = null;
		vm.addDuration = null;
		vm.addReferee = null;
		vm.updateGameId = null;
		vm.updateSportId = null;
		vm.updateVenueId = null;
		vm.updateEventId = null;
		vm.updateReferee = null;
		vm.updateDateStart = null;
		vm.updateTimeStart = null;
		vm.updateDuration = null;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.setCurrentId = setCurrentId;
        vm.setVenueId = setVenueId;
        vm.setEventId = setEventId;
        vm.setWinner = setWinner;
        vm.winnerTeamId = null;
        vm.updateScores = updateScores;
        vm.viewThreeScoreboard = viewThreeScoreboard;
        vm.gameThreeScoreboard = [];
        vm.viewGameFromScoreboard = viewGameFromScoreboard;

		viewAllGames();

		function setCurrentId(id,dmodal){
            openModal(dmodal)
            vm.game_id = id;
        }

        function setVenueId(id){
            vm.addVenueId = id;
        }

        function setEventId(id){
            vm.addEventId = id;
        }
		
		function addGame(){
			var gameToBeAdded = {
				sport_id: vm.addSportId.sport_id,
				venue_id: vm.addVenueId.venue_id,
				event_id: vm.addEventId.event_id,
				date_start: vm.addDate,
				time_start: vm.addTime,
				duration: vm.addDuration,
				referee: vm.addReferee
			}
			$http
				.post('/game',gameToBeAdded)
				.then(function(response){
					viewAllGames();
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
					vm.winnerTeamId = vm.game.winner_team_id;
					vm.getScores(vm.game);
					vm.getScores2(vm.game);
					console.log('Viewing Game Successful');
			},
			function(response){
				console.log('Error Viewng Game');
			});
		}

		function viewThreeScoreboard(){
			$http
				.get('/game/score/' + $routeParams.event_id)
				.then(function(response){
					vm.gameThreeScoreboard = response.data;
					console.log('Viewing Scoreboard in Event Page Successful');
			},
			function(response){
				console.log('Error Viewing Scoreboard');
			});
		}

		function viewGameFromScoreboard(game_id){
			$location.path('/game/' + game_id)
		}


		function canBet(){
			$http
				.get('/bet/' + vm.user_id + '/' + $routeParams.game_id )
				.then(function(response){
					if(response.data.length == 0){
						vm.userCanbet = true;
					}
					else vm.userCanbet = false;
			},
			function(response){
				console.log('Error Viewng Game');
			});
		}

		function bet(game_id,team_id){
			var bet ={
				game_id: game_id,
				team_id: team_id
			}
			$http
				.post('/bet/' + vm.user_id,bet)
				.then(function(response){
					console.log('Betting Successful');
			},
			function(response){
				console.log('Error Viewng Game');
			});

		}
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
		function viewAllVenues(){
			$http
				.get('/game')
				.then(function(response){
					console.log('Viewing All Venues Successful');
					vm.allGames = response.data;
			},
			function(response){
				console.log('Error Viewing All Games');
			});

		}
		function updateGame(id){
			var updatedGames = {

				sport_id: vm.updateSportId.sport_id,
				venue_id: vm.updateVenueId.venue_id,
				event_id: vm.updateEventId.event_id,
				date_start: vm.updateDateStart,
				time_start: vm.updateTimeStart,
				duration: vm.updateDuration,
				referee: vm.updateReferee
			}
			console.log(vm.game_id);
			console.log(id);
			$http
				.put('/game/' + vm.game_id, updatedGames)
				.then(function(response){
					viewAllGames();
					console.log('Updating Game Successful!');
			},
			function(response){
				console.log('Error Updating Game');
			});

		}
		function deleteGame(id){

			$http
				.delete('/game/' + vm.game_id)
				.then(function(response){
					viewAllGames();
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

		function getScores(game){
			$http
				.get('/scores/' + game.game_id + '/' + game.team_id)
				.then(function(response){
					if(response.data.length!=0) vm.score = response.data[0].team_score;
			},
			function(response){
				console.log('Error Viewing Score');
			});
		}


		function getScores2(game){
			$http
				.get('/scores/' + game.game_id + '/' + game.team_id_2)
				.then(function(response){
					if(response.data.length!=0) vm.score2 = response.data[0].team_score;
			},
			function(response){
				console.log('Error Viewing Score');
			});
		}

		function updateScores(team1,team2){
			var scoreDetails = {
				score1: vm.updateScore,
				score2: vm.updateScore2,
				team_id: team1,
				team_id_2: team2
			}
			$http
				.post('/scores/update/' + vm.game.game_id,scoreDetails)
				.then(function(response){
					console.log("Updated Scores!");
			},
			function(response){
				console.log('Error Updating Score');
			});
			closeModal('addscore-modal');
		}

		function setWinner(){
			if(vm.score > vm.score2) vm.winnerTeamId = vm.game.team_id;
			else vm.winnerTeamId = vm.game.team_id_2;
			
			var winnerToBeAdded = {
				winner_team_id: vm.winnerTeamId,
				game_id: $routeParams.game_id
			}
			$http
				.post('/winner',winnerToBeAdded)
				.then(function(response){
					console.log("Updating Winner Successful! ");
				},
				function(response){
					console.log("Error adding winner!");
				});
		}
        function openModal(dmodal){
            $('#'+dmodal+'.modal')
            .modal('setting', {
                 closable: false
            })
            .modal('show');
        }
        function closeModal(dmodal){
           $('#'+dmodal+'.modal')
                    .modal('hide'); 
            }
	}
})();
