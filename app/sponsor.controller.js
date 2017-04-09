
(function(){
    'use strict'
    angular
        .module('malicsi')
        .controller('sponsorController', sponsorController);

    function sponsorController($http,$routeParams){
        var vm = this;
        
        vm.viewAllSponsor = viewAllSponsor;
        vm.addSponsor = addSponsor;
        vm.deleteSponsor = deleteSponsor;
        vm.updateSponsor = updateSponsor;
        vm.sponsorName = "";
        vm.newSponsorId;
        vm.sponsorId = null;
        vm.newSponsorName = "";
        vm.allSponsors = [];
        vm.allEventSponsors = [];
        vm.sponsorEvent = sponsorEvent;
        vm.getSponsorByEvent = getSponsorByEvent;
        vm.setSponsorId = setSponsorId;
        vm.deleteSponsorFromEvent = deleteSponsorFromEvent;
        vm.viewAllSponsor = viewAllSponsor;
        vm.setSponsor = setSponsor;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.newSponsor = "";
        vm.setSponsorId = setSponsorId;
        vm.deleteSponsorId = "";
        vm.updateSponsorName;
         vm.updateSponsorId; 
        function addSponsor() {   
            var sponsorToBeAdded = {
                 sponsor_name: vm.newSponsor
            }
        $http
            .post('/sponsors', sponsorToBeAdded)
            .then(function(response){
                    console.log(response.data);
                    console.log('Success! Sponsor Added!')
                    viewAllSponsor();
                },
                function(response){
                    console.log("Error :()");
                });
            vm.newSponsor = "";
        }


        function setSponsorId(sponsor_id){

            vm.sponsorId = sponsor_id;
            //console.log(vm.deleteSponsorId);
        }



    function sponsorEvent() {
        var i = 0;
        if(vm.sponsorId == undefined){
            console.log("Select a legitimate sponsor");
        } 
        else{
            console.log($routeParams.event_id);
            console.log(vm.sponsorId);
            var sponEvent = {
                sponsor_id: vm.sponsorId,
                event_id : $routeParams.event_id
            };
        $http
            .post('/sponsors_event',sponEvent)
            .then(function(response){
                console.log(response.data);
                getSponsorByEvent();
                },
                function(response){
                    console.log("error");
                });
            }
    }

    /*function getSponsorId(sponsor_name,event_id){
        $http
            .get('/sponsors_get_id/'+sponsor_name)
            .then(function(response){
                console.log("Sponsor Event Success");
                vm.sponsorId = response.data[0].sponsor_id;
                console.log("ID" + vm.sponsorId);
                sponsorEvent(vm.sponsorId,event_id);
            },
            function(response){
                console.log('error');
            });
    }
    */



    function getSponsorByEvent(){
        $http
            .get('/sponsors_by_event/'+$routeParams.event_id)
            .then(function(response){
                console.log(response.data);
                vm.allEventSponsors = response.data[0];
            },
            function(response){
                console.log("error");
            });
    }


    function deleteSponsor(sponsor_id) {
        console.log(sponsor_id);
        $http
            .delete('/sponsors/'+sponsor_id)
            .then(function(response){
            console.log(vm.deleteSponsorId);
            console.log('Sponsor deleted')
            console.log(response.data);
            closeModal('delete-modal');
            viewAllSponsor();
        },
        function(response){
            console.log("error");   
        });
    }

    function deleteSponsorFromEvent(sponsor_id){
        console.log(sponsor_id);
        var deleteSponsorEvent = {
            sponsor_id: sponsor_id,
            event_id: $routeParams.event_id
        }
        console.log(deleteSponsorEvent);
        $http
            .post('/sponsors_from_event',deleteSponsorEvent)
            .then(function(response){
                console.log(response.data);
                getSponsorByEvent($routeParams.event_id);
            },
            function(response){
                console.log("error");
            })
    }
    function setSponsor(sponsor_name,sponsor_id,dmodal){
        openModal(dmodal);
        console.log(sponsor_name);
        vm.updateSponsorName = sponsor_name;
        vm.updateSponsorId = sponsor_id;
        console.log(vm.updateSponsorId);
    }


    function updateSponsor() {
        
            var sponsorToBeUpdated = {
                sponsor_id: vm.updateSponsorId,
                sponsor_name: vm.updateSponsorName
            };
            $http
                .put('/sponsors', sponsorToBeUpdated)
                .then(function(response){
                console.log(response.data);
                console.log('Success! Sponsor Updated!')
            },
            function(response){
                console.log("Error :()");
            });
        }


    function viewAllSponsor() {
        $http
            .get('/sponsors/')
            .then(function(response){
            vm.allSponsors = response.data[0];
            console.log(response.data);
            console.log('Viewing Sponsors!')
        },
            function(response){
                console.log("error");   
            });

    }

    function openModal(dmodal){
            $('#'+dmodal+'.modal')
            .modal('setting', {
                 closable: false
            })
            .modal('show');
    }
    function closeModal(dmodal){
       $('#'+dmodal+'.modal')
                .modal('hide'); 
        }


}
})();