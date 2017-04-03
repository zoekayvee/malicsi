'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const gameController =require('../services/game.service');
const winnerController =require('../services/winner.service');
const sportController =require('../services/sport.service');    
const eventController =require('../services/event.services');
const teamController = require('../services/team.services');
const sponsorController = require('../services/sponsor.services');

const express = require('express');
const router = express.Router();

// router.post('/login',                       userController.login);
// router.get('/logout',                       userController.logout);
// router.post('/createUser',                  userController.registerUser);

// //authentication
// router.use(function(req, res, next){
//     if (req.session && req.session.accountid)
//         next();
//     else
//         res.redirect('/login');
// })

router.get('/viewAllUsers',                 adminController.viewAllUsers);
router.get('/viewUser/:user_id',            userController.viewUser);
router.put('/updateUser/:user_id',          adminController.updateUser);
router.delete('/deleteUser/:user_id',       adminController.removeUser);

router.post('/userJoinsTeam',               userController.userJoinsTeam);
router.get('/viewLog',                      adminController.viewLogs);

router.post('/addCompetitor',               adminController.addCompetitor);
router.get('/viewAllCompetitors/:game_id',  userController.viewAllCompetitors);
router.get('/viewCompetitor/:team_id',      userController.viewCompetitor);
router.put('/updateCompetitor/:team_id',    adminController.updateCompetitor);
router.delete('/deleteCompetitor/:team_id', adminController.deleteCompetitor);

router.post('/game', 						gameController.addGame);
router.get('/game/:game_id',				gameController.viewGame);
router.get('/game', 						gameController.viewAllGames);;
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

router.post     ('/events',      eventController.addEvent); 
router.get      ('/events/:event_id', eventController.viewEvent);
router.get      ('/events',   eventController.viewAllEvent);
router.put      ('/events',    eventController.updateEvent);
router.delete   ('/events/:event_id',    eventController.deleteEvent);

router.post     ('/teams',      eventController.addEvent); 
router.get      ('/teams/:team_id', eventController.viewEvent);
router.get      ('/teams',   eventController.viewAllEvent);
router.put      ('/teams',    eventController.updateEvent);
router.delete   ('/teams/:team_id',    eventController.deleteEvent);

router.post     ('/sponsors',      eventController.addEvent); 
router.get      ('/sponsors/:sponsor_id', eventController.viewEvent);
router.get      ('/sponsors',   eventController.viewAllEvent);
router.put      ('/sponsors',    eventController.updateEvent);
router.delete   ('/sponsors/:sponsor_id',    eventController.deleteEvent);

//additional
router.get('/bet', 		gameController.bet);
router.get('/sport/event/:event_id', 		sportController.viewSportsByEvent);
router.post('/game/sport/:sport_id', 		gameController.viewGamesBySport);
router.get('/schedule/:sport_id', 		gameController.viewScheds);
router.get('/leaderboard/:sport_id', 		gameController.viewLeaderboards);

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    })
});

module.exports = router;
