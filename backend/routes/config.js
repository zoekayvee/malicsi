'use strict';
const path 	= require('path');

const config =  {
	PORT: 3000,
	IP: '127.0.0.1',


    malicsi: {
        host: 'localhost',
        user: 'root',
        password: 'a5390040597', //change according to your db password
        database: 'malicsiDB'
    },

    COOKIE_SECRET: '1LUVMALICSI'
}

module.exports = config;