(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('teamController', teamController);

	function teamController($http,$location,$routeParams,$window,$route){
		var vm = this;

		vm.userId = "";
	    vm.teamName = "";
    	vm.teamId = "";
    	vm.teamId2 = "";
    	vm.teamIdX = "";
    	vm.tm2 = "";
    	vm.teamId2X = "";
    	vm.eventId = "";
	    vm.addTeam = addTeam;
	    vm.allTeams = [];
	    vm.allPlayers=[];
	    vm.viewAllTeam = viewAllTeam;
	    vm.viewTeamInGame = viewTeamInGame;
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
    	vm.files = [];
    	//vm.getCurrentUser=getCurrentUser;
    	vm.updateFuckingTeam = updateFuckingTeam;
    	vm.getTeamPlayers=getTeamPlayers;
    	vm.deleteTeamPlayer=deleteTeamPlayer;
    	vm.deleteTeamPlayer_2=deleteTeamPlayer_2;
    	vm.currentId = null;
        vm.setCurrentId = setCurrentId;
        vm.openModal = openModal;
        vm.closeModal = closeModal;	
        vm.setTeamName = setTeamName;
        vm.playerStatus="";
        vm.playerTeamId=null;
         vm.cancelled=null; 
        vm.alreadyJoined=null; //for the user/player
        vm.samp = null;
        vm.getRankingTeam = getRankingTeam;
        vm.ranking = null;
        vm.getOverallRanking = getOverallRanking;
        vm.overallList = null;
        vm.getCheckers=getCheckers;
        vm.thisTeamName;
        vm.currentUserId=null;
        vm.updateTeamPicture = updateTeamPicture;
        vm.curTeam = null;
        vm.files = [];
        vm.getTeamPlayersCount=getTeamPlayersCount;

        vm.allTeamsIsEmpty = false;

        $http
    		.get('/user_loggedin')
    		.then(function(response){
    			if(response.data){
    				vm.userId=response.data;
    			} 			
    		});

    	$http
            .get('/events/' + $routeParams.event_id)
            .then(function(response){
                if(response.data != undefined){
                    vm.currentUserId = response.data[0].user_id; 
                }
            })
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

        function updateTeamPicture() {
            if (vm.files[0]) {
                let options = {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                let fd = new FormData();
                fd.append("teampic", vm.files[0]);
                $http.put('/teams/'+ vm.curTeam.team_id +'/teampic', fd, options)
                    .then(function(response) {
                        console.log("Team picture updated");
                        window.location.reload();
                    })
                    .catch(function(err) {
                        console.log("Error in uploading picture");
                    });
            } else {
                console.log("No file found");
            }
        }    

		function getTeamPlayersCount(team){
			var count=0;
			$http
	    		.get('/teams/players/'+team.team_id)
	    		.then(function(response){
	    			vm.allPlayers=response.data;
	    			console.log(vm.allPlayers);
	    			vm.allPlayers.forEach(function(e){
		    		 	console.log(e);
			    		if(e.player_status==='accepted'){
			    			count+=1;
			    		}
			    	});
			    	team.count=count;
    		 });
	
		}

		function getTeamPlayers(){
			$http
	    		.get('/teams/players/'+$routeParams.team_id)
	    		.then(function(response){
	    			vm.allPlayers=response.data;
	    			console.log(vm.allPlayers);
	    			vm.allPlayers.forEach(function(e){
		    		 	console.log(e);
		    		 	if(e.user_id===vm.userId){
		    		 		vm.playerTeamId= $routeParams.team_id;
			    			vm.playerStatus=e.player_status;
			    			vm.alreadyJoined=true;
			    		}
			    	});
    		 });	
		}

		function getCheckers(team_id){
			$http
	    		.get('/teams/players/'+team_id)
	    		.then(function(response){
	    			vm.allPlayers=response.data;
	    			console.log(vm.allPlayers);
	    			vm.allPlayers.forEach(function(e){
		    		 	console.log(e);
		    		 	if(e.user_id===vm.userId){
		    		 		vm.playerTeamId= team_id;
			    			vm.playerStatus=e.player_status;
			    			vm.alreadyJoined=true;
			    		}
			    	});
    		 });
		}

		function deleteTeamPlayer(user_id,team_id){
			console.log("huyyy");
			$http
	    		.delete('/teams/player_remove/'+$routeParams.event_id+'/'+team_id+'/'+ user_id)
	    		.then(function(response){
	    			vm.alreadyJoined=null;
	    			vm.cancelled=true;
    		 	} ,function(response){
					console.log(response.data);
				});
		}

		function deleteTeamPlayer_2(user_id){
			$http
	    		.delete('/teams/player_remove/'+$routeParams.event_id+'/'+$routeParams.team_id+'/'+ user_id)
	    		.then(function(response){
	    			vm.alreadyJoined=null;
	    			vm.cancelled=true;
	    			getTeamPlayers();
	    			window.location.reload();
    		 	} ,function(response){
					console.log(response.data);
				});
		}

		function userJoinTeam(team_id) {
			var joinTeam = {
				user_id : vm.userId,
				team_id : team_id
			}
			console.log(joinTeam);
			$http
			.post('/teams/join',joinTeam)
			.then(function(response){
				console.log(response.data);
				console.log('Joined team');
				vm.playerTeamId= team_id;
				vm.cancelled=false;
				vm.alreadyJoined=true;
				vm.playerStatus='pending';
				getTeamPlayers();
			},
			function(response){
				console.log(response.data);
				console.log("Error");
			})
		}


	    function viewTeam(id){
	    	$location.path('/events/' + $routeParams.event_id + '/team/'+id)
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
	    	console.log(vm.tm2);
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

	    function viewTeamInGame(){
	    	console.log($routeParams.game_id);
	    	var team = {
	    		event_id: $routeParams.event_id
	    	}
	    	$http
	    		.post('/teams/in_game/' + $routeParams.game_id,team)
	    		.then(function(response){
		    			vm.allTeams = response.data;
		    			console.log(response.data);
		    			console.log('Viewing All Available Teams')
		    		}, function(response){
		    			console.log("Error: Cannot retrieve teams");
	    		});

	    }

	    function viewAvailableTeams(){
	    	$http
	    		.get('/teams/game/' + $routeParams.game_id)	
	    		.then(function(response){
	    			vm.allTeams = response.data;
	    			console.log(response.data);
	    			console.log('Viewing All Teams')
	    		}, function(response){
	    			console.log("Error: Cannot retrieve teams");
	    		});
	    }

	    function viewClickedTeam(){
	    	console.log("VIEW CLICKED TEAM " + $routeParams.team_id);
	    	$http
	    		.get('/teams/' + $routeParams.team_id)
	    		.then(function(response){
	    			console.log(response);
	    			vm.allTeams = [];
	    			vm.allTeams = response.data;
	    			vm.teamName = response.data[0].team_name;
	    			vm.curTeam = response.data[0];
	    			console.log("CURRENT TEAM"+vm.thisTeamName);
	    			getTeamPlayers();
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
					vm.allTeamsIsEmpty = checkIfAllTeamsIsEmpty();
					console.log(vm.allTeams);
				},
				function(response){
					console.log("error");
				})
		}

		function checkIfAllTeamsIsEmpty(){
			if(vm.allTeams.size == 0) return true;
			else return false;
		}



		function deleteTeamFromEvent(team_id){
			console.log("DELETING TEAM FROM EVENT" + team_id);
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
	    		.delete('/teams_delete/'+$routeParams.team_id)
	    		.then(function(response){
	    			console.log('Team deleted')
	    			/*$location.path('/events');*/
	    			 $window.history.back(); 
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
	    	console.log(updateData);
	    	console.log("UPDATING " + $routeParams.team_id);
		    $http
		        .put('/teams',updateData)
		        .then(function(response){
		            console.log('event updated');
		            $route.reload();
		        },
		        function(response){
		            console.log("error");
		        });
		}


		function setTeamName(){
			
			console.log("SET TEAM NAME" + vm.thisTeamName);

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
	        console.log(currentTeamId);
	    	$http
	    		.post('/teams/join/game',gameToPlay)
	    		.then(function(response){
	    			console.log('Team Joined Event')
	    			viewTeamInGame();
	    		}, function(response){
	    			console.log("error");
	    		});
	    }


	    function updateFuckingTeam(){
		    var updateData = {
		        team_id : $routeParams.team_id,
		        team_name : vm.teamName
	    	}
	    	console.log(updateData);
	    	console.log("UPDATING " + $routeParams.team_id);
		    $http
		        .put('/teams',updateData)
		        .then(function(response){
		            console.log('event updated');
		            $route.reload();

		        },
		        function(response){
		            console.log("error");
		        });
		}


	    function team2PlayGame(gameid,currentTeamId){
	        // if(vm.teamId.team_id == vm.teamId2.team_id){
	        // 	console.log("Failed to add team. Team already has joined the game");
	        // 	return;
	        // }
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

	    function getRankingTeam(){
	        var data = {
	        	team_id : $routeParams.team_id,
	        }
			$http
				.post('/overallranking/' + $routeParams.event_id, data)
				.then(function(response){
					vm.ranking = response.data[0];
					console.log(response.data[0]);
					console.log('Viewing Rank Successful');
			},
			function(response){
				console.log('Error Viewing Rank');
			});

		}

		function getOverallRanking(){
			$http
				.get('/overallranking/' + $routeParams.event_id)
				.then(function(response){
					vm.overallList = response.data[0];
					console.log(response.data);
					console.log('Viewing Overall Rank Successful');
			},
			function(response){
				console.log('Error Viewing Rank');
			});

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
