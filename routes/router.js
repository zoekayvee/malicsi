'use strict';

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

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    });
//     return router;
// };
});

module.exports = router;

    // return router;
// };
