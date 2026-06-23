const Permission = require("../models/Permission")
const Role = require("../models/Role")
const RolePermission = require("../models/RolePermission")

const AssignRole = async() =>{
    try{
        const adminRole = await Role.findOne({
            where:{
                name:"admin"
            }
        })

        if(!adminRole){
        console.log("Admin role not found")
        return
        }

        const permission = await Permission.findAll()

        for(let per of permission){
            const exist  = await RolePermission.findOne(
                {
                    where:{
                        role_id:adminRole.id,
                        permission_id:per.id
                    }
                }
            )

            if(!exist){
                
            await RolePermission.create({
                role_id: adminRole.id,
                permission_id: per.id
            })

            console.log(`Assigned ${per.name} to admin`)
            }
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = AssignRole