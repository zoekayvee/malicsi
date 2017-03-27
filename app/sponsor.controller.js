(function(){
    'use strict'
    angular
        .module('mainApp')
        .controller('sponsorController', sponsorController);

    function sponsorController($http){
        var vm = this;
        
        vm.newSponsor = "";
        vm.addSponsor = addSponsor;
        vm.allSponsors = [];

        function addSponsor() {
            var sponsorToBeAdded = {
            sponsor_name: vm.newSponsor
        }
        $http
                .post('/addSponsor', sponsorToBeAdded)
                .then(function(response){
                    console.log(response.data);
                    console.log('Success! Sponsor Added!')
            },
            function(response){
                console.log("Error :()");
            });
        }

        function viewAllSponsors() {
        $http
                .get('/viewAllSponsors')
                .then(function(response){
                    vm.allSponsors = response.data;
                    console.log(response.data);
                    console.log('Viewing Sponsors!')
            },
            function(response){
                console.log("error");   
            });
        }
    }
})();