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



// router.post('/login',                       userController.login);
// router.get('/logout',                       userController.logout);
// router.post('/createUser',                  userController.registerUser);

// //authentication
// router.use(function(req, res, next){
//     if (req.session && req.session.accountid)
//         next();
//     else
//         res.redirect('/login');
// })


router.get('/', (req,res)=>{

	res.sendFile('views/index.html',{root:__dirname+'/..'});
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


router.all('*', (req, res) => {
    res.status(404).send({message : 'Unmatched route. =(('});


});

module.exports = router;

 //   return router;
// };
