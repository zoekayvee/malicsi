'use strict';

<<<<<<< HEAD
const adminController =require('../backend/controllers/admin.controller');
const userController =require('../backend/controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/login',                       userController.login);
router.get('/logout',                       userController.logout);
router.post('/createUser',                  userController.registerUser);

//authentication
router.use(function(req, res, next){
    if (req.session && req.session.accountid)
        next();
    else
        res.redirect('/login');
})

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

router.get('/', (req,res)=>{
	//res.sendFile('views/index.html',{root:__dirname+'/..'});
	res.send({message: "Home page"});
})
//insert here the name of route for the given controller req,res function (so ideally controller muna gagalawin)
=======
// var path = require('path');
// const controller = require(__dirname + '/../backend/controller/controller');

// var path = require('path')
const gameController =require('../service/game.service');
const winnerController =require('../service/winner.service');
const sportController =require('../service/sport.service');    
const express = require('express');
const router = express.Router();


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
>>>>>>> 5a6394d17c265f7ef6d52968c0ac5749adbb4d4a

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    });
<<<<<<< HEAD
=======
//     return router;
// };
>>>>>>> 5a6394d17c265f7ef6d52968c0ac5749adbb4d4a
});

module.exports = router;

<<<<<<< HEAD
=======
    // return router;
// };
>>>>>>> 5a6394d17c265f7ef6d52968c0ac5749adbb4d4a
