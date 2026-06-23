const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Role = require("../models/Role")
const Permission = require("../models/Permission")
const RolePermission = sequelize.define("role_permission", {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Role,
            key:"id"
        }
    },
    permission_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Permission,
            key:"id"
        }
    }

})

module.exports = RolePermission