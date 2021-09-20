var express = require('express')
var router = express.Router()
let { AUTH0_STATE, AUTH0_ISSUER, AUTH0_CLIENT_ID } = process.env
let { challenge } = require('../auth/verifier')

let middleware = (req, res, next) => {
    let url = new URL(`${AUTH0_ISSUER}/authorize`)
    url.searchParams.append("response_type", "code")
    url.searchParams.append("code_challenge", challenge)
    url.searchParams.append("code_challenge_method", "S256")
    url.searchParams.append("client_id", AUTH0_CLIENT_ID)
    url.searchParams.append("redirect_uri", "http://localhost:5500")
    url.searchParams.append('scope', "write:data read:data")
    url.searchParams.append('audience', 'https://alkemy-nodejs.com')
    url.searchParams.append('state', AUTH0_STATE)
    res.redirect(url.toString())
}

router.get('/login', middleware)

module.exports = router
