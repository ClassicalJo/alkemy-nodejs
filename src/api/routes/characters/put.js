var express = require('express')
var idCheck = require('../../middleware/idCheck')
var router = express.Router()
var Character = require('../../sequelize/models/character')
var { limitToFields, getFieldsFromModel } = require('../../../helpers/index')

var fields = getFieldsFromModel(Character)

router.use(idCheck)
router.put('/', (req, res, next) => {
    let fieldsToUpdate = limitToFields(req.body, fields)
    let options = { where: { id: req.body.id } }
    Character.update(fieldsToUpdate, options)
        .then(response => {
            !response[0] && res.status(404).send("Character ID not found")
            response[0] && res.status(200).send("Character succesfully updated")
        })
        .catch(err => {
            if (err.errors[0].type == 'Validation error') res.status(400).send(err.message)
            else next(err)
        })
})

module.exports = router
