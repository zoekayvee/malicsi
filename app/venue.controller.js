(function(){
'use strict'
    angular
        .module('malicsi')
        .controller('venueController', venueController);

        function venueController($http,$routeParams){
            var vm = this;
            
            vm.allVenues = null;
            vm.viewAllVenues = viewAllVenues;
            viewAllVenues();

            function viewAllVenues(){
                $http
                    .get('/venues')
                    .then(function(response){
                        vm.allVenues = response.data;
                        console.log(vm.allVenues);
                },
                function(response){
                    console.log('Error Viewing All Venues');
                });

            }
    }
})();
