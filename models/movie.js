const { DataTypes, Model } = require('sequelize')
const { STRING, DATE, INTEGER, ARRAY, URL } = DataTypes

class Movie extends Model { }
Movie.init({
    image: {
        type: URL,
        allowNull: false,
    },
    title: {
        type: STRING,
        allowNull: false,
    },
    creationDate: {
        type: DATE,
        allowNull: false
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate:{
            min: 1,
            max: 5,
        }
    },
    relatedCharacters: {
        type: ARRAY,
        allowNull: false,
    }    
})

module.exports = Movie
