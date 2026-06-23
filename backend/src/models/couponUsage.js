const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Coupon = require("./coupon");
const User = require("./User");

const CouponUsage = sequelize.define("Coupon_usage", {
    coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Coupon,
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
    is_delete: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }

})

module.exports = CouponUsage