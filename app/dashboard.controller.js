(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('dashboardController', dashboardController);

	function dashboardController($http){
		var vm = this
		var teamAndGame = [];
		vm.sa = "sa";

		console.log("FIRED");
		

})();