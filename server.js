'use strict'

const express = require('express');
const router = require(__dirname + '/backend/config/router');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'useless',
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/app'));
app.use(router(express.Router()));

//di ko alam kung magiging userful 'to sa future lol
//app.use(router);
//app.use(require('method-override')());
//app.use(require('compression')());
//app.use('/', express.static(__dirname + '/../frontend'));

app.listen(3000);
console.log('Server running on PORT 3000...')