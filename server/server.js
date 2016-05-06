var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./modules/database');


var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
app.use(database.sendHeaders);
app.get('/session', database.getSession);
app.get('/user:id', database.getUser);
app.get('/login/:password/:email', database.auth);
app.post('/user', database.createUser);
app.put('/user', database.updateUser);
app.put('/member', database.editMember);
app.delete('/user', database.deleteUsers);
*/

module.exports = app;