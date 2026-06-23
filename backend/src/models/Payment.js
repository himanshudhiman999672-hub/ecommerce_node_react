const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Order = require("./Order");
const User = require("./User");
const Payment = sequelize.define("Payment", {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: "id"
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: false
    },

    payment_gateway: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    payment_status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: 'pending'
    },
    currency: {
        type: DataTypes.STRING,
        allowNull:false
    },
    paid_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = Payment