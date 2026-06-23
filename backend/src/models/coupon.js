const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const Coupon = sequelize.define("Coupon", {
    coupon_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    discount_type: {
        type: DataTypes.ENUM("percentage", "fixed"),
        allowNull: false
    },
    discount_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    minimum_order_amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },

    maximum_discount_amount: {
        type: DataTypes.FLOAT
    },

    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usage_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    used_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_delete: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }

})

module.exports = Coupon