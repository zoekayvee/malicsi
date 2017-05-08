(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('eventValidityController', eventValidityController);

	function eventValidityController($http,$routeParams){
		$http
			.get('/events/'+$routeParams.event_id)
			.then(function(response) {
				var obj=response.data[0];
				console.log(obj.status);
				if(obj.status==='pending' || obj.status==='rejected'){
					window.location.href ='/451';
				}
			}, function(response){
				window.location.href ='/403';
			}); 
	}
})();