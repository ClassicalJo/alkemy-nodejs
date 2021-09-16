var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth')
var charactersRouter = require('./routes/characters')
var moviesRouter = require('./routes/movies')
var indexRouter = require('./routes/index')

var sequelize = require('./sequelize/index');

sequelize.authenticate()
    .then(() => console.log('success'))
    .catch(err => console.error('fail', err))

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/characters', charactersRouter)
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)
app.use('/', indexRouter)

module.exports = app
