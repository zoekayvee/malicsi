(function(){
'use strict'
angular
.module('mainApp')
.controller('sportController', sportController);

function sportController($http){
    var vm = this;
    
    vm.newSport = "";
    vm.addSport = addSport;
    vm.allSports = [];
    vm.viewAllSport = viewAllSport;

function addSport() {
    var sportToBeAdded = {
    sport_name: vm.newSport
}
$http
    .post('/addSport', sportToBeAdded)
    .then(function(response){
        console.log(response.data);
        console.log('Success! Sport Added!')
},
function(response){
    console.log("Error :(");
});
}



function viewAllSport() {
    
$http
    .get('/viewAllSports')
    .then(function(response){
    	vm.allSports = response.data;
        console.log(response.data);
        console.log('Viewing Sports!')
},
function(response){
	console.log("error");	
});
}


function deleteSport(id) {
    
$http
    .delete('/deleteSport'+id)
    .then(function(response){
    	vm.allSports = response.data;
        console.log(response.data);
        console.log('Sport deleted')
},
function(response){
	console.log("error");	
});
}



}	
}
)();
