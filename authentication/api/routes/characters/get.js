var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.get('/', async (req, res, next) => {
    Character.findAll()
        .then(response => res.json(response))
        .catch(err => next(err))
});

module.exports = router
