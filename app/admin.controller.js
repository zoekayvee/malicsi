(function(){
	'use strict'
	angular
		.module('mainApp')
		.controller('adminController', adminController);

	function adminController($http){
		var vm = this;

		vm.allLogs = [];

		$http
			.post('/logs')
			.then(function(response) {
				if(response.data) {
					vm.allLogs = response.data;
				} else console.log('Error');
			});
		}


})();