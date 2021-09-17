var express = require('express');
var jwtCheck = require('./middleware/jwtCheck')
var routeCharacters = require('./routes/characters')
var port = process.env.PORT || 8080;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var sequelize = require('./sequelize/index');
sequelize.authenticate()
    .then(() => console.log('Sequelize succesfully connected to the PostgreSQL database'))
    .catch(err => console.error('Sequelize failed to connect to the PostgreSQL database', err))


app.use(jwtCheck);
app.use('/characters', routeCharacters)
app.get('/authorized', function (req, res) {
    res.sendStatus(200)
});

app.get('/movies', function (req, res) {
    //PERFORM THE QUERY TO THE PG SERVER
    res.json({ movies: "all the movies" })
});
app.listen(port);
