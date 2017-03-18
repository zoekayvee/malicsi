'use strict';
var path = require('path')
const controller = require(__dirname + '/../controllers/controller');
module.exports = (router) => {
    router.post     ('/addEvent',       controller.addEvent);
    router.get      ('/viewEvent/:event_id', controller.viewEvent);
    router.get      ('/viewAllEvent',   controller.viewAllEvent);
    router.put      ('/updateEvent',    controller.updateEvent);
    router.delete   ('/deleteEvent/:event_id',    controller.deleteEvent);
    router.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Hi guys, backend basics'
        });
    });

    return router;
};