const axios = require('axios')
var express = require('express')
var authHeader = require('../auth/authHeader')
var post = require('./movies/post')
var get = require('./movies/get')
var del = require('./movies/delete')
var put = require('./movies/put')

var router = express.Router()

router.use(authHeader)
router.get('/', get)
router.post('/', post)
router.delete('/', del)
router.put('/', put)

module.exports = router
