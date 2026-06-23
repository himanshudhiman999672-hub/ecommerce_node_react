const Role = require("../models/Role")

const seedRole = async() =>{
    const roles = [
        "admin",
        "buyer",
        "seller",
        "manager"
    ]


    for(let roleName of roles){
        const [role,created] = await Role.findOrCreate({
            where:{
                name:roleName
            }
        })

        if (created) {
            console.log(`${roleName} created`)
        } else {
            console.log(`${roleName} already exists`)
        }
    }

    console.log("Role Seed")
}

module.exports = seedRole