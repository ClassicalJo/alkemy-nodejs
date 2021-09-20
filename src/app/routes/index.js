var express = require('express')
var auth0 = require('../auth/auth0')
var axios = require('axios')
var router = express.Router()
var authenticationAPIEndPoint = "http://localhost:8080/authorized"

router.use(auth0)
router.get('/', async (req, res, next) => {
    let { access_token, token_type } = req.oauth
    axios({
        url: authenticationAPIEndPoint,
        headers: { 'Authorization': `${token_type} ${access_token}` }
    })
        .then(() => {
            res.json({ login: 'successful', token_type, access_token })
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router
