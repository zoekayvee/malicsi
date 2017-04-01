(function(){
    'use strict'
    angular
        .module('mainApp')
        .controller('eventController', eventController);

    function eventController($http, $routeParams){
        var vm = this;
        
        vm.userId = "";
        vm.eventName = "";
        vm.dateStart = "";
        vm.dateEnd = "";
        vm.addEvent = addEvent;
        vm.allEvents = [];
        vm.currEvent = null;
        vm.viewAllEvent = viewAllEvent;
        vm.deleteEvent = deleteEvent;

        function initialise() {
            $http
                .get('/events/'+ $routeParams.id)
                .then(function(response) {
                    vm.currEvent = response.data;
                    console.log(response.data);
                },
                function(response){
                    console.log("Error in fetching event");
                })
        }

        function addEvent() {
            var newEvent = {
                user_id : vm.userId,
                event_name : vm.eventName,
                date_start : vm.dateStart,
                date_end : vm.dateEnd
            }
            
            $http
                .post('/events', newEvent)
                .then(function(response){
                    console.log(response.data);
                    console.log('Success! Event Added!')
                },
                function(response){
                    console.log("Cannot add event");
                });
        }



        function viewAllEvent() {
            $http
                .get('/events')
                .then(function(response){
                    vm.allEvents = response.data[0];
                    console.log(response.data);
                    console.log('Viewing All Events!')
                },
                function(response){
                    console.log("Cannot retrieve all events");   
                });
        }

        function viewEvent(id){
            $http
                .get('/events/' + id)
                .then(function(response){
                    vm.allEvents = response.data;
                    console.log(response.data);
                    console.log('Viewing event ' + response.data.event_name);
                },
                function(response) {
                    console.log("Cannot retrieve event " + id);
                });
        }


        function deleteEvent(id) {    
            $http
                .delete('/events/'+id)
                .then(function(response){
                    console.log('Event deleted')
            },
            function(response){
                console.log("Error in deleting event");   
            });
        }
    }       
})();