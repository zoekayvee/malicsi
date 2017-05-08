(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('otherUsersController', otherUsersController);

	function otherUsersController($http,$routeParams, $location){
		var vm = this;
		vm.clicked = clicked;
		vm.viewTeam=viewTeam;
		vm.user = null;
		vm.userInterests = null;
		vm.userEvents = {};
		vm.userTeams = {};
		vm.userId = $routeParams.user_id;

		$http
			.get('/users/' + vm.userId)
			.then(function(response){
				vm.user = response.data;
				$http
					.get('/user/interests/' + vm.userId)
					.then(function(response){
						vm.userInterests = response.data;
						console.log("INTERESTS");
					})

				$http
                    .get('/user/events/'+vm.userId)
                    .then(function(response) {
                        vm.userEvents = response.data;
                    });
                  $http
                    .get('/user/teams/'+vm.userId)
                    .then(function(response) {
                        vm.userTeams = response.data;
                        console.log(response.data);
                    });
			})

		function clicked(user_id){
			window.location.href ='/#!/users/' + user_id;
		}

		function viewTeam(team_id,event_id){
            $location.path('/events/' + event_id + '/team/'+ team_id)
        }
	}
})();
