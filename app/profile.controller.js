(function(){
	'use strict'
	angular
		.module('mainApp')
		.controller('profileController', profileController);

	function profileController($http){
		var vm = this;
		
		vm.user = [];
		$http   
            .get('/user_loggedin') 
            .then(function(response) {
               $http
				.get('/users/' + response.data)
				.then(function(response){
					vm.user = response.data;
					console.log(response.data);
					console.log("HERE");
				});
            });
		
		
	}

})();