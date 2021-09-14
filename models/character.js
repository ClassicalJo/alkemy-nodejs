const { DataTypes, Model } = require('sequelize')
const { STRING, INTEGER, ARRAY, FLOAT } = DataTypes

class Character extends Model() { };
Character.init({
    image: {
        type: STRING,
        allowNull: false,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    age: {
        type: INTEGER,
        allowNull: false,
    },
    weight: {
        type: FLOAT,
        allowNull: false,
    },
    story: {
        type: STRING,
        allowNull: false,
    },
    movies: {
        type: ARRAY,
        allowNull: false,
    }
})

module.exports = Character
