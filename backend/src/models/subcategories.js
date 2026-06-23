const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');
const Category = require("./categories");
const Subcategory = sequelize.define("subcategory", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },
    is_delete: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }

})

module.exports = Subcategory