'use strict'

var path = require('path');
var express = require('express');
var router = require('./routes/router');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'useless',
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(__dirname+'/public'));
// app.use(express.static('public'));
app.use(express.static(__dirname+'/app'));
app.use(router);

app.listen(3000);
console.log('Server running...')
