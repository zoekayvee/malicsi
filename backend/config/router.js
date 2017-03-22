'use strict';
var path = require('path')
const controller = require(__dirname + '/../controllers/controller');

module.exports = (router) => {
    router.post('/login',                       controller.login);
    router.get('/logout',                       controller.logout);

    router.post('/createUser',                  controller.registerUser);
    router.get('/viewAllUsers',                 controller.viewAllUsers);
    router.get('/viewUser/:user_id',            controller.viewUser);
     router.put('/updateUser/:user_id',         controller.updateUser);
    router.get('/viewAllUsers',                 controller.viewAllUsers);
    router.get('/viewUser/:user_id',            controller.viewUser);
    router.delete('/deleteUser/:user_id',       controller.removeUser);
    
    router.post('/userJoinsTeam',               controller.userJoinsTeam);
    router.get('/viewLog',                      controller.viewLogs);

    router.post('/addCompetitor',               controller.addCompetitor);
    router.get('/viewAllCompetitors/:game_id',  controller.viewAllCompetitors);
    router.get('/viewCompetitor/:team_id',      controller.viewCompetitor);
    router.put('/updateCompetitor/:team_id',    controller.updateCompetitor);
    router.delete('/deleteCompetitor/:team_id', controller.deleteCompetitor);
    //insert here the name of route for the given controller req,res function (so ideally controller muna gagalawin)

    router.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Not Found!'
        });
    });

    return router;
};
