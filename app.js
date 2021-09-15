var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var auth0 = require('./authentication/auth0')
var guard = require('express-jwt-permissions')()

var authRouter = require('./routes/auth')
var charactersRouter = require('./routes/characters')
var moviesRouter = require('./routes/movies')

var sequelize = require('./sequelize/index');


sequelize.authenticate()
    .then(() => console.log('success'))
    .catch(err => console.error('fail', err))
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth0)

app.use('/characters', charactersRouter)
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)

module.exports = app;
