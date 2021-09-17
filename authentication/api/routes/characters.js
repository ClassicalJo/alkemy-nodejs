var express = require('express');
var router = express.Router()
var get = require('./characters/get')
var post = require('./characters/post')

router.get('/', get)
router.post('/', post)

module.exports = router
