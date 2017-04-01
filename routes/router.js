'use strict';

//var path = require('path');

const eventController =require('../services/event.services');
const teamController = require('../services/team.services');
const sponsorController = require('../services/sponsor.services');


const express = require('express');
const router = express.Router();

//module.exports = (router) => {
router.post     ('/events',      eventController.addEvent); 
router.get      ('/events/:event_id', eventController.viewEvent);
router.get      ('/events',   eventController.viewAllEvent);
router.put      ('/events',    eventController.updateEvent);
router.delete   ('/events/:event_id',    eventController.deleteEvent);

router.post     ('/teams',      eventController.addEvent); 
router.get      ('/teams/:team_id', eventController.viewEvent);
router.get      ('/teams',   eventController.viewAllEvent);
router.put      ('/teams',    eventController.updateEvent);
router.delete   ('/teams/:team_id',    eventController.deleteEvent);

router.post     ('/sponsors',      eventController.addEvent); 
router.get      ('/sponsors/:sponsor_id', eventController.viewEvent);
router.get      ('/sponsors',   eventController.viewAllEvent);
router.put      ('/sponsors',    eventController.updateEvent);
router.delete   ('/sponsors/:sponsor_id',    eventController.deleteEvent);


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

router.all('*', (req, res) => {
    res.status(404).send({message : 'Unmatched route. =(('});
});

module.exports = router;