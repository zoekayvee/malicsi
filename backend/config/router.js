'use strict';
var path = require('path')
const controller = require(__dirname + '/../controllers/controller');

module.exports = (router) => {
    router.post('/login', 			controller.login);
    router.get('/logout',			controller.logout);
    router.post('/insert_user', 	controller.registerUser);

    //insert here the name of route for the given controller req,res function (so ideally controller muna gagalawin)

    router.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Not Found!'
        });
    });

    return router;
};