'use strict';

//var path = require('path');

const eventController =require('../services/event.services');
const teamController =require('../services/team.services');
const sponsorController =require('../services/sponsor.services');
const express = require('express');
const router = express.Router();

//module.exports = (router) => {
router.post     ('/addEvent',      eventController.addEvent); 
router.get      ('/viewEvent/:event_id', eventController.viewEvent);
router.get      ('/viewAllEvent',   eventController.viewAllEvent);
router.put      ('/updateEvent',    eventController.updateEvent);
router.delete   ('/deleteEvent/:event_id',    eventController.deleteEvent);
router.post     ('/addTeam',       teamController.addTeam);
router.get      ('/viewTeam/:team_id', teamController.viewTeam);
router.get      ('/viewAllTeam',   teamController.viewAllTeam);
router.put      ('/updateTeam',     teamController.updateTeam);
router.delete   ('/deleteTeam/:team_id', teamController.deleteTeam);
router.post     ('/teamJoinEvent',  teamController.teamJoinEvent);
router.post     ('/teamPlayGame',   teamController.teamPlayGame);
router.post     ('/addSponsor',       sponsorController.addSponsor);
router.get      ('/viewAllSponsor',   sponsorController.viewAllSponsors);
router.get      ('/viewSponsor/:sponsor_id',    sponsorController.viewSponsor);
router.put      ('/updateSponsor',     sponsorController.updateSponsor);
router.delete   ('/deleteSponsor/:sponsor_id',      sponsorController.deleteSponsor);
router.get      ('/viewSponsorByEvent/:event_id',   sponsorController.viewSponsorByEvent)
router.post     ('/sponsorEvent',   sponsorController.sponsorEvent); 
router.get('/', (req,res)=>{
	res.sendFile('views/landing.html',{root:__dirname+'/..'});
})

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    });
 //    return router;
// };
});

module.exports = router;

 //   return router;
// };
