'use strict';

const mysql  = require('mysql');
const config = require(__dirname + '/../config/config');

const PROJECT = 'malicsi';

module.exports = mysql.createConnection({
    host     : config[PROJECT].host,
    user     : config[PROJECT].user,
    password : config[PROJECT].password,
    database : config[PROJECT].database
});