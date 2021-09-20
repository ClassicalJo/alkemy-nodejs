var express = require('express')
var router = express.Router()
var axios = require('axios')

router.delete('/', (req, res, next) => {
    let APIEndpoint = process.env.API_URL + '/movies'
    let options = { headers: { 'Authorization': req.headers.authorization }, data: req.body }
    
    axios
        .delete(APIEndpoint, options)
        .then(response => res.json(response.data))
        .catch(err => next(err))
})

module.exports = router
