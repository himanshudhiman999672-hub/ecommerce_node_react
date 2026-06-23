const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require("./User")
const Product = require('./product');
const Wishlist = sequelize.define('Wishlist', {
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
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
        
});

module.exports = Wishlist;
