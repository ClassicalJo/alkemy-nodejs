var express = require('express');
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
var session = require('express-session')
var sessionConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: true
    },
    resave: false,
    saveUninitialized: true,
}
var passport = require('passport')
var Auth0Strategy = require("passport-auth0")
var strategy = new Auth0Strategy({
    domain: process.env.AUTH0_ISSUER,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_SECRET,
    callbackURL: 'http://localhost:5500/callback'
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    })

app.use(session(sessionConfig))
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/characters', charactersRouter)
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)
app.use('/', indexRouter)


module.exports = app
