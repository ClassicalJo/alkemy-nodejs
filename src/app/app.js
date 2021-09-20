var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth')
var charactersRouter = require('./routes/characters')
var moviesRouter = require('./routes/movies')
var indexRouter = require('./routes/index')

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
