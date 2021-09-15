var { auth } = require('express-openid-connect')
let { AUTH0_ISSUER, AUTH0_BASE_URL, AUTH0_CLIENT_ID, AUTH0_SECRET } = process.env

let authenticate = auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: AUTH0_BASE_URL,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_ISSUER,
    secret: AUTH0_SECRET,
})

module.exports = authenticate
