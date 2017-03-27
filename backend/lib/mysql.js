'use strict';

const mysql  = require('mysql');
<<<<<<< HEAD
const config = require(__dirname + '/../../db-connections.js');
=======
const config = require(__dirname + '/../config/config');
>>>>>>> 6f2cce2764e1a72460c89b94cc4a6b0e3e3f4b2c

const PROJECT = 'malicsi';

module.exports = mysql.createConnection({
    host     : config[PROJECT].host,
    user     : config[PROJECT].user,
    password : config[PROJECT].password,
    database : config[PROJECT].database
});