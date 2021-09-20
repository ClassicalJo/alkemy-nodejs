const { DataTypes, Model, INTEGER } = require('sequelize')
const { TEXT, ARRAY, INTEGER } = DataTypes
const sequelize = require('../index')

class Genre extends Model { }
Genre.init({
    name: {
        type: TEXT,
        allowNull: false
    },
    image: {
        type: TEXT,
        allowNull: false
    },
    relatedMovies: {
        type: ARRAY(INTEGER),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Genre',
    validate: {
        relatedMoviesArrayOfInts() {
            if (!this.relatedMovies) return
            if (!isArrayOfInts(this.relatedMovies)) {
                throw new Error("Error validating related movies, should be an array of integers.")
            }
        }
    }
})

module.exports = Genre
