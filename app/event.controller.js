(function(){
'use strict'
angular
.module('mainApp')
.controller('eventController', eventController);

function eventController($http){
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
function addEvent() {
    var newEvent = {
        user_id : vm.userId,
        event_name : vm.eventName,
        date_start : vm.dateStart,
        date_end : vm.dateEnd
}
$http
    .post('/event', newEvent)
    .then(function(response){
        console.log(response.data);
        console.log('Success! Event Added!')
},
function(response){
    console.log("Error :(");
});
}



function viewAllEvent() {
$http
    .get('/event')
    .then(function(response){
        vm.allEvents = response.data[0];
        console.log(response.data);
        console.log('Viewing All Events!')
},
function(response){
    console.log("error");   
});


}

function viewEvent(id){

    $http
        .get('/event/' + id)
        .then(function(response){
            vm.allEvents = response.data[0];
            console.log(response.data);
            console.log('Viewing event ' + response.data.event_name);
        })
}


function deleteEvent(id) {
    
$http
    .delete('/event/'+id)
    .then(function(response){
        console.log('Event deleted')
},
function(response){
    console.log("error");   
});
}


function updateEvent(){
    var updateData = {
        event_id : vm.eventId,
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
