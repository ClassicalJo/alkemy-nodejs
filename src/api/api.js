var express = require('express');
var jwtCheck = require('./middleware/jwtCheck')
var routeCharacters = require('./routes/characters')
var routeMovies = require('./routes/movies')
var logger = require('morgan')

var port = process.env.PORT || 8080;
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var sequelize = require('./sequelize/index');
sequelize.authenticate()
    .then(() => console.log('Sequelize succesfully connected to the PostgreSQL database'))
    .catch(err => console.error('Sequelize failed to connect to the PostgreSQL database', err))


app.use(jwtCheck);
app.use('/characters', routeCharacters)
app.use('/movies', routeMovies)

app.get('/authorized', function (req, res) {
    res.sendStatus(200)
});


app.listen(port);
