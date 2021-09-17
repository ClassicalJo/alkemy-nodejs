var express = require('express')
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.delete('/', async (req, res, next) => {
    let { id } = req.body
    Character.destroy({ where: { id } })
        .then(response => {
            response == 0 && res.status(200).send("No entry with that ID was found.")
            response !== 0 && res.status(200).send("Entry succesfully deleted")
        })
        .catch(err => next(err))
});

module.exports = router
