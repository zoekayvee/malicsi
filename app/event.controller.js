(function(){
    'use strict'
    angular
    .module('malicsi')
    .controller('eventController', eventController);

    function eventController($http,$location,$routeParams,$window,$route){

        var vm = this;

        vm.userId = 2;
        vm.eventName = "";
        vm.dateStart = "";
        vm.dateEnd = "";
        vm.eventId = "";
        vm.allowReg = "";
        vm.allEvents = [];
        vm.allEventsUser=[];
        vm.event = "";
        vm.addEvent = addEvent;
        vm.viewAllEvent = viewAllEvent;
        vm.deleteEvent = deleteEvent;
        vm.updateEvent = updateEvent;
        vm.viewEvent = viewEvent;
        vm.viewClickedEvent = viewClickedEvent;
        vm.getUserIdOfEvent = getUserIdOfEvent;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.currentUserId = null;
        vm.updateEventName = "";
        vm.updateAllowReg = "";
        vm.updateDateStart = "";
        vm.updateDateEnd = "";
        vm.updateEventId = "";
        vm.updateEventModal = updateEventModal;
        vm.setEvent = setEvent;
        vm.deleteEventId = "";
        vm.setDeleteEventId = setDeleteEventId;
        vm.deleteEventModal = deleteEventModal;
        vm.addEventModal = addEventModal;
        vm.viewEventDetails = viewEventDetails;
        vm.userJoin=userJoin;
        vm.eventWithEventCreator=eventWithEventCreator;


        function addEvent(user_id) {

            var newEvent = {
                user_id : user_id,
                event_name : vm.eventName,
                date_start : vm.dateStart,
                date_end : vm.dateEnd
            }

            $http
                .post('/events', newEvent)
                .then(function(response){
                    console.log(response.data);
                    console.log('DADA');
                    $route.reload();

                }, function(response){
                    console.log("Error: Cannot Create Event");
                });
        }

        function addEventModal(user_id,dmodal) {
            
            var newEvent = {
                user_id : user_id,
                event_name : vm.eventName,
                date_start : vm.dateStart,
                date_end : vm.dateEnd
            }

            $http
                .post('/events', newEvent)
                .then(function(response){
                    console.log(response.data);
                    console.log('Success! Event Added!')
                    
                    closeModal(dmodal);
                    viewAllEvent();
                }, function(response){
                    console.log("Error: Cannot Create Event");
                });

        }


        function viewAllEvent() {
            $http
                .get('/events')
                .then(function(response){
                    vm.allEvents = response.data;
                    console.log('Viewing All Events!')
                }, function(response){
                    console.log("Error: Cannot Get All Events");
                });
        }

        function setEvent(event_id,event_name,date_start,date_end,allow_reg){
            vm.updateEventName = event_name;
            vm.updateDateStart = date_start;
            vm.updateDateEnd = date_end;
            vm.updateEventId = event_id;
            vm.updateAllowReg = allow_reg;
        }

        function openModal(dmodal){
            $('#'+dmodal+'.modal')
            /*.modal('setting', {
                closable: false
            })*/
            .on('hidden.bs.modal')
            .modal('show',{
                observeChanges:true
            })
            /*.modal({observeChanges:true});*/
        }
        function closeModal(dmodal){
           $('#'+dmodal+'.modal')
                    .modal('hide'); 
            }

        function viewEvent(id){
            console.log("VIEW EVENT" + id)
            $location.path('/events/' + id)
            // $http
            //     .get('/events/' + id)
            //     .then(function(response){
            //         vm.allEvents = response.data[0];
            //         if(vm.allEvents[0] == undefined){
            //             $location.path('/user/events');
            //         }
            //         else{
            //         vm.eventId = vm.allEvents[0].event_id;
            //         console.log("response data" + vm.allEvents[0].event_id);
            //         console.log('Viewing event ' + vm.allEvents[0].event_name);
            //         console.log(vm.eventId);
            //         //$window.localStorage.setItem("event_id",vm.eventId);
            //         //console.log($window.localStorage);
            //         }
            //     });
        }

        function viewEventDetails(){
            $http
                .get('/events/' + $routeParams.event_id)
                .then(function(response){
                    vm.event = response.data[0];
                });
        }

        function getUserIdOfEvent(){
            $http  
                .get('/events_user_id/'+$routeParams.event_id)
                .then(function(response){
                    console.log(response.data);
                    vm.userId = response.data;
                },
                function(response){
                    console.log("Cannot get user Id of event");
                })
        }

        function viewClickedEvent(){

            $http
                .get('/events/' + $routeParams.event_id)
                .then(function(response){
                    vm.allEvents = [];
                    vm.eventId = $routeParams.event_id;
                    vm.allEvents = response.data;
                    console.log(vm.allEvents);
                    if(vm.allEvents == undefined){
                        vm.allEvents = [];
                        $location.path('/user/events');
                        viewAllEvent();
                    }
                    else{ 
                        vm.currentUserId = response.data[0].user_id;   
                        console.log(vm.currentUserId);
                        eventWithEventCreator();
                    }
                })
        }


        function deleteEvent(id) {
            $http
                .delete('/events/'+id)
                .then(function(response){
                    console.log('Event deleted')
                    //viewEvent($routeParams.event_id)
                    $window.history.back();
            }, function(response){
                console.log("error");
            });
        }

        function setDeleteEventId(event_id){
            vm.deleteEventId = event_id;
        }

        function deleteEventModal(dmodal) {
            $http
                .delete('/events/'+vm.deleteEventId)
                .then(function(response){
                    console.log('Event deleted')
                    closeModal(dmodal)
                    viewAllEvent();
            }, function(response){
                console.log("error");   
            });
        }



        function updateEvent(){
            var updateData = {
                event_id : $routeParams.event_id,
                event_name : vm.eventName,
                date_start : vm.dateStart,
                date_end : vm.dateEnd,
                allow_reg : vm.allowReg


            }

            $http
                .put('/events',updateData)
                .then(function(response){
                    console.log('event updated')
                    viewEvent($routeParams.event_id);
                    $route.reload();
                },
                function(response){
                    console.log("Error :(");
                });

        }     


        function updateEventModal(dmodal){
            var updateData = {
                event_id : vm.updateEventId,
                event_name : vm.updateEventName,
                date_start : vm.updateDateStart,
                date_end : vm.updateDateEnd,
                allow_reg : vm.updateAllowReg
            }

            $http
                .put('/events',updateData)
                .then(function(response){
                    console.log('event updated')
                    viewAllEvent();
                    closeModal(dmodal);
                },
                function(response){
                    console.log("Error :(");
                });
        }   

         function userJoin (){  
            $location.path('/user/join_event/' + $routeParams.event_id);
         } 
         function eventWithEventCreator(){
            $http
                .get('/user/all_events')
                .then(function(response) {
                     response.data.forEach(function(e){
                        if(e.event_id==$routeParams.event_id){
                            vm.allEventsUser = e;
                            console.log("wee");
                            console.log(vm.allEventsUser);
                        }
                     });
                }, function(response){
                    console.log('Error');
                }); 
         }
    }   

})();
