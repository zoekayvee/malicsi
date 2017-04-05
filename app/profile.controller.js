(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('profileController', profileController);

	function profileController($http){
		var vm = this;
		
		vm.user = [];

		// $http
		// 	.post('/viewProfile')
		// 	.then(function(response){
		// 		vm.user = response.data;
		// 		console.log(response.data);
		// 		console.log("HERE");
		// 	});
		
	}

})();