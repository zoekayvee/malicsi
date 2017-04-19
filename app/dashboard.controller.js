(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('dashboardController', dashboardController);

	function dashboardController($http){
		//FOR DASHBOARD
		var vm = this;
		vm.teamGames = [];
		vm.currentGames = [];
		vm.upcomingGames = [];	

		$http   
            .get('/viewTeamPlayGame') 
            .then(function(response) {
                if (response.data) {
                   vm.teamGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })

         $http   
            .get('/viewCurrentGames') 
            .then(function(response) {
                if (response.data) {
                   vm.currentGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })

         $http   
            .get('/viewUpcomingGame') 
            .then(function(response) {
                if (response.data) {
                   vm.upcomingGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })
	}	

})();