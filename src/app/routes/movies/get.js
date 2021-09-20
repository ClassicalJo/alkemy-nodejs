var express = require('express')
var axios = require('axios')
var router = express.Router()

router.get('/', (req, res, next) => {
    let APIEndpoint = new URL(process.env.API_URL + '/movies')

    for (let query in req.query) {
        APIEndpoint.searchParams.append(query, req.query[query])
    }

    let options = { headers: { 'Authorization': req.headers.authorization } }

    axios
        .get(APIEndpoint.toString(), options)
        .then(response => res.json(response.data))
        .catch(err => next(err))
})

module.exports = router
