const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const User = require("./User")
const Product = require("./product")

const Cart = sequelize.define("Cart", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Product,
            key:"id"
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },

    seller_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    total:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
   

})

module.exports = Cart