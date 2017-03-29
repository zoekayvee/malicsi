'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const gameController =require('../services/game.service');
const winnerController =require('../services/winner.service');
const sportController =require('../services/sport.service');    

const express = require('express');
const router = express.Router();

router.get('/login', (req,res)=>{
	res.sendFile('views/landing.html',{root:__dirname+'/..'});
})
router.post('/login',                       userController.login);
router.get('/logout',                       userController.logout);
router.post('/addUser',                  userController.registerUser);

 //authentication
/*router.use(function(req, res, next){
     if (req.session && req.session.accountid)
         next();
     else
         res.redirect('/login');
})*/
router.get('/viewProfile',function(req,res){
    res.sendFile('views/user-profile.html',{root:__dirname+'/..'});
});
router.post('/viewProfile',                  userController.viewProfile);
router.get('/viewAllUsers',                 adminController.viewAllUsers);
router.get('/viewUser/:user_id',            userController.viewUser);
router.put('/updateUser/:user_id',          adminController.updateUser);
router.delete('/deleteUser/:user_id',       adminController.removeUser);

router.post('/userJoinsTeam',               userController.userJoinsTeam);
  
router.get('/viewLog',function(req,res){
    res.sendFile('views/user-activity-log.html',{root:__dirname+'/..'});
});
router.post('/viewLog',adminController.viewLogs); 


router.post('/addCompetitor',               adminController.addCompetitor);
router.get('/viewAllCompetitors/:game_id',  userController.viewAllCompetitors);
router.get('/viewCompetitor/:team_id',      userController.viewCompetitor);
router.put('/updateCompetitor/:team_id',    adminController.updateCompetitor); //event creator
router.delete('/deleteCompetitor/:team_id', adminController.deleteCompetitor);

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

router.get('/loggedIn', (req, res) => {
	if (req.session)
		res.send(req.session.userid);
	else
		res.send({});
});

router.get('/', (req,res)=>{
	res.sendFile('views/index.html',{root:__dirname+'/..'});
})

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    })
});

module.exports = router;
