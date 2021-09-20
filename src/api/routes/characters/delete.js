var express = require('express');
var idCheck = require('../../middleware/idCheck');
var router = express.Router()
var Character = require('../../sequelize/models/character')

router.use(idCheck)
router.delete('/', async (req, res, next) => {
    Character.destroy({ where: { id: req.body.id } })
        .then(response => {
            !response && res.status(404).send("No entry with that ID was found.")
            response && res.status(200).send("Entry succesfully deleted")
        })
        .catch(err => next(err))
});

module.exports = router
