const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const User = require("./User")
const Product = require("./product");
const Address = require("./Address");

const Order = sequelize.define("order", {
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    address_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Address,
            key:"id"
        }
    },
    total_price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    order_status:{
        type:DataTypes.ENUM("pending", "confirmed","packed", "shipped", "delivered", "cancelled"),
        defaultValue:"pending"
    },
   payment_status:{
    type:DataTypes.ENUM("pending","paid","failed"),
    defaultValue:'pending'
   },
   payment_method:{
    type:DataTypes.ENUM("COD","razor_pay","stripe"),
    allowNull:false
   },
   razorpay_order_id: {
    type: DataTypes.STRING,
    allowNull: true
}

})

module.exports = Order