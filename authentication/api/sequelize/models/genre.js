const { DataTypes, Model } = require('sequelize')
const { TEXT, ARRAY } = DataTypes
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
        type: ARRAY(TEXT),
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Genre'
})

module.exports = Genre
