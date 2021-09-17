var express = require('express');
var router = express.Router()
var Character = require('../sequelize/models/character')

router.get('/', async (req, res, next) => {
    Character.findAll()
        .then(res => res.json(res))
        .catch(err => next(err))
    //PERFORM THE QUERY TO THE PG SERVER
});
