'use strict';

(function() {
	angular.module('malicsi')
			.config(router);

	function router($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'layouts/login.html'
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
			.when('/user/events', {
				templateUrl: 'layouts/user-event.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/events/:event_id',{
				templateUrl: 'layouts/user-view-event.html',
				controller: 'eventController',
				controllerAs: 'event'
			})
			.when('/user/game', {
				templateUrl: 'layouts/user-game-page.html'
			})
			.when('/user/game/sched', {
				templateUrl: 'layouts/user-game-sched.html'
			})
			.when('/user/scoreboard', {
				templateUrl: 'layouts/user-scoreboard-page.html'
			})
			.when('/user/team', {
				templateUrl: 'layouts/user-team-page.html'
			})
			.when('/user/search', {
				templateUrl: 'layouts/user-search-page.html'
			})

			// .otherwise({
			// 	redirectTo: '/'
			// })
	}
})();