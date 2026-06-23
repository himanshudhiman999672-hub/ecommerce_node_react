const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Permission = sequelize.define("Permission", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

})

module.exports = Permission