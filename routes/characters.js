var express = require('express')
var router = express.Router()


router.get('/', (req, res, next) => {
    res.json({
        characterList: 'Object with characters'
    })
})


module.exports = router
