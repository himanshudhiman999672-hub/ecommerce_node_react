const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const User = require("./User")
const Category = require("./categories")

const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },
    is_deleted:{
       type:DataTypes.BOOLEAN,
       defaultValue:false 
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    discount_price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    stock:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    sku:{
        type:DataTypes.STRING,
        unique:true
    },
    featured:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    seller_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Category,
            key:"id"
        }
    }
})

module.exports = Product