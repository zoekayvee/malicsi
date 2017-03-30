<<<<<<< HEAD
;(function(){
	'use strict'
	angular
		.module('mainApp')
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
    .post('/addTeam', newTeam)
    .then(function(response){
        console.log(response.data);
        console.log('Success! Event Added!')
	},
	function(response){
   console.log("Error :(");
	});
	}    
    
    
	    function viewTeam(id){
	    	$http
	    		.get('/viewTeam/'+id)
	    		.then(function(response){
	    			vm.allTeams = response.data[0];
	    			console.log(response.data);
	    			console.log('Viewing team ' + response.data.event_name);
	    		})
	    }

	    /*--------- view all teams --------*/
	    function viewAllTeam(){
	    	$http
	    		.get('/viewAllTeam')
	    		.then(function(response){
	    			vm.allTeams = response.data[0];
	    			console.log(response.data);
	    			console.log('Viewing All Teams')
	    		}, function(response){
	    			console.log("error");
	    		});
	    }


	    function getData() {
    $http
        .get('/viewAllTeam')
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
	    		.delete('/deleteTeam/'+id)
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
	    		.post('/teamJoinEvent',teamToJointEvent)
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
        .put('/updateTeam',updateData)
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
	    		.post('/teamPlayGame',gameToPlay)
	    		.then(function(response){
	    			console.log('Team Joined Event')
	    		}, function(response){
	    			console.log("error");
	    		});

	    }

	}
})();
=======
(function () {
    'use strict'
    angular
        .module('mainApp')
        .controller('teamController', teamController);

    // router.post     ('/addTeam',       teamController.addTeam);
    // router.get      ('/viewTeam/:team_id', teamController.viewTeam);
    // router.get      ('/viewAllTeam',   teamController.viewAllTeam);
    // router.put      ('/updateTeam',     teamController.updateTeam);
    // router.delete   ('/deleteTeam/:team_id', teamController.deleteTeam);
    // router.post     ('/teamJoinEvent',  teamController.teamJoinEvent);
    // router.post     ('/teamPlayGame',   teamController.teamPlayGame);

    function teamController($http) {
        var vm = this;
        
        vm.teams = [];
        vm.teamName = "";
        vm.newTeamName = "";

        vm.viewTeam = viewTeam;
        vm.viewAllTeam = viewAllTeam;
        vm.addTeam = addTeam;
        vm.updateTeam = updateTeam;
        vm.deleteTeam = deleteTeam;
        vm.teamJoinEvent = teamJoinEvent;
        vm.teamPlayGame = teamPlayGame;

        function viewTeam(teamId) {
            $http
            .get('/viewTeam/' + teamId)
            .then(function (response) {
                vm.teams = response.data[0];
                console.log(response.data);
                console.log('Viewing team ' + response.data[0].team_name)
            },
            function (err) {
                console.log(err);
            });
        }

        function viewAllTeam() {
            $http
            .get('/viewAllTeam')
            .then(function (response) {
                vm.teams = response.data[0];
                console.log(response.data);
                console.log('Viewing all teams')
            },
            function (err) {
                console.log(err);
            });
        }

        function addTeam() {
            var newTeam = {};
            newTeam.team_name = vm.teamName;

            $http
            .post('/addTeam', newTeam)
            .then(function (response) {
                console.log(response.data);
                console.log('Success! Team Added!')
            },
            function (err) {
                console.log(err);
            });
        }

        function updateTeam(teamId) {
            var newTeam = {};
            newTeam.team_id = team_id;
            newTeam.team_name = vm.newTeamName;

            $http
            .put('/updateTeam', newTeam)
            .then(function (response) {
                console.log(response.data);
                console.log('Success! Team Updated!')
            },
            function (err) {
                console.log(err);
            });
        }

        function deleteTeam(teamId) {
            $http
            .delete('/deleteTeam/' + teamId)
            .then(function (response) {
                console.log('Team deleted')
            },
            function (err) {
                console.log(err);
            });
        }

        function teamJoinEvent(teamId, eventId) {
            var joinEvent = {
                team_id: teamId,
                event_id: eventId
            }

            $http
            .post('/teamJoinEvent', joinEvent)
            .then(function (response) {
                console.log(response.data);
                console.log('Success! Team Join Event!')
            },
            function (err) {
                console.log(err);
            });
        }

        function teamPlayGame(teamId, gameId) {
            var playGame = {
                team_id: teamId,
                game_id: gameId
            }

            $http
            .post('/teamPlayGame', playGame)
            .then(function (response) {
                console.log(response.data);
                console.log('Success! Team Play Game!')
            },
            function (err) {
                console.log(err);
            });
        }
    }
}
)();
>>>>>>> 56249587a758a6ebd9e741a15e8abd368abf3f7d
