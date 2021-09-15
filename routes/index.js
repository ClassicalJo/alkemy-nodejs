var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.json({
        indexList: 'This is the indexList'
    })
})

module.exports = router
