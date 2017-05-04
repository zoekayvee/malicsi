(function(){
    'use strict'
    angular
    .module('malicsi')
    .controller('loggedUserController', loggedUserController);

    function loggedUserController($http,$location,$rootScope){

        var vm = this;
        vm.userId = null;
        vm.userType="";

        $http
            .get('/user_loggedin')
            .then(function(response) {
                vm.userId=response.data;
            });
        $http
            .get('/user_type_loggedin')
            .then(function(response) {
                vm.userType=response.data;
            });
        
    }
}
)();
