var express = require('express')
var router = express.Router()
var Movie = require('../../sequelize/models/movie')

router.get('/', async (req, res, next) => {
    Movie.findAll({ attributes: ['image', 'title', 'creationDate'] })
        .then(response => res.json(response))
        .catch(err => next(err))
});

module.exports = router
