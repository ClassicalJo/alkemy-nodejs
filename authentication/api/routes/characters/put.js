var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.put('/', (req, res, next) => {
    let { id } = req.body
    let editableFields = ['name', 'image', 'age', 'weight', 'story', 'movies']
    let editValues = { id }

    editableFields.forEach(key => {
        if (req.body[key]) editValues[key] = req.body[key]
    })
    
    Character.update(editValues, { where: { id } })
        .then(response => {
            response[0] == 0 && res.status(200).send("Character ID not found")
            response[0] !== 0 && res.status(200).send("Character succesfully updated")
        })
        .catch(err => next(err))
})

module.exports = router
