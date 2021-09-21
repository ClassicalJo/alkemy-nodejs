var express = require('express')
var router = express.Router()
var Movie = require('../../sequelize/models/movie')
var { limitToFields, hasQuery, isArrayOfInts, getQueriableFieldsFromModel } = require('../../../helpers/index')
var { Op } = require('sequelize')
var fields = getQueriableFieldsFromModel(Movie)

router.get('/', async (req, res, next) => {
    let limitedQueries = limitToFields(req.query, fields)

    if (req.query.id) {
        let { id } = req.query
        if (isNaN(id)) return res.status(400).send("ID field must be an integer.")
        Movie.findOne({ where: { id } })
            .then(response => {
                if (!response) res.status(404).send('ID not found.')
                else res.json(response)
            })
            .catch(err => next(err))
    }
    else if (hasQuery(limitedQueries)) {
        let { title, creationDate, rating, relatedCharacters, genre, order } = limitedQueries
        let searchOptions = { where: limitedQueries }

        if (rating && isNaN(rating)) return res.status(400).send("Rating field must be an integer")

        if (title) {
            searchOptions.where.title = {
                [Op.regexp]: title.toLowerCase()
            }
        }

        if (creationDate) {
            searchOptions.creationDate = new Date(creationDate)
        }

        if (relatedCharacters) {
            let characters = relatedCharacters.split("&&").map(k => Number(k))
            if (!isArrayOfInts(characters)) return res.status(400).send("Related characters must be an array of integers")

            searchOptions.where.relatedCharacters = {
                [Op.contains]: characters
            }
        }

        if (genre) {
            let genres = genre.split('&&').map(k => Number(k))
            if (!isArrayOfInts(genres)) return res.status(400).send("Related characters must be an array of integers")
            
            searchOptions.where.genre = {
                [Op.contains]: genres
            }
        }

        if (order) {
            searchOptions.order = [['title', order == "DESC" ? "DESC" : "ASC"]]
            delete searchOptions.where.order
        }

        Movie.findAll(searchOptions)
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
