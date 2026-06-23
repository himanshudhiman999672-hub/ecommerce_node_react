const User = require("../models/User")
const bcrypt = require("bcrypt")

const adminUser = async() =>{
    const checkAdmin = await User.findOne({where:{role_id:1}})
    if(checkAdmin){
        console.log("Already admin there")
    }  
    const pass = "admin@123"
    const password = await  bcrypt.hash(pass,10)
 
    const name = User.create({
            email:"admin@admin.com",
            firstName:"admin",
            lastname:"admin",
            status:1,
            is_verified:1,
            password:password,
            role_id:1
    })

    console.log("Admin password")
}


module.exports = adminUser