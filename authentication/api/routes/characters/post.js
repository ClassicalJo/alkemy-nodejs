var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.post('/', (req, res, next) => {
    let { name, image, age, weight, story, movies } = req.body
    Character.create({ name, image, age, weight, story, movies })
        .then(() => res.status(200).send("Character succesfully created"))
        .catch(err => next(err))
})

module.exports = router
