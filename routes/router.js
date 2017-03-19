'use strict';
var path = require('path')
const controller = require(__dirname + '/../backend/controller/controller');

module.exports = (router) => {
    router.post('/addGame', controller.addGame);
    router.get('/viewGame/:id', controller.viewGame);
    router.get('/viewAllGames', controller.viewAllGames);
    router.post('/updateGame', controller.updateGame);
    router.delete('/deleteGame/:id', controller.deleteGame);
    router.delete('/deleteAllGames', controller.deleteAllGames);

    router.post('/addSport', controller.addSport);
    router.get('/viewSports/:id', controller.viewSports);
    router.get('/viewAllSports', controller.viewAllSports);
    router.post('/updateSport', controller.updateSport);
    router.delete('/deleteSport/:id', controller.deleteSport);
    router.delete('/deleteAllSports', controller.deleteAllSports);

    router.post('/addWinner', controller.addWinner);
    router.get('/viewWinner/:id', controller.viewWinner);
    router.get('/viewAllWinners', controller.viewAllWinners);
    router.post('/updateWinner', controller.updateWinner);
    router.delete('/deleteWinner/:id', controller.deleteWinner);
    router.delete('/deleteAllWinners', controller.deleteAllWinners);

    router.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Not Found!'
        });
    });

    return router;
};