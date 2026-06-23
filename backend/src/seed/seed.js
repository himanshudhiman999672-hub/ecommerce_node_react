const path = require("path")
console.log("dirname",__dirname)
require("dotenv").config({
   path: path.resolve(__dirname, "../.env")
})
console.log(process.env.DBHOST)
const sequelize = require("../config/db")
const seedRole = require("../seed/Role")
const seedPermission = require("../seed/Permission")
const AssignRole = require("./RolePermission")
const adminUser = require("./adminUser")
const seed = async() =>{
    try{
        await sequelize.sync({ alter: true })
        await seedRole()
        await seedPermission()
        await AssignRole()
        await adminUser()
    }catch(error){
        console.log(error)
    }
}
seed()