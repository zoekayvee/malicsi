(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('otherUsersController', otherUsersController);

	function otherUsersController($http){
		var vm = this;
		vm.otherUsers = {};
		vm.otherUserEvents = {};
		vm.otherUserInterests = {};
		vm.sponsoredEvents = {};

		vm.user_id="";
		vm.relocate=relocate;
		/*vm.getInfo=getInfo;
		vm.getEvent=getEvent;
		vm.getSponsors=getSponsors;
		vm.getInterests=getInterests;		*/

		
		if(vm.user_id.length>0){
			$http
	            .get('/users/'+vm.user_id)
	            .then(function(response) {
	                vm.otherUsers = response.data;

	            });
	        $http
	            .get('/user/events/'+vm.user_id)
	            .then(function(response) {
	                vm.otherUserEvents = response.data;
	            });
	         $http
	            .get('/user/sponsored/'+vm.user_id)
	            .then(function(response) {
	                vm.sponsoredEvents = response.data;

	            });
	          $http
	            .get('/user/interests/'+vm.user_id)
	            .then(function(response) {
	                vm.otherUserInterests  = response.data;
	                console.log(vm.otherUserInterests);
	            });
	       }
		/*function getInfo(user_id){
			$http
	            .get('/users/'+user_id)
	            .then(function(response) {
	                vm.otherUsers = response.data;

	            });
	    }
	    function getEvent(user_id){
	        $http
	            .get('/user/events/'+user_id)
	            .then(function(response) {
	                vm.otherUserEvents = response.data;
	            });
	    }

	    function getSponsors(user_id){
	        $http
	            .get('/user/sponsored/'+user_id)
	            .then(function(response) {
	                vm.sponsoredEvents = response.data;

	            });
	    }
	    function getInterests(user_id){
	         $http
	            .get('/user/interests/'+user_id)
	            .then(function(response) {
	                vm.otherUserInterests  = response.data;
	                console.log(vm.otherUserInterests);
	            });
	    }*/
	    function relocate(user_id){
	    	vm.user_id=user_id;
	    	window.location.href='/#!/user/visit-profile';
	    }
	}
})();
