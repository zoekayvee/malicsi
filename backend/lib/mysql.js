'use strict';
 
const mysql  = require('mysql');
const config = require(__dirname + '/../config/config');

const ENV = '127';

module.exports = mysql.createConnection({
    host     : config[ENV].host,
    user     : config[ENV].user,
    password : config[ENV].password,
    database : config[ENV].database
});