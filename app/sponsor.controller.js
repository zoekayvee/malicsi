(function(){
    'use strict'
    angular
        .module('mainApp')
        .controller('sponsorController', sponsorController);

    function sponsorController($http){
        var vm = this;
        
        vm.viewAllSponsors = viewAllSponsors;
        vm.addSponsor = addSponsor;
        vm.deleteSponsor = deleteSponsor;
        vm.updateSponsor = updateSponsor;
        vm.newSponsor = "";
        vm.newSponsorId;
        vm.newSponsorName = "";
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

function sponsorEvent(){
            var sponEvent = {
                sponsor_id: vm.sponsorId,
                event_id : vm.eventId
            }
            $http
                .post('/sponsorEvent',sponEvent)
                .then(function(response){
                    console.log(response.data);
                },
                function(response){
                    console.log("error");
                });



        }



        function getData() {
    $http
        .get('/viewAllSponsor')
        .then(function(response){
            vm.allSponsors = response.data[0];
        },
        function(response){
            console.log("error");
        });

}

function interval(){
    setTimeout(function() {
        viewAllSponsor();
        interval();
    }, 1000);
}












         function deleteSponsor(id) {
            $http
                .delete('/deleteSponsor/'+id)
                .then(function(response){
                    console.log('Sponsor deleted')
            },
            function(response){
                console.log("error");   
            });
         }

         function updateSponsor() {
            var sponsorToBeUpdated = {
            sponsor_id: vm.newSponsorId,
            sponsor_name: vm.newSponsorName
            }
            $http
                    .put('/updateSponsor', sponsorToBeUpdated)
                    .then(function(response){
                        console.log(response.data);
                        console.log('Success! Sponsor Updated!')
                },
                function(response){
                    console.log("Error :()");
                });
        }

        function viewAllSponsors() {
        $http
                .get('/viewAllSponsor')
                .then(function(response){
                    vm.allSponsors = response.data[0];
                    console.log(response.data);
                    console.log('Viewing Sponsors!')
            },
            function(response){
                console.log("error");   
            });
        }

        function viewSponsor(id) {
        $http
                .get('/viewSponsor/'+id)
                .then(function(response){
                    vm.allSponsors = response.data[0];
                    console.log(response.data);
                    console.log('Viewing Sponsors!')
            },
            function(response){
                console.log("error");   
            });
        }




        
    }
})();