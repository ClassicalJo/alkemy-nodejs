const { DataTypes, Model } = require('sequelize')
const { STRING, DATE, INTEGER, ARRAY } = DataTypes

class Movie extends Model { }
Movie.init({
    image: {
        type: STRING,
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
    associatedCharacters: {
        type: ARRAY,
        allowNull: false,
    }    
})
