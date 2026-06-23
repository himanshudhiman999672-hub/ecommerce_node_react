const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_delete:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }

})

module.exports = Category