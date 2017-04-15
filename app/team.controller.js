(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('teamController', teamController);

	function teamController($http,$location,$routeParams){
		var vm = this;

		vm.userId = "";
	    vm.teamName = "";
    	vm.teamId = "";
    	vm.teamId2 = "";
    	vm.teamIdX = "";
    	vm.teamId2X = "";
    	vm.eventId = "";
	    vm.addTeam = addTeam;
	    vm.allTeams = [];
	    vm.viewAllTeam = viewAllTeam;
	    vm.deleteTeam = deleteTeam;
    	vm.viewTeam = viewTeam;
    	vm.teamJointEvent = teamJoinEvent;
    	vm.updateTeam = updateTeam;
    	vm.teamPlayGame = teamPlayGame;
    	vm.team2PlayGame = team2PlayGame;
    	vm.viewClickedTeam = viewClickedTeam;
    	vm.userJoinTeam = userJoinTeam;
    	vm.getTeamId = getTeamId;
    	vm.viewTeamPerEvent = viewTeamPerEvent;
    	vm.deleteTeamFromEvent = deleteTeamFromEvent;
    	vm.viewAvailableTeams = viewAvailableTeams;
    	vm.currentId = null;
        vm.setCurrentId = setCurrentId;
        vm.openModal = openModal;
        vm.closeModal = closeModal;	
	    /*---------- view team ---------*/

		function addTeam(event_id) {
			console.log(event_id);
	   	 	var newTeam = {
	        	team_name : vm.teamName
			}
			$http
		    .post('/teams', newTeam)
		    .then(function(response){

		        console.log('Success! Team Added!');
		        console.log("team" + vm.teamName);
				getTeamId(vm.teamName,event_id);
				viewTeamPerEvent();

			},
			function(response){
		   console.log("Error: Team cannot be added");
			});
		}

		function userJoinTeam(user_id) {
			var joinTeam = {
				user_id : user_id,
				team_id : vm.teamId
			}

			$http
			.post('/teams/join',joinTeam)
			.then(function(response){
				console.log(response.data);
				console.log('Joined team')
			},
			function(response){
				console.log("Error");
			})
		}


	    function viewTeam(id){
	    	$location.path('/teams/'+id)
	    	$http
	    		.get('/teams/'+id)
	    		.then(function(response){
	    			
	    			vm.allTeams = response.data[0];
	    			if(vm.allTeams[0] = undefined){
	    				$location.path('/user/team');
	    			}
	    			else{
						console.log(response.data);
	    				console.log('Viewing team ' + response.data.team_name);
	    			}
	    		},
	    		function(response){
	    			console.log("error");
	    		})
	    }

		    /*--------- view all teams --------*/
	    function viewAllTeam(){
	    	$http
	    		.get('/teams')
	    		.then(function(response){
	    			vm.allTeams = response.data[0];
	    			console.log(response.data);
	    			console.log('Viewing All Teams')
	    		}, function(response){
	    			console.log("Error: Cannot retrieve teams");
	    		});
	    }

	    function viewAvailableTeams(){
	    	$http
	    		.get('/teams/game/' + 1)
	    		.then(function(response){
	    			vm.allTeams = response.data;
	    			console.log(response.data);
	    			console.log('Viewing All Teams')
	    		}, function(response){
	    			console.log("Error: Cannot retrieve teams");
	    		});
	    }

	    function viewClickedTeam(){
	    	console.log("view clicked team" + $routeParams.team_id);
	    	$http
	    		.get('/teams/' + $routeParams.team_id)
	    		.then(function(response){
	    			console.log(response);
	    			vm.allTeams = [];
	    			vm.allTeams = response.data;
	    		},
	    		function(response){
	    			console.log('Team does not exist');
	    		})
	    }


		function viewTeamPerEvent(){
			console.log($routeParams.event_id)
			$http
				.get('/teams_per/'+$routeParams.event_id)
				.then(function(response){
					vm.allTeams = response.data;
					console.log(vm.allTeams);
				},
				function(response){
					console.log("error");
				})
		}



		function deleteTeamFromEvent(team_id){

			var deleteFromEvent = {
				team_id: team_id,
				event_id: $routeParams.event_id
			}
			console.log(deleteFromEvent)
			$http
				.post('/teams_from_event',deleteFromEvent)
				.then(function(response){
					console.log("removed team from event");
					viewTeamPerEvent();
				},
				function(response){
					console.log("error");
				})



		}



	    /*-------- delete event ------------*/
	    function deleteTeam(id){
	    	$http
	    		.delete('/teams/'+id)
	    		.then(function(response){
	    			console.log('Team deleted')
	    			//$location.path('/user/team');
	    			viewTeamPerEvent();
	    		}, function(response){
	    			console.log("error");
	    		});
	    }

	    /*-------- team join event -----------*/
	    //di ako sure dito haha
	    function teamJoinEvent(event_id,team_id){
		    console.log("event id " + event_id);
		    console.log("team id " + team_id);
		    var teamToJointEvent = {
		    	team_id : team_id,
		      	event_id : event_id
		    }

	    	$http
	    		.post('/teams/event',teamToJointEvent)
	    		.then(function(response){
	    			console.log('Team Joined Event')
					viewTeamPerEvent();
	    		}, function(response){
	    			console.log("Team cannot join event");
	    		});

	    }

	    function updateTeam(){
		    var updateData = {
		        team_id : $routeParams.team_id,
		        team_name : vm.teamName
	    	}

		    $http
		        .put('/teams',updateData)
		        .then(function(response){
		            console.log('event updated')
		            viewClickedTeam();
		        },
		        function(response){
		            console.log("error");
		        });
		}

		function getTeamId(team_name,event_id){
			console.log("ooh"+team_name);
			$http
				.get('/teams_get_id/'+team_name)
				.then(function(response){
					console.log(response.data[0].team_id)
					vm.teamId = response.data[0].team_id;
					console.log("PP" + vm.teamId);
					console.log(team_name);
					teamJoinEvent(event_id,vm.teamId);
					viewTeamPerEvent();
					//vm.teamId = response;
					//console.log("Team id" + vm.teamId);
				},
				function(response){
					console.log('error');
				});
				return vm.teamId;

		}


	    function teamPlayGame(gameid,currentTeamId){
	        var gameToPlay = {
	        	team_id : vm.teamId.team_id,
	          	game_id : gameid,
	          	default_team_id : currentTeamId
	        }
	        console.log(gameid);
	    	$http
	    		.post('/teams/join/game',gameToPlay)
	    		.then(function(response){
	    			console.log('Team Joined Event')
	    		}, function(response){
	    			console.log("error");
	    		});
	    }


	    function team2PlayGame(gameid,currentTeamId,dmodal){
	        if(vm.teamId.team_id == vm.teamId2.team_id){
	        	console.log("Failed to add team. Team already has joined the game");
	        	return;
	        }
	        var gameToPlay = {
	        	team_id : vm.teamId2.team_id,
	          	game_id : gameid,
	          	default_team_id : currentTeamId
	        }
	    	$http
	    		.post('/teams/join/game',gameToPlay)
	    		.then(function(response){
	    			console.log('Team2 Joined Event')
	    		}, function(response){
	    			console.log("error");
	    		});
	    	closeModal('add-modal');
	    }


        function setCurrentId(id,dmodal){
            console.log(id);
            openModal(dmodal)
            vm.currentId = id;
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
