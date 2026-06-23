const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const User = require("./User")
const Product = require("./product");
const Address = require("./Address");
const Order = require("./Order");

const OrderItem = sequelize.define("order_items", {
    order_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Order,
            key:"id"
        }
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Product,
            key:"id"
        }
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    seller_id:{
        type:DataTypes.STRING,
        allowNull:false
    }
   

})

module.exports = OrderItem