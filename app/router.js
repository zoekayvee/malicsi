'use strict';

(function() {
	angular.module('malicsi')
			.config(router)

	function router($routeProvider) {
		$routeProvider
			.when('/', {
					templateUrl: 'layouts/login.html',
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
			.when('/event/:event_id/scoreboard', {
				templateUrl: 'layouts/user-scoreboard-page.html',
				controller:'userGameSchedController',
				controllerAs:'UGSC'
			})
			.when('/event/game-schedule', {
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
			.when('teams', {
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
			.when('/admin/all-users', {
				templateUrl: 'layouts/admin-all-users.html'
			})
			.when('/admin/all-events', {
				templateUrl: 'layouts/admin-all-events.html'
			})
			.when('/admin/all-sponsors', {
				templateUrl: 'layouts/admin-all-sponsors.html'
			})
			.when('/admin/all-games', {
				templateUrl: 'layouts/admin-all-games.html'
			})
			.when('/admin/all-sports', {
				templateUrl: 'layouts/admin-all-sports.html'
			})
			.when('/admin', {
				templateUrl: 'layouts/admin-homepage.html'
			})

			//Catch Case
			.otherwise({
				templateUrl: 'layouts/error-404.html'
			})
	}
})();
