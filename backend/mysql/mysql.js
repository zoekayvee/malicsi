'use strict';
 
const mysql  = require('mysql');
const config = require(__dirname + '/../config/config');

const info = 'info';

module.exports = mysql.createConnection({
    host     : config[info].host,
    user     : config[info].user,
    password : config[info].password,
    database : config[info].database
});