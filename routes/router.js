'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const gameController =require('../services/game.service');
const winnerController =require('../services/winner.service');
const sportController =require('../services/sport.service');
const dashboardController =require('../services/dashboard.service');

const express = require('express');
const router = express.Router();

/*-------------------------DASHBOARD------------------------*/
router.get('/viewTeamPlayGame', 			dashboardController.viewTeamPlayGame);
router.get('/viewCurrentGames', 			    dashboardController.viewCurrentGame);
router.get('/viewUpcomingGame', 			dashboardController.viewUpcomingGame);

/*----------------------------------------------------------*/
router.post('/',                       		userController.login);
router.get('/logout',                       userController.logout);
router.post('/users',                  userController.registerUser);


// //authentication
// router.use(function(req, res, next){
//     if (req.session && req.session.accountid)
//         next();
//     else
//         res.redirect('/login');
// })

router.get('/users',                 adminController.viewAllUsers);
router.get('/users/:user_id',            userController.viewUser);
router.put('/users/:user_id',          adminController.updateUser);
router.delete('/users/:user_id',       adminController.removeUser);

router.post('/user_team',               userController.userJoinsTeam);
router.get('/logs',                      adminController.viewLogs);


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

router.post('/addSport', sportController.addSport);
router.get('/viewSports/:sport_id', sportController.viewSports);
router.get('/viewAllSports', sportController.viewAllSports);
router.put('/updateSport', sportController.updateSport);
router.delete('/deleteSport/:sport_id', sportController.deleteSport);
router.delete('/deleteAllSports', sportController.deleteAllSports);

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

router.all('*', (req, res) => {
    res.status(404).send({message : 'Unmatched route. =(('});
});

module.exports = router;
