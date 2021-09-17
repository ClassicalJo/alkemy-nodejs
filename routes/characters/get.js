var express = require('express')
var axios = require('axios')
var router = express.Router()

router.get('/', (req, res, next) => {
    let APIEndpoint = process.env.API_URL + '/characters'
    let options = { headers: { 'Authorization': req.headers.authorization } }

    axios
        .get(APIEndpoint, options)
        .then(response => res.json(response.data))
        .catch(err => res.json({ error: 'error', message: err.message }))
})

module.exports = router
