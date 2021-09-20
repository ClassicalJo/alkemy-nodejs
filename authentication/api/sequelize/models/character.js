const { DataTypes, Model } = require('sequelize')
const { isArrayOfInts } = require('../../../../helpers')
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
        type: ARRAY(INTEGER),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    sequelize,
    modelName: 'Character',
    validate: {
        relatedMoviesArrayOfInts() {
            if (!this.relatedMovies) return
            if (!isArrayOfInts(this.relatedMovies)) {
                throw new Error("Error validating related movies, should be an array of integers.")
            }
        }
    }
})

module.exports = Character
