var express = require('express');
var router = express.Router()
var get = require('./characters/get')
var post = require('./characters/post')
var del = require('./characters/delete')

router.get('/', get)
router.post('/', post)
router.delete('/', del)
module.exports = router
