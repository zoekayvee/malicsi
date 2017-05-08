(function(){
'use strict'
    angular
        .module('malicsi')
        .controller('sportController', sportController);

        function sportController($http,$routeParams){
            var vm = this;
            
            vm.newSport = null;
            vm.allSports = null;
            vm.sport_id;
            vm.addSport = addSport;
            vm.updateSport = updateSport;
            vm.deleteSport = deleteSport;
            vm.deleteAllSports = deleteAllSports;
            vm.viewSport = viewSport;
            vm.viewAllSports = viewAllSports;
            vm.attachSportToEvent = attachSportToEvent;
            vm.addSportName = null;
            vm.updateSportId = null;
            vm.updateSportName = null;
            vm.openModal = openModal;
            vm.closeModal = closeModal;
            vm.currentId = null;
            vm.setCurrentId = setCurrentId;
            vm.setSportId = setSportId;
            vm.viewSportByEvent = viewSportByEvent;
            vm.allSports = null;
            vm.eventId = null;
            vm.setEventId = setEventId;
            vm.setNewSportName = setNewSportName;
            viewAllSports();

        function setCurrentId(id,dmodal){
            openModal(dmodal)
            vm.currentId = id;
        }

        function setNewSportName(sport_name){
            console.log(sport_name + "EREREGREGREGRE");
            vm.updateSportName = sport_name;
        }

        function setSportId(id){
            console.log("Set sport id " + id);
            vm.addSportId = id;
        }

        function setEventId(id){
            vm.eventId = id;
            console.log("EVENT" + vm.eventId);
        }

        function addSport(){
            var sportToBeAdded = {
                sport_name: vm.addSportName,
            }
            $http
                .post('/sport', sportToBeAdded)
                .then(function(response){
                    viewAllSports();
                    console.log('Adding Sport Successful!')
            },
            function(response){
                console.log('Error Adding Sport');
            });
        }

        function attachSportToEvent(){
            var sportToBeAdded = {
                sport_id: vm.addSportName,
            }
            $http
                .post('/sport/' + $routeParams.event_id, sportToBeAdded)
                .then(function(response){

                    console.log('Adding Sport To Event Successful!')
            },
            function(response){
                console.log('Error Adding Sport');
            });
        }
        
        function viewSport(id){
            $http
                .get('/sport' + id)
                .then(function(response){
                    vm.allSports = response.data;
                    console.log('Viewing Sport Successful');
            },
            function(response){
                console.log('Error Viewing Sport');
            });

        }
        function viewAllSports(){
            $http
                .get('/sport')
                .then(function(response){
                    vm.allSports = response.data;
                    console.log(vm.allSports);
            },
            function(response){
                console.log('Error Viewing All Sports');
            });

        }
        function viewSportByEvent(){
            console.log("here" + vm.eventId);
            $http
                .get('/sport/event/' + vm.eventId)
                .then(function(response){
                    vm.allSports = response.data;
                    console.log("here" + vm.allSports);
                },
                function(response){
                    console.log("Error retrieving data!");
                });
        }
        function updateSport(id){
            var updatedSports = {
                sport_name: vm.updateSportName,
                sport_id: id
            }
            $http
                .put('/sport', updatedSports)
                .then(function(response){
                    viewAllSports();
                    closeModal('edit-sport-modal');
                    console.log('Updating Sport Successful!');
            },
            function(response){

                console.log('Error Updating Sport');
            });

        }
        function deleteSport(id){
            $http
                .delete('/sport/' + id)
                .then(function(response){
                    vm.allSports = response.data;
                    viewAllSports();
                    console.log('Deleting Sport Successful!');
            },
            function(response){
                console.log('Error Deleting Sport');
            });
        }
        function deleteAllSports(){
            $http
                .delete('/sport')
                .then(function(response){
                    console.log('Deleting All Sports Successful');
            },
            function(response){
                console.log('Error Deleting All Sports');
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
