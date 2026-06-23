const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Message = sequelize.define("Message", {
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversation_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_read:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    is_delete:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }

})

module.exports = Message
