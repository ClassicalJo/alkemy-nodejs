var express = require('express')
var router = express.Router()


router.get('/', (req, res, next) => {
    res.json({
        movieList: 'Object with movies'
    })
})


module.exports = router
