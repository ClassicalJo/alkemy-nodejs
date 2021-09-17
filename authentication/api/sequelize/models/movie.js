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
    },
    creationDate: {
        type: DATE,
        allowNull: false
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
    relatedCharacters: {
        type: ARRAY(TEXT),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Movie'
})

module.exports = Movie
