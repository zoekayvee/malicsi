(function(){
'use strict'
angular
.module('malicsi')
.controller('eventController', eventController);

function eventController($http,$location,$routeParams){

    var vm = this;

    vm.userId = "";
    vm.eventName = "";
    vm.dateStart = "";
    vm.dateEnd = "";
    vm.eventId = "";
    vm.allowReg = "";
    vm.allEvents = [];
    vm.addEvent = addEvent;
    vm.viewAllEvent = viewAllEvent;
    vm.deleteEvent = deleteEvent;
    vm.updateEvent = updateEvent;
    vm.viewEvent = viewEvent;
    vm.viewClickedEvent = viewClickedEvent;
    vm.reload = interval;

function addEvent(user_id) {
    var newEvent = {
        user_id : userId,
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
    console.log("Error :(");
});
}

function interval(){
    setTimeout(function() {
        viewClickedEvent();
        interval();
    }, 1000);
}

function viewAllEvent() {
$http
    .get('/events')
    .then(function(response){
        vm.allEvents = response.data[0];
        console.log(response.data[0]);
        console.log('Viewing All Events!')
    },
    function(response){
        console.log("error");   
    });
}

function viewEvent(id){
    $location.path('/events/' + id)
    $http
        .get('/events/' + id)
        .then(function(response){
            vm.allEvents = response.data[0];
            vm.eventId = vm.allEvents[0].event_id;
            console.log("response data" + vm.allEvents[0].event_id);
            console.log('Viewing event ' + vm.allEvents[0].event_name);
            console.log(vm.eventId);
            //$window.localStorage.setItem("event_id",vm.eventId);
            //console.log($window.localStorage);

        })
        
 

}


function viewClickedEvent(){
    $http

        .get('/event/' + $routeParams.event_id)
        .then(function(response){
            vm.allEvents = response.data[0];
            console.log(response.data[0][0]);
        })
}


function deleteEvent(id) {
    
$http
    .delete('/events/'+id)
    .then(function(response){
        console.log('Event deleted')
},
function(response){
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
        .put('/event',updateData)
        .then(function(response){
            console.log('event updated')
        },
        function(response){
            console.log("error");
        });
}




}   
}
)();
