'use strict';

(function() {
	angular.module('malicsi')
			.config(router)

	function router($routeProvider) {
		$routeProvider
			.when('/', {
					templateUrl: 'layouts/account-guest.html',
					controller:'userController'
			})
			.when('/login', {
					templateUrl: 'layouts/account-login.html',
					controller:'userController'
			})
			.when('/register', {
					templateUrl: 'layouts/account-register.html',
					controller:'userController'
			})

			//User Account Routers
			.when('/user/home', {
				templateUrl: 'layouts/user-dashboard.html'
			})
			.when('/user/profile', {
				templateUrl: 'layouts/user-profile.html'
			})
			.when('/user/activity-log', {
				templateUrl: 'layouts/user-activity-log.html'
			})
			.when('/users/:username', {
				//new route for visiting other profile
				templateUrl: 'layouts/user-visit-profile.html'
			})

			//Events Routers
			.when('/events', {
				templateUrl: 'layouts/user-view-all-events.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/events/:event_id',{
				templateUrl:'layouts/user-view-event.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/events/:event_id/scoreboard', {
				templateUrl: 'layouts/user-scoreboard-page.html',
				controller:'userGameSchedController',
				controllerAs:'UGSC'
			})
			.when('/events/game-schedule', {
				templateUrl: 'layouts/user-game-sched.html',
				controller:'userGameSchedController',
				controllerAs:'UGSC'
			})

			//Game Routers
			.when('/game/:game_id', {
				templateUrl: 'layouts/user-game-page.html',
				controller:'gameController',
				controllerAs:'game'
			})

			//Teams Routers
			.when('/teams', {
				templateUrl: 'layouts/user-view-all-teams.html'
			})
			.when('/teams/:team_id',{
				templateUrl: 'layouts/user-view-team.html'
			})

			//Search Routers
			.when('/search', {
				templateUrl: 'layouts/user-search-page.html'
			})

			//Admin Routers
			.when('/admin', {
				templateUrl: 'layouts/admin-homepage.html'
			})
			.when('/admin/all-users', { //changed, this is the route in htmls
				templateUrl: 'layouts/admin-all-users.html'
			})
			.when('/admin/events', {
				templateUrl: 'layouts/admin-all-events.html'
			})
			.when('/admin/sponsors', {
				templateUrl: 'layouts/admin-all-sponsors.html'
			})
			.when('/admin/games', {
				templateUrl: 'layouts/admin-all-games.html'
			})
			.when('/admin/sports', {
				templateUrl: 'layouts/admin-all-sports.html'
			})

			//Catch Case
			.otherwise({
				templateUrl: 'layouts/error-404.html'
			})
	}
})();
