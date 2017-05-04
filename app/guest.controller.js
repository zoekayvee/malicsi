(function(){
	'use strict'
	angular
		.module('malicsi')
		.controller('guestController', guestController);

	function guestController($http){
		var vm = this;
		vm.clicked = clicked;

		vm.allGames = [];
		vm.hasUser=null;
		vm.isAdmin=null;
        vm.eventid = null;

		$http   
            .get('/user_loggedin') 
            .then(function(response) {
            	if (response.data){
            		vm.hasUser=true;
            	}
            	else{
            		vm.hasUser=false;
            	}
            });

        $http   
            .get('/user_type_loggedin') 
            .then(function(response) {
            	vm.user_type = response.data;
                if (response.data == 'admin'){
                   vm.isAdmin = true;
                }
                else{
                	vm.isAdmin = false;
                }
            });

		$http   
            .get('/games/accepted') 
            .then(function(response) {
                if (response.data) {
                   vm.allGames = response.data;  
                }
                else{
                	console.log("ERROR!");
                }
            })

        function clicked(id){
            $http
                .get('/game/' + id)
                .then(function(response){
                    vm.game = response.data;
                    vm.eventid = response.data[0].event_event_id;
                    window.location.href = '#!/event/' + vm.eventid + '/game/' + id;
            },
            function(response){
                console.log('Error Viewng Game');
            });

        	
        }
	}

})();