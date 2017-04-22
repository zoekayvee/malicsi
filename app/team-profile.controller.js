(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('teamProfileController', teamProfileController);

	function teamProfileController($http,$location,$routeParams){
		var vm = this;
		vm.userId="";
        vm.alreadyJoined=null; //for the user/player
        vm.samp = null;

        $http
    		.get('/user_loggedin')
    		.then(function(response){
    			vm.userId=response.data;
    		});
	    /*---------- view team ---------*/
		function userJoinTeam(team_id) {
	    	console.log(vm.userId);
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
			},
			function(response){
				console.log(response.data);
				console.log("Error");
			})
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
	}
})();
