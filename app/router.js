'use strict';	

(function() {
	angular.module('malicsi')
			.config(router);

	function router($routeProvider) {
		$routeProvider
			.when('/teams/:team_id',{
				templateUrl: 'layouts/user-view-team.html'
			})
			.when('/user/teams', {
				templateUrl: 'layouts/user-view-teams.html'
			})
			.when('/', {
				templateUrl: 'layouts/login.html',
				controller:'userController'
			})
			.when('/users', {
				//temporary route for admin functions
				templateUrl: 'layouts/admin-list-users.html'
			})
            .when('/user/home', {
				templateUrl: 'layouts/user-dashboard.html'
			})
			.when('/user/profile', {
				templateUrl: 'layouts/user-profile.html'
			})
			.when('/user/activity-log', {
				templateUrl: 'layouts/user-activity-log.html'
			})
			.when('/user/new-event', {
				templateUrl: 'layouts/user-create-event.html'
			})
			.when('/user/event', {
				templateUrl: 'layouts/user-event.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/user/events', {
				templateUrl: 'layouts/user-event.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/user/events',{
				templateUrl:'layouts/user-event.html'
			})
			.when('/events/:event_id',{
				templateUrl: 'layouts/user-view-event.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/user/event/:event_id'	, {
				templateUrl: 'layouts/user-event-sports.html',
				controller: 'userEventController',
				controllerAs: 'event'
			})
			.when('/user/event/:event_id/scoreboard', {
				templateUrl: 'layouts/user-scoreboard-page.html',
				controller:'userGameSchedController',
				controllerAs:'UGSC'
			})
			.when('/user/game/:game_id', {
				templateUrl: 'layouts/user-game-page.html',
				controller:'gameController',
				controllerAs:'game'
			})
			.when('/user/gameSched', {
				templateUrl: 'layouts/user-game-sched.html',
				controller:'userGameSchedController',
				controllerAs:'UGSC'
			})
			.when('/hehe', {
				templateUrl: 'layouts/user-team-page.html'
			})
			.when('/user/teams', {
				templateUrl: 'layouts/user-view-all-teams.html'
			})
			.when('/user/search', {
				templateUrl: 'layouts/user-search-page.html'
			})
			.otherwise({
				templateUrl: 'layouts/error.html'
			})
	}
})();
