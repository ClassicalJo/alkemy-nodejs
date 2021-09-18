var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.put('/', (req, res, next) => {
    if (typeof req.body.id !== 'number') return res.status(400).send("ID field must be an integer.")

    Character.update(createEditValues(req.body), { where: { id: req.body.id } })
        .then(response => {
            response[0] == 0 && res.status(404).send("Character ID not found")
            response[0] !== 0 && res.status(200).send("Character succesfully updated")
        })
        .catch(err => {
            if (err.errors[0].type == 'Validation error') res.status(400).send(err.message)
            else next(err)
        })
})

function createEditValues(obj) {
    let editValues = {}
    let fields = ['name', 'image', 'age', 'weight', 'story', 'relatedMovies']
    fields.forEach(key => { if (obj[key] !== undefined) editValues[key] = obj[key] })
    return editValues
}

module.exports = router
