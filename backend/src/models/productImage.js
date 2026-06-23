const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Product = require("./product");

const ProductImage = sequelize.define("product_image", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Product,
            key :"id"
        }
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    }


})

module.exports = ProductImage