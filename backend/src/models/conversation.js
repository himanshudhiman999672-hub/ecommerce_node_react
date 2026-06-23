const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Conversation = sequelize.define("Conversation", {
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seller_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    is_delete:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }

})

module.exports = Conversation