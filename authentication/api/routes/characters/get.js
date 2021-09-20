var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')
var { limitToFields, hasQuery, isArrayOfInts, getQueriableFieldsFromModel } = require('../../../../helpers/index')
var { Op } = require('sequelize')
var fields = getQueriableFieldsFromModel(Character)

router.get('/', async (req, res, next) => {
    let limitedQueries = limitToFields(req.query, fields)

    if (req.query.id) {
        let { id } = req.query
        if (isNaN(id)) return res.status(400).send("ID field must be an integer.")
        Character.findOne({ where: { id } })
            .then(response => {
                if (!response) res.status(404).send('ID not found.')
                else res.json(response)
            })
            .catch(err => next(err))
    }
    else if (hasQuery(limitedQueries)) {
        let { age, weight, relatedMovies, order } = limitedQueries
        let searchOptions = { where: limitedQueries }

        if (age && isNaN(age)) return res.status(400).send("Age field must be an integer")
        if (weight && isNaN(weight)) return res.status(400).send("Weight field must be an integer")

        if (relatedMovies) {
            let movies = relatedMovies.split('&&').map(k => Number(k))
            if (!isArrayOfInts(movies)) return res.status(400).send("Related movies must be an array of integers")

            searchOptions.where.relatedMovies = {
                [Op.contains]: movies
            }
        }

        if (order) {
            searchOptions.order = [['name', order == "DESC" ? "DESC" : "ASC"]]
            delete searchOptions.where.order
        }

        Character.findAll(searchOptions)
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
