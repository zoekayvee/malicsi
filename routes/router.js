'use strict';

//var path = require('path');

const eventController =require('../services/event.services');


const express = require('express');
const router = express.Router();

//module.exports = (router) => {
router.post     ('/event',      eventController.addEvent); 
router.get      ('/event/:event_id', eventController.viewEvent);
router.get      ('/event',   eventController.viewAllEvent);
router.put      ('/event',    eventController.updateEvent);
router.delete   ('/event/:event_id',    eventController.deleteEvent);



router.get('/', (req,res)=>{

	res.sendFile('views/index.html',{root:__dirname+'/..'});
});


router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'

    });
});

 //    return router;
// };
// router.get('/', (req, res, next) => {
//     res.sendFile('views/index.html',{root:__dirname+'/..'});
// });

// router.all('*', (req, res, next) => {
//     res.sendFile('index.html',{root:__dirname+'/..'});
// });
//


module.exports = router;

 //   return router;
// };
