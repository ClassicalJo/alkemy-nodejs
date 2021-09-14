var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var auth0 = jwt({
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

module.exports = auth0
