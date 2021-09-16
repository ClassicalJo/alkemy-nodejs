var express = require('express')
var auth0 = require('../authentication/app/auth0')
var axios = require('axios')
var router = express.Router()
var authenticationAPIEndPoint = "http://localhost:8080/authorized"

router.use(auth0)
router.get('/', async (req, res) => {
    let { access_token, token_type } = req.oauth
    axios({
        url: authenticationAPIEndPoint,
        headers: { 'Authorization': `${token_type} ${access_token}` }
    })
        .then(response => {
            res.json(response.data)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router
