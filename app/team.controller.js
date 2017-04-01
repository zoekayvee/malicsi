(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('teamController', teamController);

	function teamController($http){
		var vm = this;

		vm.userId = "";
	    vm.teamName = "";
    	vm.teamId = "";
    	vm.eventId = "";
	    vm.addTeam = addTeam;
	    vm.allTeams = [];
	    vm.viewAllTeam = viewAllTeam;
	    vm.deleteTeam = deleteTeam;
    	vm.viewTeam = viewTeam;
    	vm.teamJointEvent = teamJoinEvent;
    	vm.updateTeam = updateTeam;
    	vm.teamPlayGame = teamPlayGame;
    	vm.reload = interval;
	    /*---------- view team ---------*/
    
		function addTeam() {
	   	 	var newTeam = {
	        team_name : vm.teamName
			}
			$http
		    .post('/teams', newTeam)
		    .then(function(response){
		        console.log(response.data);
		        console.log('Success! Team Added!')
			},
			function(response){
		   console.log("Error: Team cannot be added");
			});
		}    
	    
	    
	    function viewTeam(id){
	    	$http
	    		.get('/teams/'+id)
	    		.then(function(response){
	    			vm.allTeams = response.data[0];
	    			console.log(response.data);
	    			console.log('Viewing team ' + response.data.event_name);
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


		function getData() {
		    $http
		        .get('/teams')
		        .then(function(response){
		            vm.allTeams = response.data[0];
		        },
		        function(response){
		            console.log("error");
		        });
		}

		function interval(){
		    setTimeout(function() {
		        viewAllTeam();
		        interval();
		    }, 1000);
		}


	    /*-------- delete event ------------*/
	    function deleteTeam(id){
	    	$http
	    		.delete('/teams/'+id)
	    		.then(function(response){
	    			console.log('Team deleted')
	    		}, function(response){
	    			console.log("error");
	    		});
	    }

	    /*-------- team join event -----------*/
	    //di ako sure dito haha
	    function teamJoinEvent(){
		    var teamToJointEvent = {
		    	team_id : vm.teamId,
		      event_id : vm.eventId
		    }
	    
	    	$http
	    		.post('/teams',teamToJointEvent)
	    		.then(function(response){
	    			console.log('Team Joined Event')
	    		}, function(response){
	    			console.log("error");
	    		});

	    }
	    
	    function updateTeam(){
		    var updateData = {
		        team_id : vm.teamId,
		        team_name : vm.teamName
	    	}

		    $http
		        .put('/teams',updateData)
		        .then(function(response){
		            console.log('event updated')
		        },
		        function(response){
		            console.log("error");
		        });
		}
	    
	    
	    function teamPlayGame(){
	        var gameToPlay = {
	        	team_id : vm.teamId,
	          	game_id : vm.gameId
	        }
	        
		    	$http
		    		.post('/teams',gameToPlay)
		    		.then(function(response){
		    			console.log('Team Joined Event')
		    		}, function(response){
		    			console.log("error");
		    		});
		    }
		}
	}
)();
