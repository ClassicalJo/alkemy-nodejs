var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI
    }),
    audience: 'https://alkemy-nodejs.com',
    issuer: process.env.JWKS_ISSUER,
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.status(200)
});
app.get('/characters', function (req, res) {
    //PERFORM THE QUERY TO THE PG SERVER
    res.status(200)
});
app.get('/movies', function (req, res) {
    //PERFORM THE QUERY TO THE PG SERVER
    res.status(200)
});
app.listen(port);
