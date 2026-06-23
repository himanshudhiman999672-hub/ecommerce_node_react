const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require("./Role")
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
         type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    token:{
        type:DataTypes.STRING
    },
    is_verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    role_id:{
         type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Role,
            key:"id"
        }

    }
});

module.exports = User;
