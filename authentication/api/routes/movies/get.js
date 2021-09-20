var express = require('express')
var router = express.Router()
var Movie = require('../../sequelize/models/movie')
var { limitToFields, getAvailableFields, hasQuery } = require('../../../../helpers/index')
var { Op } = require('sequelize')
var fields = getAvailableFields(Movie)

router.get('/', async (req, res, next) => {
    let limitedQueries = limitToFields(req.query, fields)
    if (req.query.id) {
        let id = Number(req.query.id)
        if (Number.isNaN(id)) return res.status(400).send("ID field must be an integer.")
        Movie.findOne({ where: { id } })
            .then(response => {
                if (!response) res.status(404).send('ID not found.')
                else res.json(response)
            })
            .catch(err => next(err))
    }
    else if (hasQuery(limitedQueries)) {
        let { rating, relatedCharacters } = limitedQueries
        if (rating && Number.isNaN(Number(rating))) return res.status(400).send("Rating field must be an integer")
        if (relatedCharacters) limitedQueries.relatedCharacters = { [Op.contains]: [relatedCharacters.split('&&')].flat() }
        Movie.findAll({ where: limitedQueries })
            .then(response => res.json(response))
            .catch(err => next(err))
    }
    else {
        Movie.findAll({ attributes: ['image', 'title', 'creationDate'] })
            .then(response => res.json(response))
            .catch(err => next(err))
    }
});

module.exports = router
