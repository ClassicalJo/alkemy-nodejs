const { DataTypes, Model } = require('sequelize')
const { STRING, ARRAY } = DataTypes

class Genre extends Model { }
Genre.init({
    name: {
        type: STRING,
        allowNull: false
    },
    image: {
        type: URL,
        allowNull: false
    },
    relatedMovies: {
        type: ARRAY,
        allowNull: false
    }
})

module.exports = Genre
