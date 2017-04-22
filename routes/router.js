	'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const gameController =require('../services/game.service');
const winnerController =require('../services/winner.service');
const sportController =require('../services/sport.service');
const eventController =require('../services/event.services');
const teamController = require('../services/team.services');
const sponsorController = require('../services/sponsor.services');
const venueController = require('../services/venue.service');

// const dashboardController =require('../services/dashboard.service');
const dashboardController =require('../services/dashboard.service');



var path = require('path');
const express = require('express');
const router = express.Router();


router.get      ('/users',                  adminController.viewAllUsers);
router.get      ('/users/:user_id',         userController.viewUser);
router.put      ('/users/:user_id',         adminController.updateUserPassword);
router.delete   ('/users/:user_id',         adminController.removeUser);
router.post     ('/user_team',              userController.userJoinsTeam);
router.get      ('/logs',                   adminController.viewAllLogs);
router.get      ('/logs/:user_id',          adminController.viewLogs);

router.put      ('/user/:user_id',			userController.updateUser); //added
router.get 		('/user/teams/:user_id',    userController.viewUserTeams); //added
router.post  	('/user',                	adminController.addUser); //added
router.get      ('/users/joined_events/:user_id',dashboardController.viewLatestEvent); //added for dashboard

router.get('/user/events/:user_id',         userController.viewUserEvents);
router.get('/user/sponsored/:user_id',      userController.viewSponsoredEvents);
router.get('/user/interests/:user_id',      userController.viewUserInterests);
router.put('/users/interests/:user_id',     userController.updateInterests);
router.put('/users/approval/:user_id',      adminController.approveUser);
router.put('/users/passwords/:user_id',     adminController.updateUserPassword);
router.delete('/users/interests/:user_id/:users', userController.deleteInterests);

router.delete('/users/:user_id',       adminController.removeUser);

/*-------------------------DASHBOARD------------------------*/
router.get('/viewTeamPlayGame', 			dashboardController.viewTeamPlayGame);
router.get('/viewCurrentGames', 			    dashboardController.viewCurrentGame);
router.get('/viewUpcomingGame', 			dashboardController.viewUpcomingGame);

/*----------------------------------------------------------*/
router.post		('/login',                       userController.login);
router.get 		('/logout',                 userController.logout);
router.post 	('/users',                  userController.registerUser);


//module.exports = (router) => {
router.post     ('/events',      			eventController.addEvent);
router.get      ('/events/:event_id', 		eventController.viewEvent);
router.get      ('/events',   				eventController.viewAllEvent);
router.put      ('/events',    				eventController.updateEvent);
router.delete   ('/events/:event_id',   	eventController.deleteEvent);
router.get 		('/events_teams',			eventController.getTeamsOfAllEvent);

router.get      ('/sponsors_get_id/:sponsor_name',	sponsorController.getSponsorId)
router.post     ('/sponsors',      sponsorController.addSponsor);
router.get      ('/sponsors/:sponsor_id', sponsorController.viewSponsor);
router.get      ('/sponsors',   sponsorController.viewAllSponsor);
router.put      ('/sponsors',    sponsorController.updateSponsor);
router.delete   ('/sponsors/:sponsor_id',    sponsorController.deleteSponsor);
router.post		('/sponsors_event',	sponsorController.sponsorEvent);
router.get 		('/sponsors_by_event/:event_id', sponsorController.viewSponsorByEvent);
router.post 	('/sponsors_from_event',	sponsorController.deleteSponsorFromEvent)

router.post     ('/teams',      	teamController.addTeam);
router.get      ('/teams/:team_id', teamController.viewTeam);
router.get      ('/teams',  	    teamController.viewAllTeam);
router.put      ('/teams',          teamController.updateTeam);
router.delete   ('/teams/:team_id', teamController.deleteTeam);
router.post		('/teams/join',	    teamController.userJoinTeam);
router.get      ('/teams_get_id/:team_name',			teamController.getTeamId);
router.post		('/teams/event',	teamController.teamJoinEvent);
router.get      ('/teams_per/:event_id', teamController.viewTeamPerEvent);
router.get 		('/teams/in_game/:game_id' 		,teamController.viewTeamsInGame); 
router.post 	('/teams_from_event',teamController.deleteTeamFromEvent);
router.put 		('/teams_status',	teamController.teamStatusUpdate);
router.put 		('/teams/player_status',	teamController.updateTeamPlayerStatus);
router.get 		('/teams/players/:team_id',	teamController.getTeamPlayers);

router.get      ('/sponsors_get_id/:sponsor_name',	sponsorController.getSponsorId)
router.post     ('/sponsors',      sponsorController.addSponsor);
router.get      ('/sponsors/:sponsor_id', sponsorController.viewSponsor);
router.get      ('/sponsors',   sponsorController.viewAllSponsor);
router.put      ('/sponsors',    sponsorController.updateSponsor);
router.delete   ('/sponsors/:sponsor_id',    sponsorController.deleteSponsor);
router.post		('/sponsors_event',	sponsorController.sponsorEvent);
router.get 		('/sponsors_by_event/:event_id', sponsorController.viewSponsorByEvent);
router.post 	('/sponsors_from_event',	sponsorController.deleteSponsorFromEvent)

router.post('/competitors',               adminController.addCompetitor);
router.get('/competitors/:game_id',  userController.viewAllCompetitors);
router.get('/competitors/:team_id',      userController.viewCompetitor);
router.put('/competitors/:team_id',    adminController.updateCompetitor);
router.delete('/competitors/:team_id', adminController.deleteCompetitor);

router.post('/game', 						gameController.addGame);
router.get('/game/:game_id',				gameController.viewGame);
router.get('/game', 						gameController.viewAllGames);
router.put('/game/:game_id', 				gameController.updateGame);
router.delete('/game/:game_id', 			gameController.deleteGame);
router.delete('/game', 						gameController.deleteAllGames);



router.post('/sport',						sportController.addSport);
router.post('/sport/:event_id',				sportController.attachSportToEvent);
router.post('/sport/:event_id/delete',	sportController.deleteSportFromEvent)

router.get('/sport/:sport_id',				sportController.viewSports);
router.get('/sport', 						sportController.viewAllSports);
router.put('/sport', 						sportController.updateSport);
router.delete('/sport/:sport_id', 			sportController.deleteSport);
router.delete('/sport', 					sportController.deleteAllSports);

router.post('/winner', 						winnerController.addWinner);
router.get('/winner/:game_id',				winnerController.viewWinner);
router.get('/winner', 						winnerController.viewAllWinners);
router.put('/winner/:game_id', 				winnerController.updateWinner);
router.delete('/winner/:game_id', 			winnerController.deleteWinner);
router.delete('/winner', 					winnerController.deleteAllWinners);

//additional

router.post('/teams/join/game',	    		teamController.teamPlayGame);
router.get('/teams/game/:team_id',			teamController.viewAvailableTeams)
router.post('/ranking/:sport_id', 			gameController.getRanking);
router.get('/overallranking/:event_id', 	gameController.getOverallRanking);
router.get('/events/:event_id/games', 	    gameController.viewGamesByEvent);
router.get('/events/:event_id/current_games', 	    gameController.viewCurrentGamesByEvent);
router.get('/events/:event_id/upcoming_games', 	    gameController.viewCurrentGamesByEvent);
router.post('/bet/:user_id', 				gameController.bet);
router.get('/bet/:user_id/:game_id', 		gameController.betStatus);
router.get('/scores/:game_id/:team_id', 	gameController.getScores);
router.post('/scores/update/:game_id', 	    gameController.updateScores);
router.get('/sport/event/:event_id', 		sportController.viewSportsByEvent);
router.get('/sport/event/view/:event_id', 	sportController.viewAvailableSports);
router.post('/game/sport/:sport_id', 		gameController.viewGamesBySport);
router.get('/schedule/:sport_id', 			gameController.viewScheds);
router.post('/leaderboard/:sport_id', 		gameController.viewLeaderboards);
router.get('/leaderboard/:sport_id', 		gameController.viewLeaderboards);
router.get('/venues', 						venueController.viewAllVenues);
router.get('/game/score/:event_id',			gameController.viewThreeScoreboard);

router.get('/user_loggedin', (req, res) => {
	if (req.session)
		res.send(req.session.userid);
	else
		res.send({});
});

router.get('/user_type_loggedin', (req, res) => {
    if (req.session)
        res.send(req.session.usertype);
    else
        res.send({});
});

router.get('/', (req,res)=>{
	res.sendFile('views/index.html',{root:__dirname+'/..'});
});

router.get('/403', (req,res)=>{
    res.sendFile('public/layouts/error-404.html',{root:__dirname+'/..'});
});

router.all('*', (req, res) => {
    res.status(404).send({message : 'Unmatched route. =(('});
});

module.exports = router;
