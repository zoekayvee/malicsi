'use strict';

const adminController =require('../services/admin.service');
const userController =require('../services/user.service');
const eventController =require('../services/event.services');
// const gameController =require('../services/game.service');
// const winnerController =require('../services/winner.service');
// const sportController =require('../services/sport.service');

const express = require('express');
const router = express.Router();

router.post('/login',                       userController.login);
router.get('/logout',                       userController.logout);
router.post('/users',                  userController.registerUser);

//authentication
/*router.use(function(req, res, next){
     if (req.usertype && req.session.userid)
         next();
     else
         res.redirect('/#!/');
 })
*/
router.get('/users',                 adminController.viewAllUsers);
router.get('/users/:user_id',            userController.viewUser);
router.put('/users/:user_id',          adminController.updateUser);
router.delete('/users/:user_id',       adminController.removeUser);

router.post('/user_team',               userController.userJoinsTeam);
router.get('/logs',                      adminController.viewLogs);

router.post('/competitors',               adminController.addCompetitor);
router.get('/competitors/:game_id',  userController.viewAllCompetitors); 
router.get('/competitors/:team_id',      userController.viewCompetitor);
router.put('/competitors/:team_id',    adminController.updateCompetitor);
router.delete('/competitors/:team_id', adminController.deleteCompetitor);

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

router.get('/user_loggedin', (req, res) => {
	if (req.session)
		res.send(req.session.userid);
	else
		res.send({});
});


// router.get('/', (req,res)=>{

// 	res.sendFile('views/index.html',{root:__dirname+'/..'});
// });


router.all('*', (req, res) => {
    res.status(404).send({message : 'Unmatched route. =(('});
});

module.exports = router;