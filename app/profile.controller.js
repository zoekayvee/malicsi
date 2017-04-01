(function(){
	'use strict'
	angular
		.module('mainApp')
		.controller('profileController', profileController);

	function profileController($http){
		var vm = this;
		
		vm.user = [];

		$http
			.get('/users')
			.then(function(response){
				vm.user = response.data;
				console.log(response.data);
				console.log("HERE");
			});

		function loginUser(){
			var credentials={
				username: vm.username,
				password: vm.password
			}
			$http.post('/login', credentials)
				.then(function (response){
					var redirect = response.data.redirect;
					console.log(redirect);
					if (redirect === '/'){
						window.location.href=redirect;
					}	
				}, function (response){	
				});
		}
		
	}

})();