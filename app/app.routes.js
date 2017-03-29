(function(){
	'use strict'
    
    var routeProvider = null;

    // thank you cliff.meyers
	angular
		.module('mainApp')
		.config(function($routeProvider) {
            routeProvider = $routeProvider;
		})
        .run(function($http) {
            $http
                .get('/loggedIn')
                .then(function(response) {
                    $http
                        .get('/viewUser/'+response.data)
                        .then(function(response) {
                            console.log(response.data);
                            if (response.data.usertype === 'admin') {
                                routeProvider
                                    .when('/',{
                                        templateUrl: '../../views/index.html',
                                        controller: 'userController',
                                        controllerAs: 'user'
                                    })
                                    .otherwise({
                                        redirectTo: '/'    
                                    });
                            } else {
                                routeProvider
                                   .when('/',{
                                        templateUrl: '../../views/index.html',
                                        controller: 'userController',
                                        controllerAs: 'user'
                                    })
                                    .otherwise({
                                        redirectTo: '/'    
                                    });

                            }
                        });
                });
        });
})();