var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.post('/', (req, res, next) => {
    let { name, image, age, weight, story, relatedMovies } = req.body
    characterInstance = Character.build({ name, image, age, weight, story, relatedMovies })
    characterInstance
        .validate()
        .then(() => {
            characterInstance
                .save()
                .then(() => res.status(200).send("Character entry uploaded successfully."))
                .catch(err => next(err))

        })
        .catch(validationError => res.status(400).send(validationError.message))
})

module.exports = router
