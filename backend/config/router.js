'use strict';
var path = require('path')
const controller = require(__dirname + '/../controllers/controller');

module.exports = (router) => {
    router.post('/login', 			controller.login);
    router.get('/logout',			controller.logout);
    router.post('/insert_user',     controller.registerUser);
    router.post('/remove_user',     controller.removeUser);
    router.post('/update_user',     controller.updateUser);
    router.post('/view_users', 	    controller.viewUsers);
    router.get('/get_user',         controller.getUser);
    router.post('/user_joins_team', controller.userJoinsTeam);
    router.post('/get_competitors',  controller.getCompetitors);

    //insert here the name of route for the given controller req,res function (so ideally controller muna gagalawin)

    router.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Not Found!'
        });
    });

    return router;
};
