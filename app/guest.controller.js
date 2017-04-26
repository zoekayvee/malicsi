(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('guestController', guestController);

	function guestController($http){
		var vm = this;

		vm.allGames = [];

		$http   
            .get('/viewGames') 
            .then(function(response) {
                if (response.data) {
                   vm.allGames = response.data;   
                }
                else{
                	console.log("ERROR!");
                }
            })
	}

})();