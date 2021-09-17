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
    },
    age: {
        type: INTEGER,
        allowNull: false,
    },
    weight: {
        type: DECIMAL,
        allowNull: false,
    },
    story: {
        type: TEXT,
        allowNull: false,
    },
    movies: {
        type: ARRAY(TEXT),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Character'
})

module.exports = Character
