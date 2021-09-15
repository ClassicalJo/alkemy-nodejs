var express = require('express')
var authenticate = require('../authentication/middleware')
var router = express.Router()

router.use(authenticate)

router.get('/login', (req, res, next) => {
    console.log(req.oidc.isAuthenticated())
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

router.get('/register', (req, res, next) => {
    res.send('registering ')
})

module.exports = router
