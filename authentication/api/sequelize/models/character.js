const { DataTypes, Model } = require('sequelize')
const { STRING, INTEGER, ARRAY, DECIMAL, URL } = DataTypes

class Character extends Model() { };
Character.init({
    image: {
        type: URL,
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
        type: DECIMAL,
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
