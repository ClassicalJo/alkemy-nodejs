var express = require('express')
var router = express.Router()


router.get('/', (req, res, next) => {
    //WE GET A QUERY
    //WE DESTRUCTURE THE QUERY
    //WE ASK THE AUTH SERVER TO PERFORM A QUERY TO THE PG SERVER
    let token = req.headers.authorization
    axios.request({
        url: process.env.API_URL + '/movies',
        method: 'GET',
        headers: { 'Authorization': token },
    })
        .then(response => res.json(response.data))
        .catch(err => res.json({ error: 'error', message: err.message }))
})


module.exports = router
