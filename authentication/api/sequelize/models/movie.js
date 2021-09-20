const { DataTypes, Model } = require('sequelize')
const { TEXT, DATE, INTEGER, ARRAY } = DataTypes
const sequelize = require('../index')

class Movie extends Model { }
Movie.init({
    image: {
        type: TEXT,
        allowNull: false,
    },
    title: {
        type: TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    creationDate: {
        type: DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
            max: 5,
        }
    },
    relatedCharacters: {
        type: ARRAY(TEXT),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    genre: {
        type: ARRAY(INTEGER),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Movie',
    validate: {
        relatedCharactersArrayOfText() {
            if (!this.relatedCharacters) return
            let reducer = (a, b) => a && b
            let reduced = this.relatedCharacters.reduce((a, b) => reducer(a, typeof b == 'string'), true)
            let isArray = this.relatedCharacters instanceof Array
            if (!isArray || !reduced) {
                throw new Error("Error validating related characters, should be an array of text.")
            }
        },
        genreArrayOfInts() {
            if (!this.genre) return
            let reducer = (a, b) => a && b
            let reduced = this.genre.reduce((a, b) => reducer(a, !Number.isNaN(Number(b)), true))
            let isArray = this.genre instanceof Array
            if (!isArray || !reduced) {
                throw new Error("Error validating genre, should be an array of integers.")
            }
        }
    }
})


module.exports = Movie
