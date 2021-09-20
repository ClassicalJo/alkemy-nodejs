var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')
var { limitToFields, getAvailableFields, hasQuery } = require('../../../../helpers/index')
var { Op } = require('sequelize')

var fields = getAvailableFields(Character)

router.get('/', async (req, res, next) => {
    let limitedQueries = limitToFields(req.query, fields)

    if (req.query.id) {
        let id = Number(req.query.id)
        if (Number.isNaN(id)) return res.status(400).send("ID field must be an integer.")

        Character.findOne({ where: { id } })
            .then(response => {
                if (!response) res.status(404).send('ID not found.')
                else res.json(response)
            })
            .catch(err => next(err))
    }
    else if (hasQuery(limitedQueries)) {
        let { age, weight, relatedMovies } = limitedQueries
        if (age && Number.isNaN(Number(age))) return res.status(400).send("Age field must be an integer")
        if (weight && Number.isNaN(Number(weight))) return res.status(400).send("Weight field must be an integer")
        if (relatedMovies) limitedQueries.relatedMovies = { [Op.contains]: [relatedMovies.split('&&')].flat() }

        Character.findAll({ where: limitedQueries })
            .then(response => res.json(response))
            .catch(err => next(err))
    }
    else {
        Character.findAll({ attributes: ['image', 'name'] })
            .then(response => res.json(response))
            .catch(err => next(err))
    }
});

module.exports = router
