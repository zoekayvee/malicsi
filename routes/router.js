'use strict';

const adminController =require('../backend/controllers/admin.controller');
const userController =require('../backend/controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/login',                       userController.login);
router.get('/logout',                       userController.logout);
router.post('/createUser',                  userController.registerUser);

router.get('/viewAllUsers',                 adminController.viewAllUsers);
router.get('/viewUser/:user_id',            userController.viewUser);
router.put('/updateUser/:user_id',          adminController.updateUser);
router.delete('/deleteUser/:user_id',       adminController.removeUser);

router.post('/userJoinsTeam',               userController.userJoinsTeam);
router.get('/viewLog',                      adminController.viewLogs);

router.post('/addCompetitor',               adminController.addCompetitor);
router.get('/viewAllCompetitors/:game_id',  userController.viewAllCompetitors);
router.get('/viewCompetitor/:team_id',      userController.viewCompetitor);
router.put('/updateCompetitor/:team_id',    adminController.updateCompetitor); //event creator
router.delete('/deleteCompetitor/:team_id', adminController.deleteCompetitor);

//insert here the name of route for the given controller req,res function (so ideally controller muna gagalawin)

router.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    });
});
module.exports = router;

