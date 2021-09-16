var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
// var guard = require('express-jwt-permissions')()
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

app.get('/authorized',function (req, res) {
    res.json({ jwtCheck: "You got to the jwtCheck" })
});

app.listen(port);
