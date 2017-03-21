'use strict';
var path = require('path')
const controller = require(__dirname + '/../controllers/controller');

module.exports = (router) => {
    router.post('/login', 			controller.login);
    router.get('/logout',			controller.logout);
    router.post('/insert_user',     controller.registerUser);
    router.delete('/remove_user',     controller.removeUser);
    router.put('/update_user',     controller.updateUser);
    router.get('/view_users', 	    controller.viewUsers);
    router.get('/get_user/:user_id',         controller.getUser);
    router.post('/user_joins_team', controller.userJoinsTeam);
    router.get('/get_competitors',  controller.getCompetitors);

    //insert here the name of route for the given controller req,res function (so ideally controller muna gagalawin)

    router.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Not Found!'
        });
    });

    return router;
};
