const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const Notification = sequelize.define("Notification", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_read: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_delete: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }

})

module.exports = Notification