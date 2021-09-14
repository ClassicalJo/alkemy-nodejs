const { DataTypes, Model } = require('sequelize')

class Character extends Model() { };
Character.init({
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    story: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    movies: {
        type: DataTypes.ARRAY,
        allowNull: false,
    }
})

module.exports = Character
