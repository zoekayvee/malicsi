'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const gameController =require('../services/game.service');
const winnerController =require('../services/winner.service');
const sportController =require('../services/sport.service');    
const eventController =require('../services/event.services');
const teamController = require('../services/team.services');
const sponsorController = require('../services/sponsor.services');
// const dashboardController =require('../services/dashboard.service');


var path = require('path');
const express = require('express');
const router = express.Router();

/*-------------------------DASHBOARD------------------------*/
// router.get('/viewTeamPlayGame', 			dashboardController.viewTeamPlayGame);
// router.get('/viewCurrentGames', 			    dashboardController.viewCurrentGame);
// router.get('/viewUpcomingGame', 			dashboardController.viewUpcomingGame);

/*----------------------------------------------------------*/
router.post		('/',                       userController.login);
router.get 		('/logout',                 userController.logout);
router.post 	('/users',                  userController.registerUser);


//module.exports = (router) => {
router.post     ('/events',      			eventController.addEvent);
router.get      ('/events/:event_id', 		eventController.viewEvent);
router.get      ('/events',   				eventController.viewAllEvent);
router.put      ('/events',    				eventController.updateEvent);
router.delete   ('/events/:event_id',   	eventController.deleteEvent);

router.post     ('/teams',      			teamController.addTeam);
router.get      ('/teams/:team_id', 		teamController.viewTeam);
router.get      ('/teams',   				teamController.viewAllTeam);
router.put      ('/teams',    				teamController.updateTeam);
router.delete   ('/teams/:team_id',    		teamController.deleteTeam);

router.post     ('/sponsors',      			sponsorController.addSponsor);
router.get      ('/sponsors/:sponsor_id', 	sponsorController.viewSponsor);
router.get      ('/sponsors',   			sponsorController.viewAllSponsor);
router.put      ('/sponsors',    			sponsorController.updateSponsor);
router.delete   ('/sponsors/:sponsor_id',   sponsorController.deleteSponsor);

router.get 		('/users',                 	adminController.viewAllUsers);
router.get 		('/users/:user_id',         userController.viewUser);
router.put 		('/users/:user_id',         adminController.updateUser);
router.delete 	('/users/:user_id',       	adminController.removeUser);
router.post 	('/user_team',              userController.userJoinsTeam);
router.get 		('/logs',                   adminController.viewLogs);

router.post		('/sports', 				sportController.addSport);
router.get 		('/sports/:sport_id', 		sportController.viewSports);
router.get 		('/sports', 				sportController.viewAllSports);
router.put 		('/sport', 					sportController.updateSport);
router.delete 	('/sport/:sport_id', 		sportController.deleteSport);
router.delete 	('/sports', 				sportController.deleteAllSports);

// //authentication
// router.use(function(req, res, next){
//     if (req.session && req.session.accountid)
//         next();
//     else
//         res.redirect('/login');
// })


router.post('/addCompetitor',               adminController.addCompetitor);
router.get('/viewAllCompetitors/:game_id',  userController.viewAllCompetitors);
router.get('/viewCompetitor/:team_id',      userController.viewCompetitor);
router.put('/updateCompetitor/:team_id',    adminController.updateCompetitor);
router.delete('/deleteCompetitor/:team_id', adminController.deleteCompetitor);

router.post('/game', 						gameController.addGame);
router.get('/game/:game_id',				gameController.viewGame);
router.get('/game', 						gameController.viewAllGames);
router.put('/game/:game_id', 				gameController.updateGame);
router.delete('/game/:game_id', 			gameController.deleteGame);
router.delete('/game', 						gameController.deleteAllGames);

router.post('/sport/:event_id',				sportController.addSport);
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
router.post('/ranking/:sport_id', 					gameController.getRanking);
router.post('/bet/:user_id', 						gameController.bet);
router.get('/bet/:user_id/:game_id', 						gameController.betStatus);
router.get('/scores/:game_id/:team_id', 						gameController.getScores);
router.get('/sport/event/:event_id', 		sportController.viewSportsByEvent);
router.post('/game/sport/:sport_id', 		gameController.viewGamesBySport);
router.get('/schedule/:sport_id', 		gameController.viewScheds);
router.get('/leaderboard/:sport_id', 		gameController.viewLeaderboards);

router.post('/competitors',               adminController.addCompetitor);
router.get('/competitors/:game_id',  userController.viewAllCompetitors);
router.get('/competitors/:team_id',      userController.viewCompetitor);
router.put('/competitors/:team_id',    adminController.updateCompetitor);
router.delete('/competitors/:team_id', adminController.deleteCompetitor);

router.post('/addGame', gameController.addGame);//
router.get('/viewGame/:game_id', gameController.viewGame);
router.get('/viewAllGames', gameController.viewAllGames);;//
router.put('/updateGame/:game_id', gameController.updateGame);
router.delete('/deleteGame/:game_id', gameController.deleteGame);
router.delete('/deleteAllGames', gameController.deleteAllGames);//


router.post('/addWinner', winnerController.addWinner);
router.get('/viewWinner/:game_id', winnerController.viewWinner);
router.get('/viewAllWinners', winnerController.viewAllWinners);
router.put('/updateWinner/:game_id', winnerController.updateWinner);
router.delete('/deleteWinner/:game_id', winnerController.deleteWinner);
router.delete('/deleteAllWinners', winnerController.deleteAllWinners);

// router.get('/', (req, res, next) => {
//     res.sendFile('views/index.html',{root:__dirname+'/..'});
// });

// router.all('*', (req, res, next) => {
//     res.sendFile('index.html',{root:__dirname+'/..'});
// });
//

router.get('/loggedIn', (req, res) => {
	if (req.session)
		res.send(req.session.userid);
	else
		res.send({});
});

router.get('/', (req,res)=>{
	res.sendFile('views/index.html',{root:__dirname+'/..'});
});

router.all('*', (req, res) => {
    res.status(404).send({message : 'Unmatched route. =(('});
});

module.exports = router;
