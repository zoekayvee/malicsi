(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('otherUsersController', otherUsersController);

	function otherUsersController($http,$routeParams){
		var vm = this;
		vm.clicked = clicked;
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
					.get('/user/interests/' + vm.user.user_id)
					.then(function(response){
						vm.userInterests = response.data;
						console.log("INTERESTS");
					})

				$http
                    .get('/user/events/'+vm.user.user_id)
                    .then(function(response) {
                        vm.userEvents = response.data;
                    });
                $http
                    .get('/user/teams/'+vm.user.user_id)
                    .then(function(response) {
                        vm.userTeams = response.data;
                    });
			})

		function clicked(user_id){
			window.location.href ='/#!/users/' + user_id;
		}
	}
})();
