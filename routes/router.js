'use strict';

//var path = require('path');

const eventController =require('../services/event.services');
const teamController = require('../services/team.services')
const sponsorController = require('../services/sponsor.services')


const express = require('express');
const router = express.Router();

//module.exports = (router) => {

router.post     ('/events',      			eventController.addEvent); 
router.get      ('/events/:event_id', 		eventController.viewEvent);
router.get      ('/events',   				eventController.viewAllEvent);
router.put      ('/events',    				eventController.updateEvent);
router.delete   ('/events/:event_id',   	eventController.deleteEvent);

router.post     ('/teams',      			teamController.addTeam); 
router.get      ('/teams/:team_id', 		teamController.viewTeam);
router.get      ('/teams',   				teamController.viewAllTeam);
router.put      ('/teams',    				teamController.updateTeam);
router.delete   ('/teams/:team_id',    		teamController.deleteTeam);

router.post     ('/sponsors',      			sponsorController.addSponsor); 
router.get      ('/sponsors/:sponsor_id', 	sponsorController.viewSponsor);
router.get      ('/sponsors',   			sponsorController.viewAllSponsor);
router.put      ('/sponsors',    			sponsorController.updateSponsor);
router.delete   ('/sponsors/:sponsor_id',   sponsorController.deleteSponsor);



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


router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'

    });
});

module.exports = router;