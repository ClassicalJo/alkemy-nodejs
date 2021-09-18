var express = require('express');
var router = express.Router()
var get = require('./movies/get')
var post = require('./movies/post')
var del = require('./movies/delete')
var put = require('./movies/put')

router.get('/', get)
router.post('/', post)
router.delete('/', del)
router.put('/', put)

module.exports = router
