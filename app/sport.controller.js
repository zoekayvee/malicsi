(function(){
'use strict'
angular
.module('malicsi')
.controller('sportController',sportController);


function sportController($http){

	var vm = this;
	
	vm.allSports = null;
	vm.sport_id;
	vm.addSport = addSport;
	vm.updateSport = updateSport;
	vm.deleteSport = deleteSport;
	vm.deleteAllSports = deleteAllSports;
	vm.viewSport = viewSport;
	vm.viewAllSports = viewAllSports;
	vm.addSportName = null;
	vm.updateSportId = null;
	vm.updateSportName = null;

	viewAllSports();

	function addSport(){

		var sportToBeAdded = {

			sport_name: vm.addSportName,

		}
		$http
			.post('/sport',sportToBeAdded)
			.then(function(response){
				// console.log(response.data);
				console.log('Sport Added!')
		},
		function(response){
			console.log('Error');
		});

	}
	function viewSport(id){

		$http
			.get('/sport' + id)
			.then(function(response){
				vm.allSports = response.data;
				console.log(response.data);
				console.log('Viewing sport' + response.data.sport_id);
		},
		function(response){
			console.log('Error');
		});

	}
	function viewAllSports(){

		$http
			.get('/sport')
			.then(function(response){
				vm.allSports = response.data;
				// console.log(response.data);
				console.log('Viewing All Sports!');
		},
		function(response){
			console.log('Error');
		});

	}
	function updateSport(){

		var updatedSports = {

			sport_name: vm.updateSportName,
			sport_id: vm.updateSportId

		}
		$http
			.put('/sport', updatedSports)
			.then(function(response){
				console.log('Sport updated');
		},
		function(response){
			console.log('Error');
		});

	}
	function deleteSport(id){

		$http
			.delete('/sport/' + id)
			.then(function(response){
				vm.allSports = response.data;
				console.log('Sport deleted');
		},
		function(response){
			console.log('Error');
		});
	}
	function deleteAllSports(){

		$http
			.delete('/sport')
			.then(function(response){
				console.log('All Sports deleted');
		},
		function(response){
			console.log('Error');
		});
	}


}

})();
