var express = require('express')
var router = express.Router()
var Movie = require('../../sequelize/models/movie')

router.post('/', (req, res, next) => {
    let { title, image, creationDate, rating, relatedCharacters, genre } = req.body
    let movieInstance = Movie.build({ title, image, creationDate, rating, relatedCharacters, genre })

    movieInstance
        .validate()
        .then(() => {
            movieInstance
                .save()
                .then(() => res.status(200).send("Movie entry uploaded successfully."))
                .catch(err => next(err))
        })
        .catch(validationError => res.status(400).send(validationError.message))
})

module.exports = router
