var express = require('express')
var router = express.Router()
var Movie = require('../../sequelize/models/movie')

router.put('/', (req, res, next) => {
    if (typeof req.body.id !== 'number') return res.status(400).send("ID field must be an integer.")

    Movie.update(createEditValues(req.body), { where: { id: req.body.id } })
        .then(response => {
            response[0] == 0 && res.status(404).send("Movie ID not found")
            response[0] !== 0 && res.status(200).send("Movie updated successfully")
        })
        .catch(err => {
            if (err.errors[0].type == 'Validation error') res.status(400).send(err.message)
            else next(err)
        })
})

module.exports = router

function createEditValues(obj) {
    let editValues = {}
    let fields = ['title', 'image', 'creationDate', 'rating', 'relatedCharacters']
    fields.forEach(key => { if (obj[key] !== undefined) editValues[key] = obj[key] })
    return editValues
}

module.exports = router
