var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //morgan provide logging facility
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');  //This module is used to convert file in json format
var mongoose = require('mongoose');
var fs = require('fs');
var expressValidator = require('express-validator');
var session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');         //passport is aunthentication module 
var flash = require('connect-flash'); //flash is used to provide messages/alert box
var emitter = require('events').EventEmitter;
var mongourl = 'mongodb://localhost/employee';

mongoose.Promise = global.Promise;

mongoose.connect(mongourl)
.then(() => console.log('Connection Successful'))
.catch((err) => console.error(err));

var admin = require('./routes/admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', admin);

app.use(expressValidator());
app.use(flash());

module.exports = app;