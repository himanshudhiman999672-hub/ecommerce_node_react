const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const User = require("./User")
const Product = require("./product")

const Address = sequelize.define("shipping_address", {
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address_line:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pincode:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    address_type:{
        type:DataTypes.ENUM("home", "office", "billing", "shipping"),
        allowNull:false
    }

   

})

module.exports = Address