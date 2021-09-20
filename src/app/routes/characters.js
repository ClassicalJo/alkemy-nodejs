const axios = require('axios')
var express = require('express')
var authHeader = require('../auth/authHeader')
var post = require('./characters/post')
var get = require('./characters/get')
var del = require('./characters/delete')
var put = require('./characters/put')

var router = express.Router()


router.use(authHeader)
router.get('/', get)
router.post('/', post)
router.delete('/', del)
router.put('/', put)


module.exports = router
