'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const gameController =require('../services/game.service');
const winnerController =require('../services/winner.service');
const sportController =require('../services/sport.service');    

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
router.put('/updateCompetitor/:team_id',    adminController.updateCompetitor); //event creator
router.delete('/deleteCompetitor/:team_id', adminController.deleteCompetitor);

router.post('/game', 						gameController.addGame);//
//router.get('/game/:sport_id',				gameController.viewGameBySportId);
router.get('/game/:game_id',				gameController.viewGame);
router.get('/game', 						gameController.viewAllGames);;//
router.put('/game/:game_id', 				gameController.updateGame);
router.delete('/game/:game_id', 			gameController.deleteGame);
router.delete('/game', 						gameController.deleteAllGames);//

router.post('/sport',						sportController.addSport);
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


router.get('/viewScheds/:sport_id', gameController.viewScheds);

// router.get('/', (req,res)=>{
// 	res.sendFile('views/layout/user-game-sched.html',{root:__dirname+'/..'});
// })

router.get('/sample', (req,res)=>{
	res.sendFile('views/layout/user-game-sched.html',{root:__dirname+'/..'});
})

router.get('/', (req,res)=>{
	res.sendFile('views/index.html',{root:__dirname+'/..'});
})
// module.exports = (router) => {
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

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    })
});

module.exports = router;
