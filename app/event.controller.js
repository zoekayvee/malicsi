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
    vm.addEvent = addEvent;
    vm.allEvents = [];
    vm.viewAllEvent = viewAllEvent;
    vm.deleteEvent = deleteEvent;

function addEvent() {
    var newEvent = {
        user_id : vm.userId,
        event_name : vm.eventName,
        date_start : vm.dateStart,
        date_end : vm.dateEnd
}
$http
    .post('/addEvent', newEvent)
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
    .get('/viewAllEvent')
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
        .get('/viewEvent/' + id)
        .then(function(response){
            vm.allEvents = response.data;
            console.log(response.data);
            console.log('Viewing event ' + response.data.event_name);
        })
}


function deleteEvent(id) {
    
$http
    .delete('/deleteEvent/'+id)
    .then(function(response){
        console.log('Event deleted')
},
function(response){
    console.log("error");   
});
}



}   
}
)();
