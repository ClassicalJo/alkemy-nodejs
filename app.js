var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 5500
var logger = require('morgan');
var auth0 = require('./authentication/auth0')
var guard = require('express-jwt-permissions')()

var authRouter = require('./routes/auth')
var charactersRouter = require('./routes/characters')
var moviesRouter = require('./routes/movies')

var sequelize = require('./sequelize/index');
const authenticate = require('./authentication/middleware');


sequelize.authenticate()
    .then(() => console.log('success'))
    .catch(err => console.error('fail', err))
var app = express();
var http = require('http')
app.set('port', port)

var server = http.createServer(app)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(auth0)
// app.use(authenticate)

app.use('/characters', charactersRouter)
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    console.log('getting / ')
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

server.listen(port)

module.exports = app
