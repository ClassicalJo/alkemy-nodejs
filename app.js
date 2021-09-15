var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var auth0 = require('./authentication/auth0')
var authenticate = require('./authentication/middleware');

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
app.use(authenticate)


app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated())
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

module.exports = app;
