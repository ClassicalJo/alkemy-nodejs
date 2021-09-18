const { DataTypes, Model } = require('sequelize')
const { TEXT, INTEGER, ARRAY, DECIMAL } = DataTypes
var sequelize = require('../index')

class Character extends Model { };
Character.init({
    image: {
        type: TEXT,
        allowNull: false,
    },
    name: {
        type: TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    age: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    weight: {
        type: DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDecimal: true
        }
    },
    story: {
        type: TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    relatedMovies: {
        type: ARRAY(TEXT),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    sequelize,
    modelName: 'Character',
    validate: {
        relatedMoviesArrayOfText() {
            if (!this.relatedMovies) return
            let reducer = (a, b) => a && b
            let reduced = this.relatedMovies.reduce((a, b) => reducer(a, typeof b == 'string'), true)
            let isArray = this.relatedMovies instanceof Array
            if (!isArray || !reduced) {
                throw new Error("Error validating related movies, should be an array of text.")
            }
        }
    }
})

module.exports = Character
