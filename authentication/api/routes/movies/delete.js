var express = require('express')
var router = express.Router()
var Movie = require('../../sequelize/models/movie')

router.delete('/', async (req, res, next) => {
    if (typeof req.body.id !== 'number') return res.status(400).send("ID field must be an integer.")

    Movie.destroy({ where: { id: req.body.id } })
        .then(response => {
            response == 0 && res.status(404).send("No entry with that ID was found.")
            response !== 0 && res.status(200).send("Entry succesfully deleted")
        })
        .catch(err => next(err))
});

module.exports = router
