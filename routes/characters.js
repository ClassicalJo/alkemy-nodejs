const axios = require('axios')
var express = require('express')
var authHeader = require('../authentication/app/authHeader')
var post = require('./characters/post')
var get = require('./characters/get')
var router = express.Router()


router.use(authHeader)
router.get('/', get)
router.post('/', post)


module.exports = router
